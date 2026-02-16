"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SHORTENER_HISTORY_KEY,
  SHORTENER_MAP_KEY,
  ShortHistoryItem,
  loadHistory,
  loadMapping,
  saveHistory,
  saveMapping
} from "@/lib/toolShortener";

const looksLikeExternalShort = (value: string) =>
  /https?:\/\/(tinyurl\.com|bit\.ly|t\.co|cutt\.ly)\//i.test(value.trim());

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const createCode = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
};

export default function ShortenerToolPage() {
  const [longUrl, setLongUrl] = useState("");
  const [history, setHistory] = useState<ShortHistoryItem[]>([]);
  const [latest, setLatest] = useState<ShortHistoryItem | null>(null);
  const [externalShort, setExternalShort] = useState("");
  const [copyState, setCopyState] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const mode = useMemo(() => (looksLikeExternalShort(longUrl) ? "external" : "instant"), [longUrl]);

  const generate = () => {
    setError("");
    setCopyState("");

    if (!longUrl.trim()) {
      setError("Please enter a URL.");
      return;
    }

    if (mode === "external") {
      setExternalShort(longUrl.trim());
      setLatest(null);
      return;
    }

    const normalized = normalizeUrl(longUrl);
    try {
      const parsed = new URL(normalized);
      if (!parsed.hostname) throw new Error("Invalid URL");
    } catch {
      setError("Please provide a valid URL (example.com or https://example.com).");
      return;
    }

    const mapping = loadMapping();
    let code = createCode();
    while (mapping[code]) code = createCode();

    const shortUrl = `${window.location.origin}/go/${code}`;
    mapping[code] = { url: normalized, createdAt: Date.now() };
    saveMapping(mapping);

    const item: ShortHistoryItem = {
      code,
      shortUrl,
      originalUrl: normalized,
      createdAt: Date.now()
    };
    const nextHistory = [item, ...history].slice(0, 10);
    setHistory(nextHistory);
    saveHistory(nextHistory);
    setLatest(item);
    setExternalShort("");
  };

  const copyShort = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopyState(value);
    setTimeout(() => setCopyState(""), 1000);
  };

  const removeHistory = (code: string) => {
    const next = history.filter((item) => item.code !== code);
    setHistory(next);
    saveHistory(next);

    const mapping = loadMapping();
    delete mapping[code];
    saveMapping(mapping);

    if (latest?.code === code) setLatest(null);
  };

  const clearAll = () => {
    setHistory([]);
    setLatest(null);
    localStorage.removeItem(SHORTENER_MAP_KEY);
    localStorage.removeItem(SHORTENER_HISTORY_KEY);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">URL Shortener</h1>
      <p className="mt-3 text-slate-300">
        Mode A: local short links stored in this browser. Mode B: displays external short links (TinyURL/Bitly).
      </p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
          <label className="block text-sm text-slate-200">
            Long URL
            <input
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/link"
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>
          <p className="mt-2 text-xs text-slate-400">
            Current mode:{" "}
            <span className="font-semibold text-slate-200">
              {mode === "external" ? "Mode B (External short link display)" : "Mode A (Local instant shortener)"}
            </span>
          </p>

          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={generate}
              className="rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-lg border border-slate-500/40 bg-slate-700/20 px-4 py-2 text-sm font-semibold text-slate-100"
            >
              Clear History
            </button>
          </div>

          {latest ? (
            <div className="mt-6 rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-emerald-100">Generated Link</p>
              <p className="mt-2 break-all text-sm text-slate-100">{latest.shortUrl}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyShort(latest.shortUrl)}
                  className="rounded-md border border-emerald-300/40 bg-emerald-300/15 px-3 py-1.5 text-xs font-semibold text-emerald-100"
                >
                  {copyState === latest.shortUrl ? "Copied" : "Copy"}
                </button>
                <a
                  href={latest.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-slate-500/45 bg-slate-700/20 px-3 py-1.5 text-xs font-semibold text-slate-100"
                >
                  Open
                </a>
              </div>
            </div>
          ) : null}

          {externalShort ? (
            <div className="mt-6 rounded-xl border border-fuchsia-300/30 bg-fuchsia-300/10 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-fuchsia-100">External Short Link</p>
              <p className="mt-2 break-all text-sm text-slate-100">{externalShort}</p>
            </div>
          ) : null}
        </article>

        <article className="rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-slate-100">Recent Links</h2>
            <span className="text-xs text-slate-400">Last 10</span>
          </div>

          <ul className="space-y-3">
            {history.length === 0 ? (
              <li className="rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-400">
                No links yet. Generate one to start.
              </li>
            ) : (
              history.map((item) => (
                <li key={item.code} className="rounded-lg border border-slate-700 bg-slate-950/80 p-3">
                  <p className="break-all text-sm font-medium text-slate-100">{item.shortUrl}</p>
                  <p className="mt-1 break-all text-xs text-slate-400">{item.originalUrl}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copyShort(item.shortUrl)}
                      className="rounded-md border border-cyan-300/40 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100"
                    >
                      {copyState === item.shortUrl ? "Copied" : "Copy"}
                    </button>
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-slate-500/45 bg-slate-700/20 px-2.5 py-1 text-xs text-slate-100"
                    >
                      Open
                    </a>
                    <button
                      type="button"
                      onClick={() => removeHistory(item.code)}
                      className="rounded-md border border-rose-300/35 bg-rose-300/10 px-2.5 py-1 text-xs text-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}
