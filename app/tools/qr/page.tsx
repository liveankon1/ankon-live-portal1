"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

const isLikelyUrl = (value: string) => /^https?:\/\//i.test(value.trim()) || /^[\w.-]+\.[a-z]{2,}/i.test(value.trim());

const toSafeUrl = (value: string) => {
  const text = value.trim();
  if (!text) return "";
  if (!isLikelyUrl(text)) return text;
  return /^https?:\/\//i.test(text) ? text : `https://${text}`;
};

export default function QRToolPage() {
  const [raw, setRaw] = useState("https://example.com");
  const [size, setSize] = useState(320);
  const [fgColor, setFgColor] = useState("#0ea5e9");
  const [bgColor, setBgColor] = useState("#0b1120");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [dataUrl, setDataUrl] = useState("");
  const [copyState, setCopyState] = useState<"" | "copied">("");

  const value = useMemo(() => toSafeUrl(raw), [raw]);
  const validationHint = useMemo(() => {
    if (!raw.trim()) return "Enter text or a URL to generate QR.";
    if (isLikelyUrl(raw.trim())) return `URL detected: ${value}`;
    return "Text mode: content will be encoded directly.";
  }, [raw, value]);

  useEffect(() => {
    let mounted = true;
    const generate = async () => {
      if (!value) {
        setDataUrl("");
        return;
      }
      try {
        const next = await QRCode.toDataURL(value, {
          width: size,
          margin: 1,
          color: {
            dark: fgColor,
            light: bgColor
          },
          errorCorrectionLevel: level
        });
        if (mounted) setDataUrl(next);
      } catch {
        if (mounted) setDataUrl("");
      }
    };
    generate();
    return () => {
      mounted = false;
    };
  }, [value, size, fgColor, bgColor, level]);

  const downloadPng = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "ankon-qr.png";
    link.click();
  };

  const copyData = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopyState("copied");
    setTimeout(() => setCopyState(""), 1200);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">QR Code Generator</h1>
      <p className="mt-3 text-slate-300">Create a customizable QR and export it instantly as PNG.</p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
          <label className="block text-sm text-slate-200">
            URL or text
            <input
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="https://your-link.com"
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>
          <p className="mt-2 text-xs text-slate-400">{validationHint}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-200">
              Size ({size}px)
              <input
                type="range"
                min={160}
                max={640}
                step={16}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="text-sm text-slate-200">
              Error Correction
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as "L" | "M" | "Q" | "H")}
                className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
              >
                <option value="L">L (Low)</option>
                <option value="M">M (Medium)</option>
                <option value="Q">Q (Quartile)</option>
                <option value="H">H (High)</option>
              </select>
            </label>
            <label className="text-sm text-slate-200">
              Foreground
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-slate-600 bg-transparent"
              />
            </label>
            <label className="text-sm text-slate-200">
              Background
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-slate-600 bg-transparent"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadPng}
              disabled={!dataUrl}
              className="rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 disabled:opacity-50"
            >
              Download PNG
            </button>
            <button
              type="button"
              onClick={copyData}
              disabled={!value}
              className="rounded-lg border border-fuchsia-300/35 bg-fuchsia-300/15 px-4 py-2 text-sm font-semibold text-fuchsia-100 disabled:opacity-50"
            >
              {copyState ? "Copied" : "Copy QR Data"}
            </button>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5">
          <h2 className="text-xl font-semibold text-slate-100">Live Preview</h2>
          <div className="mt-4 flex min-h-[320px] items-center justify-center rounded-xl border border-slate-700 bg-slate-950/80 p-4">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt="QR preview" className="h-auto max-w-full rounded-lg shadow-glow" />
            ) : (
              <p className="text-sm text-slate-400">Preview appears after input.</p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
