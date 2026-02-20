"use client";

import { useMemo, useState } from "react";

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const commonWeak = ["password", "123456", "qwerty", "ankon", "admin", "111111"];

const scorePassword = (value: string) => {
  if (!value) return { score: 0, label: "Very Weak", color: "text-rose-300" };
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  if (commonWeak.some((w) => value.toLowerCase().includes(w))) score = Math.max(1, score - 2);

  if (score <= 2) return { score, label: "Weak", color: "text-rose-300" };
  if (score <= 4) return { score, label: "Medium", color: "text-amber-300" };
  if (score === 5) return { score, label: "Strong", color: "text-emerald-300" };
  return { score, label: "Very Strong", color: "text-emerald-200" };
};

export default function PasswordToolPage() {
  const [length, setLength] = useState(14);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNums, setUseNums] = useState(true);
  const [useSyms, setUseSyms] = useState(true);
  const [generated, setGenerated] = useState("");
  const [checkInput, setCheckInput] = useState("");

  const strength = useMemo(() => scorePassword(checkInput), [checkInput]);

  const generatePassword = () => {
    let pool = "";
    if (useUpper) pool += upper;
    if (useLower) pool += lower;
    if (useNums) pool += nums;
    if (useSyms) pool += syms;
    if (!pool) return;

    let out = "";
    for (let i = 0; i < length; i += 1) {
      out += pool[Math.floor(Math.random() * pool.length)];
    }
    setGenerated(out);
  };

  const copyGenerated = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-4xl font-bold text-slate-50">Password Generator</h1>
        <span className="rounded-full border border-amber-300/40 bg-amber-300/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-100">
          Top Rated
        </span>
      </div>
      <p className="text-slate-300">Generate secure passwords and check how strong an existing password is.</p>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
          <h2 className="text-xl font-semibold text-slate-100">Generate Password</h2>
          <label className="mt-4 block text-sm text-slate-200">
            Length ({length})
            <input type="range" min={8} max={32} value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-2 w-full" />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-200">
            <label><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="mr-2" />Uppercase</label>
            <label><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="mr-2" />Lowercase</label>
            <label><input type="checkbox" checked={useNums} onChange={(e) => setUseNums(e.target.checked)} className="mr-2" />Numbers</label>
            <label><input type="checkbox" checked={useSyms} onChange={(e) => setUseSyms(e.target.checked)} className="mr-2" />Symbols</label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={generatePassword} className="rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100">
              Generate
            </button>
            <button type="button" onClick={copyGenerated} disabled={!generated} className="rounded-lg border border-emerald-300/35 bg-emerald-300/15 px-4 py-2 text-sm font-semibold text-emerald-100 disabled:opacity-50">
              Copy
            </button>
          </div>

          <textarea value={generated} readOnly rows={3} className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 font-mono text-sm text-slate-100" />
        </article>

        <article className="rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5">
          <h2 className="text-xl font-semibold text-slate-100">Security Level Check</h2>
          <p className="mt-2 text-sm text-slate-400">Type a password to estimate its security level.</p>
          <input
            value={checkInput}
            onChange={(e) => setCheckInput(e.target.value)}
            placeholder="Enter password to test"
            className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
          />
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/80 p-4">
            <p className="text-sm text-slate-300">Score: {strength.score}/6</p>
            <p className={`mt-1 text-lg font-semibold ${strength.color}`}>{strength.label}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
