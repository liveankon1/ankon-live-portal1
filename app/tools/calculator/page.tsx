"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CalcKey =
  | "expression"
  | "scientific"
  | "graph"
  | "binary"
  | "hex"
  | "fraction"
  | "log"
  | "percentage"
  | "percent_error"
  | "perm_comb"
  | "remainder"
  | "rounding"
  | "sigfig"
  | "value_percent";

const calcItems: Array<{ key: CalcKey; label: string }> = [
  { key: "expression", label: "Expression" },
  { key: "scientific", label: "Scientific" },
  { key: "graph", label: "Graph" },
  { key: "binary", label: "Binary" },
  { key: "hex", label: "Hex" },
  { key: "fraction", label: "Fraction" },
  { key: "log", label: "Log" },
  { key: "percentage", label: "Percentage" },
  { key: "percent_error", label: "Percent Error" },
  { key: "perm_comb", label: "Permutation & Combination" },
  { key: "remainder", label: "Remainder" },
  { key: "rounding", label: "Rounding" },
  { key: "sigfig", label: "Significant Figures" },
  { key: "value_percent", label: "Value From Percent" }
];

const safeEval = (expression: string) => {
  const cleaned = expression.replace(/[^0-9+\-*/().%^ ]/g, "");
  if (!cleaned.trim()) return "";
  const jsExpr = cleaned.replace(/\^/g, "**").replace(/%/g, "/100");
  // eslint-disable-next-line no-new-func
  const result = Function(`"use strict"; return (${jsExpr});`)();
  if (!Number.isFinite(result)) return "Error";
  return Number(result.toFixed(10)).toString();
};

