"use client";

import { useEffect, useMemo, useState } from "react";

type StatusResponse = {
  ok: boolean;
  pcName?: string;
  uptime?: number;
  version?: string;
  error?: string;
};

type CleanResponse = {
  ok: boolean;
  deletedFiles?: number;
  freedBytes?: number;
  errors?: string[];
  error?: string;
};

const STORAGE_KEY = "temp-cleaner-ui-settings-v1";

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
};

export default function TempCleanerPage() {
  const [pcAddress, setPcAddress] = useState("192.168.1.50:8787");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState<"idle" | "testing" | "cleaning">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [result, setResult] = useState<CleanResponse | null>(null);
  const [tokenCopied, setTokenCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { pcAddress?: string; token?: string };
      if (parsed.pcAddress) setPcAddress(parsed.pcAddress);
      if (parsed.token) setToken(parsed.token);
    } catch {
      // Ignore invalid local storage payload.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ pcAddress, token }));
  }, [pcAddress, token]);

  const baseUrl = useMemo(() => {
    const value = pcAddress.trim();
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    return `http://${value}`;
  }, [pcAddress]);

  const pushLog = (message: string) => {
    const stamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${stamp}] ${message}`, ...prev].slice(0, 40));
  };

  const generateToken = () => {
    const bytes = new Uint8Array(32);
    window.crypto.getRandomValues(bytes);
    const nextToken = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    setToken(nextToken);
    setTokenCopied(false);
    pushLog("Generated new pairing token. Save it in pc-agent/.env as AUTH_TOKEN.");
  };

  const copyToken = async () => {
    if (!token.trim()) return;
    try {
      await navigator.clipboard.writeText(token.trim());
      setTokenCopied(true);
      pushLog("Token copied to clipboard.");
      setTimeout(() => setTokenCopied(false), 1200);
    } catch {
      pushLog("Clipboard copy failed. Copy token manually.");
    }
  };

  const testConnection = async () => {
    if (!baseUrl) return;
    setLoading("testing");
    setStatus(null);
    pushLog(`Testing connection to ${baseUrl}/api/status`);

    try {
      const res = await fetch(`${baseUrl}/api/status`, { method: "GET" });
      const data = (await res.json()) as StatusResponse;
      setStatus(data);
      pushLog(data.ok ? `Connected to ${data.pcName}` : `Status error: ${data.error || "unknown"}`);
    } catch (error) {
      const msg = (error as Error).message;
      setStatus({ ok: false, error: msg });
      pushLog(`Connection failed: ${msg}`);
    } finally {
      setLoading("idle");
    }
  };

  const runAction = async (action: "temp" | "recycle") => {
    if (!baseUrl) return;
    if (!token.trim()) {
      pushLog("Token is required.");
      return;
    }

    setLoading("cleaning");
    setResult(null);
    const endpoint = action === "temp" ? "/api/clean-temp" : "/api/clean-recycle";
    pushLog(`Starting ${action === "temp" ? "temp" : "recycle bin"} cleanup...`);

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token.trim()
        },
        body: JSON.stringify({})
      });
      const data = (await res.json()) as CleanResponse;
      setResult(data);
      if (data.ok) {
        pushLog(
          `${action === "temp" ? "Temp" : "Recycle"} cleanup done. Deleted ${data.deletedFiles || 0} files, freed ${formatBytes(data.freedBytes || 0)}`
        );
      } else {
        pushLog(`${action === "temp" ? "Temp" : "Recycle"} cleanup failed: ${data.error || data.errors?.[0] || "unknown error"}`);
      }
    } catch (error) {
      const msg = (error as Error).message;
      setResult({ ok: false, error: msg });
      pushLog(`Cleanup request failed: ${msg}`);
    } finally {
      setLoading("idle");
    }
  };

  const runBoth = async () => {
    await runAction("temp");
    await runAction("recycle");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-slate-100">Temp Cleaner Control</h1>
      <p className="mt-2 text-slate-300">
        Local network only. Requires token authentication.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-600/60 bg-slate-900/60 p-5">
        <div className="grid gap-4">
          <label className="text-sm text-slate-200">
            PC Address (IP:PORT)
            <input
              value={pcAddress}
              onChange={(e) => setPcAddress(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
              placeholder="192.168.1.50:8787"
              aria-label="PC address"
            />
          </label>

          <label className="text-sm text-slate-200">
            Pairing Token
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
              placeholder="Enter X-Auth-Token"
              aria-label="Auth token"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={generateToken}
                className="rounded-md border border-slate-500/50 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-100"
              >
                Generate Token
              </button>
              <button
                type="button"
                onClick={copyToken}
                className="rounded-md border border-slate-500/50 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-100"
              >
                {tokenCopied ? "Copied" : "Copy Token"}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              PC setup: paste this value into <code>pc-agent/.env</code> as <code>AUTH_TOKEN=...</code>, then restart agent.
            </p>
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={testConnection}
              disabled={loading !== "idle"}
              className="rounded-lg border border-cyan-300/40 bg-cyan-400/15 px-4 py-2 text-sm font-medium text-cyan-100 disabled:opacity-55"
            >
              {loading === "testing" ? "Testing..." : "Test Connection"}
            </button>
            <button
              type="button"
              onClick={() => runAction("temp")}
              disabled={loading !== "idle"}
              className="rounded-lg border border-fuchsia-300/40 bg-fuchsia-400/15 px-4 py-2 text-sm font-medium text-fuchsia-100 disabled:opacity-55"
            >
              {loading === "cleaning" ? "Cleaning..." : "Temp Clean"}
            </button>
            <button
              type="button"
              onClick={() => runAction("recycle")}
              disabled={loading !== "idle"}
              className="rounded-lg border border-amber-300/40 bg-amber-400/15 px-4 py-2 text-sm font-medium text-amber-100 disabled:opacity-55"
            >
              {loading === "cleaning" ? "Cleaning..." : "Recycle Clean"}
            </button>
            <button
              type="button"
              onClick={runBoth}
              disabled={loading !== "idle"}
              className="rounded-lg border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-medium text-emerald-100 disabled:opacity-55"
            >
              {loading === "cleaning" ? "Cleaning..." : "Clean Both"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-600/60 bg-slate-900/55 p-4">
          <h2 className="text-lg font-semibold text-slate-100">Status</h2>
          <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-200">
            {JSON.stringify(status, null, 2)}
          </pre>
        </div>

        <div className="rounded-2xl border border-slate-600/60 bg-slate-900/55 p-4">
          <h2 className="text-lg font-semibold text-slate-100">Cleanup Result</h2>
          {result?.ok ? (
            <p className="mt-3 text-sm text-slate-200">
              Deleted <span className="font-semibold">{result.deletedFiles || 0}</span> files, freed{" "}
              <span className="font-semibold">{formatBytes(result.freedBytes || 0)}</span>.
            </p>
          ) : null}
          <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-200">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-600/60 bg-slate-900/55 p-4">
        <h2 className="text-lg font-semibold text-slate-100">Logs</h2>
        <ul className="mt-3 space-y-2 text-xs text-slate-300">
          {logs.map((entry, index) => (
            <li key={`${index}-${entry}`} className="rounded-md bg-slate-950 px-2 py-1">
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
