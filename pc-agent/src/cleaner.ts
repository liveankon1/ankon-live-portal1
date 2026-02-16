import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export type CleanResult = {
  ok: boolean;
  deletedFiles: number;
  freedBytes: number;
  errors: string[];
};

type Accumulator = {
  deletedFiles: number;
  freedBytes: number;
  errors: string[];
};

const WINDOWS_TEMP_DIR = "C:\\Windows\\Temp";
const execFileAsync = promisify(execFile);

const normalizePath = (p: string) => path.resolve(p).toLowerCase();

const isSubPath = (target: string, root: string) => {
  const normalizedTarget = normalizePath(target);
  const normalizedRoot = normalizePath(root);
  return normalizedTarget === normalizedRoot || normalizedTarget.startsWith(`${normalizedRoot}${path.sep}`);
};

const uniqueTargets = () => {
  const list = [process.env.TEMP, process.env.TMP, WINDOWS_TEMP_DIR].filter((v): v is string => Boolean(v));
  const dedup = new Set<string>();
  for (const item of list) {
    dedup.add(path.resolve(item));
  }
  return Array.from(dedup);
};

const deleteEntry = async (entryPath: string, roots: string[], acc: Accumulator): Promise<void> => {
  if (!roots.some((root) => isSubPath(entryPath, root))) {
    acc.errors.push(`Skipped unsafe path: ${entryPath}`);
    return;
  }

  let stat;
  try {
    stat = await fs.lstat(entryPath);
  } catch (error) {
    acc.errors.push(`Stat failed for "${entryPath}": ${(error as Error).message}`);
    return;
  }

  if (stat.isDirectory()) {
    let entries;
    try {
      entries = await fs.readdir(entryPath, { withFileTypes: true });
    } catch (error) {
      acc.errors.push(`Read failed for "${entryPath}": ${(error as Error).message}`);
      return;
    }

    for (const entry of entries) {
      await deleteEntry(path.join(entryPath, entry.name), roots, acc);
    }

    try {
      await fs.rmdir(entryPath);
    } catch {
      // Keep parent temp directory structure; ignore non-empty/locked folder cleanup errors.
    }
    return;
  }

  try {
    await fs.unlink(entryPath);
    acc.deletedFiles += 1;
    acc.freedBytes += stat.size;
  } catch (error) {
    acc.errors.push(`Delete failed for "${entryPath}": ${(error as Error).message}`);
  }
};

export const cleanTemp = async (): Promise<CleanResult> => {
  const roots = uniqueTargets();
  const acc: Accumulator = { deletedFiles: 0, freedBytes: 0, errors: [] };

  for (const root of roots) {
    let entries;
    try {
      entries = await fs.readdir(root, { withFileTypes: true });
    } catch (error) {
      acc.errors.push(`Skipped "${root}": ${(error as Error).message}`);
      continue;
    }

    for (const entry of entries) {
      await deleteEntry(path.join(root, entry.name), roots, acc);
    }
  }

  return {
    ok: true,
    deletedFiles: acc.deletedFiles,
    freedBytes: acc.freedBytes,
    errors: acc.errors
  };
};

export const cleanRecycleBin = async (): Promise<CleanResult> => {
  try {
    await execFileAsync(
      "powershell.exe",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        "$ErrorActionPreference='Stop'; " +
          "$issues = @(); " +
          "$drives = Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Root; " +
          "foreach($root in $drives){ " +
          "  $letter = $root.Substring(0,1); " +
          "  try { Clear-RecycleBin -DriveLetter $letter -Force -ErrorAction Stop | Out-Null } " +
          "  catch { " +
          "    $msg = $_.Exception.Message; " +
          "    if($msg -notmatch 'cannot find the path specified'){ $issues += ('Drive ' + $letter + ': ' + $msg) } " +
          "  } " +
          "}; " +
          "if($issues.Count -gt 0){ $issues | ForEach-Object { Write-Error $_ }; exit 1 }"
      ],
      { windowsHide: true, timeout: 60000 }
    );

    return {
      ok: true,
      deletedFiles: 0,
      freedBytes: 0,
      errors: []
    };
  } catch (error) {
    return {
      ok: false,
      deletedFiles: 0,
      freedBytes: 0,
      errors: [(error as Error).message]
    };
  }
};
