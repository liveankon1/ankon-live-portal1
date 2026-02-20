"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const safeEval = (expression: string) => {
  const cleaned = expression.replace(/[^0-9+\-*/().%^ ]/g, "");
  if (!cleaned.trim()) return "";
  const jsExpr = cleaned.replace(/\^/g, "**").replace(/%/g, "/100");
  // eslint-disable-next-line no-new-func
  const result = Function(`"use strict"; return (${jsExpr});`)();
  if (!Number.isFinite(result)) return "Error";
  return Number(result.toFixed(8)).toString();
};

const evalFn = (expr: string, x: number) => {
  const safe = expr.replace(/[^0-9xX+\-*/().^ ]/g, "").replace(/\^/g, "**").replace(/x/gi, `(${x})`);
  // eslint-disable-next-line no-new-func
  const out = Function(`"use strict"; return (${safe});`)();
  return Number(out);
};

export default function CalculatorToolPage() {
  const [expression, setExpression] = useState("12*(4+2)-3");
  const [result, setResult] = useState("");
  const [graphExpr, setGraphExpr] = useState("x^2");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const status = useMemo(() => (result === "Error" ? "Invalid expression" : "Ready"), [result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(148,163,184,0.2)";
    for (let i = 0; i <= 10; i += 1) {
      const x = (w / 10) * i;
      const y = (h / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w / 2;
    const cy = h / 2;
    ctx.strokeStyle = "rgba(148,163,184,0.6)";
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();

    ctx.strokeStyle = "rgba(34,211,238,0.95)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let hasPoint = false;
    for (let px = 0; px < w; px += 1) {
      const x = (px - cx) / 30;
      let y = NaN;
      try {
        y = evalFn(graphExpr, x);
      } catch {}
      if (!Number.isFinite(y)) {
        hasPoint = false;
        continue;
      }
      const py = cy - y * 30;
      if (!hasPoint) {
        ctx.moveTo(px, py);
        hasPoint = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  }, [graphExpr]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-4xl font-bold text-slate-50">Smart Calculator</h1>
        <span className="rounded-full border border-amber-300/40 bg-amber-300/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-100">
          Most Used
        </span>
      </div>
      <p className="text-slate-300">Friendly all-in-one calculator with quick math and graph view (Desmos-style basic plot).</p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
          <h2 className="text-xl font-semibold text-slate-100">Expression Calculator</h2>
          <input
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-slate-100"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setResult(safeEval(expression))}
              className="rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={() => {
                setExpression("");
                setResult("");
              }}
              className="rounded-lg border border-slate-500/40 bg-slate-700/20 px-4 py-2 text-sm font-semibold text-slate-100"
            >
              Clear
            </button>
          </div>
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/80 p-4">
            <p className="text-xs text-slate-400">Status: {status}</p>
            <p className="mt-1 text-2xl font-bold text-emerald-200">{result || "--"}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5">
          <h2 className="text-xl font-semibold text-slate-100">Graph Plotter</h2>
          <p className="mt-1 text-xs text-slate-400">Enter a function in x. Example: x^2, x^3-4*x, (x-2)^2</p>
          <input
            value={graphExpr}
            onChange={(e) => setGraphExpr(e.target.value)}
            className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-slate-100"
          />
          <canvas ref={canvasRef} width={560} height={320} className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950" />
        </article>
      </div>
    </section>
  );
}