const safeScientificEval = (expression: string) => {
  const cleaned = expression
    .replace(/\s+/g, "")
    .replace(/pi/gi, "Math.PI")
    .replace(/sqrt\(/gi, "Math.sqrt(")
    .replace(/sin\(/gi, "Math.sin(")
    .replace(/cos\(/gi, "Math.cos(")
    .replace(/tan\(/gi, "Math.tan(")
    .replace(/log10\(/gi, "Math.log10(")
    .replace(/ln\(/gi, "Math.log(")
    .replace(/\^/g, "**")
    .replace(/[^0-9+\-*/().,MatsqrcinolgPItanh\*\s]/g, "");
  if (!cleaned) return "";
  // eslint-disable-next-line no-new-func
  const out = Function(`"use strict"; return (${cleaned});`)();
  if (!Number.isFinite(out)) return "Error";
  return Number(out.toFixed(10)).toString();
};

const gcd = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
};

const factorial = (n: number) => {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let out = 1;
  for (let i = 2; i <= n; i += 1) out *= i;
  return out;
};

const evalFn = (expr: string, x: number) => {
  const safe = expr.replace(/[^0-9xX+\-*/().^ ]/g, "").replace(/\^/g, "**").replace(/x/gi, `(${x})`);
  // eslint-disable-next-line no-new-func
  const out = Function(`"use strict"; return (${safe});`)();
  return Number(out);
};

const blockClass = "rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5";

export default function CalculatorToolPage() {
  const [active, setActive] = useState<CalcKey>("expression");

  const [expr, setExpr] = useState("12*(4+2)-3");
  const [exprOut, setExprOut] = useState("");

  const [sciExpr, setSciExpr] = useState("sqrt(81)+sin(1)");
  const [sciOut, setSciOut] = useState("");

  const [graphExpr, setGraphExpr] = useState("x^2");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [baseNumber, setBaseNumber] = useState("42");
  const [fractionA, setFractionA] = useState("8/12");
  const [logValue, setLogValue] = useState("100");
  const [logBase, setLogBase] = useState("10");
  const [percentValue, setPercentValue] = useState("20");
  const [percentTotal, setPercentTotal] = useState("250");
  const [errorApprox, setErrorApprox] = useState("9.6");
  const [errorExact, setErrorExact] = useState("10");
  const [permN, setPermN] = useState("7");
  const [permR, setPermR] = useState("3");
  const [remA, setRemA] = useState("37");
  const [remB, setRemB] = useState("5");
  const [roundValue, setRoundValue] = useState("12.9876");
  const [roundDigits, setRoundDigits] = useState("2");
  const [sigValue, setSigValue] = useState("0.00345678");
  const [sigDigits, setSigDigits] = useState("3");
  const [vpPercent, setVpPercent] = useState("25");
  const [vpBase, setVpBase] = useState("240");

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
    ctx.strokeStyle = "rgba(148,163,184,0.22)";
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
    ctx.strokeStyle = "rgba(148,163,184,0.64)";
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();

    ctx.strokeStyle = "rgba(34,211,238,0.98)";
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
      } else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [graphExpr]);

  const binaryHexResult = useMemo(() => {
    const n = Number(baseNumber);
    if (!Number.isFinite(n)) return { bin: "--", hex: "--" };
    return { bin: Math.trunc(n).toString(2), hex: Math.trunc(n).toString(16).toUpperCase() };
  }, [baseNumber]);

  const fractionResult = useMemo(() => {
    const [a, b] = fractionA.split("/").map((v) => Number(v.trim()));
    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return "--";
    const g = gcd(a, b);
    return `${a / g}/${b / g}`;
  }, [fractionA]);

  const logResult = useMemo(() => {
    const value = Number(logValue);
    const base = Number(logBase);
    if (!(value > 0) || !(base > 0) || base === 1) return "--";
    return (Math.log(value) / Math.log(base)).toFixed(6);
  }, [logValue, logBase]);

  const percentageResult = useMemo(() => {
    const value = Number(percentValue);
    const total = Number(percentTotal);
    if (!Number.isFinite(value) || !Number.isFinite(total) || total === 0) return "--";
    return `${((value / total) * 100).toFixed(2)}%`;
  }, [percentValue, percentTotal]);

  const percentErrorResult = useMemo(() => {
    const approx = Number(errorApprox);
    const exact = Number(errorExact);
    if (!Number.isFinite(approx) || !Number.isFinite(exact) || exact === 0) return "--";
    return `${(Math.abs((approx - exact) / exact) * 100).toFixed(2)}%`;
  }, [errorApprox, errorExact]);

  const permCombResult = useMemo(() => {
    const n = Number(permN);
    const r = Number(permR);
    if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n) return { npr: "--", ncr: "--" };
    const npr = factorial(n) / factorial(n - r);
    const ncr = npr / factorial(r);
    return { npr: String(npr), ncr: String(ncr) };
  }, [permN, permR]);

  const remainderResult = useMemo(() => {
    const a = Number(remA);
    const b = Number(remB);
    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return "--";
    return String(a % b);
  }, [remA, remB]);

  const roundingResult = useMemo(() => {
    const val = Number(roundValue);
    const digits = Number(roundDigits);
    if (!Number.isFinite(val) || !Number.isInteger(digits) || digits < 0 || digits > 10) return "--";
    return val.toFixed(digits);
  }, [roundValue, roundDigits]);

  const sigFigResult = useMemo(() => {
    const val = Number(sigValue);
    const digits = Number(sigDigits);
    if (!Number.isFinite(val) || !Number.isInteger(digits) || digits < 1 || digits > 10) return "--";
    return Number(val.toPrecision(digits)).toString();
  }, [sigValue, sigDigits]);

  const valueFromPercent = useMemo(() => {
    const p = Number(vpPercent);
    const base = Number(vpBase);
    if (!Number.isFinite(p) || !Number.isFinite(base)) return "--";
    return ((p / 100) * base).toFixed(4);
  }, [vpPercent, vpBase]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-4xl font-bold text-slate-50">Smart Calculator Suite</h1>
        <span className="rounded-full border border-amber-300/40 bg-amber-300/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-100">
          Most Used
        </span>
      </div>
      <p className="text-slate-300">Professional all-in-one calculator: math, scientific, graph, conversions, percentage, logs, and more.</p>

      <div className="mt-6 grid gap-2 rounded-2xl border border-slate-700/70 bg-slate-900/55 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {calcItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActive(item.key)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
              active === item.key
                ? "border-cyan-300/45 bg-cyan-300/15 text-cyan-100"
                : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {active === "expression" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Expression Calculator</h2>
            <input value={expr} onChange={(e) => setExpr(e.target.value)} className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-slate-100" />
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => setExprOut(safeEval(expr))} className="rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-3 py-2 text-sm font-semibold text-cyan-100">Calculate</button>
            </div>
            <p className="mt-3 text-2xl font-bold text-emerald-200">{exprOut || "--"}</p>
          </article>
        ) : null}

        {active === "scientific" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Scientific Calculator</h2>
            <p className="mt-1 text-xs text-slate-400">Use: `sqrt()`, `sin()`, `cos()`, `tan()`, `log10()`, `ln()`, `pi`, `^`</p>
            <input value={sciExpr} onChange={(e) => setSciExpr(e.target.value)} className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-slate-100" />
            <button type="button" onClick={() => setSciOut(safeScientificEval(sciExpr))} className="mt-3 rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-3 py-2 text-sm font-semibold text-cyan-100">Calculate</button>
            <p className="mt-3 text-2xl font-bold text-emerald-200">{sciOut || "--"}</p>
          </article>
        ) : null}

        {active === "graph" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Graph Plotter</h2>
            <p className="mt-1 text-xs text-slate-400">Example: `x^2`, `x^3-4*x`, `(x-2)^2`</p>
            <input value={graphExpr} onChange={(e) => setGraphExpr(e.target.value)} className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-slate-100" />
            <canvas ref={canvasRef} width={900} height={360} className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950" />
          </article>
        ) : null}

        {active === "binary" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Binary Calculator</h2>
            <input value={baseNumber} onChange={(e) => setBaseNumber(e.target.value)} className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            <p className="mt-3 text-slate-300">Binary: <span className="font-mono text-cyan-200">{binaryHexResult.bin}</span></p>
          </article>
        ) : null}

        {active === "hex" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Hex Calculator</h2>
            <input value={baseNumber} onChange={(e) => setBaseNumber(e.target.value)} className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            <p className="mt-3 text-slate-300">Hex: <span className="font-mono text-cyan-200">{binaryHexResult.hex}</span></p>
          </article>
        ) : null}

        {active === "fraction" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Fraction Calculator (Simplify)</h2>
            <input value={fractionA} onChange={(e) => setFractionA(e.target.value)} placeholder="8/12" className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            <p className="mt-3 text-slate-300">Simplified: <span className="font-mono text-cyan-200">{fractionResult}</span></p>
          </article>
        ) : null}

        {active === "log" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Log Calculator</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={logValue} onChange={(e) => setLogValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={logBase} onChange={(e) => setLogBase(e.target.value)} placeholder="Base" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">Result: <span className="font-mono text-cyan-200">{logResult}</span></p>
          </article>
        ) : null}

        {active === "percentage" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Percentage Calculator</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={percentValue} onChange={(e) => setPercentValue(e.target.value)} placeholder="Value part" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={percentTotal} onChange={(e) => setPercentTotal(e.target.value)} placeholder="Total" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">Result: <span className="font-mono text-cyan-200">{percentageResult}</span></p>
          </article>
        ) : null}

        {active === "percent_error" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Percentage Error Calculator</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={errorApprox} onChange={(e) => setErrorApprox(e.target.value)} placeholder="Approx value" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={errorExact} onChange={(e) => setErrorExact(e.target.value)} placeholder="Exact value" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">Error: <span className="font-mono text-cyan-200">{percentErrorResult}</span></p>
          </article>
        ) : null}

        {active === "perm_comb" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Permutation and Combination</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={permN} onChange={(e) => setPermN(e.target.value)} placeholder="n" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={permR} onChange={(e) => setPermR(e.target.value)} placeholder="r" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">nPr: <span className="font-mono text-cyan-200">{permCombResult.npr}</span></p>
            <p className="text-slate-300">nCr: <span className="font-mono text-cyan-200">{permCombResult.ncr}</span></p>
          </article>
        ) : null}

        {active === "remainder" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Remainder Calculator</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={remA} onChange={(e) => setRemA(e.target.value)} placeholder="Dividend" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={remB} onChange={(e) => setRemB(e.target.value)} placeholder="Divisor" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">Remainder: <span className="font-mono text-cyan-200">{remainderResult}</span></p>
          </article>
        ) : null}

        {active === "rounding" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Rounding Calculator</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={roundValue} onChange={(e) => setRoundValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={roundDigits} onChange={(e) => setRoundDigits(e.target.value)} placeholder="Digits" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">Rounded: <span className="font-mono text-cyan-200">{roundingResult}</span></p>
          </article>
        ) : null}

        {active === "sigfig" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Significant Figures Calculator</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={sigValue} onChange={(e) => setSigValue(e.target.value)} placeholder="Value" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={sigDigits} onChange={(e) => setSigDigits(e.target.value)} placeholder="Sig figs" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">Result: <span className="font-mono text-cyan-200">{sigFigResult}</span></p>
          </article>
        ) : null}

        {active === "value_percent" ? (
          <article className={blockClass}>
            <h2 className="text-xl font-semibold text-slate-100">Value Given Percent Calculator</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={vpPercent} onChange={(e) => setVpPercent(e.target.value)} placeholder="Percent" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
              <input value={vpBase} onChange={(e) => setVpBase(e.target.value)} placeholder="Base value" className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100" />
            </div>
            <p className="mt-3 text-slate-300">Result: <span className="font-mono text-cyan-200">{valueFromPercent}</span></p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
