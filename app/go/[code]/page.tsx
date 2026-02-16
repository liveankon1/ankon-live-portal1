"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadMapping } from "@/lib/toolShortener";

export default function GoRedirectPage() {
  const params = useParams<{ code: string }>();
  const code = params?.code || "";
  const [state, setState] = useState<"checking" | "missing">("checking");
  const [target, setTarget] = useState("");

  useEffect(() => {
    if (!code) return;

    const mapping = loadMapping();
    const found = mapping[code];
    if (!found?.url) {
      setState("missing");
      return;
    }

    setTarget(found.url);
    const timer = window.setTimeout(() => {
      window.location.href = found.url;
    }, 500);

    return () => window.clearTimeout(timer);
  }, [code]);

  if (state === "checking" && target) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
        <h1 className="text-3xl font-bold text-slate-50">Redirecting...</h1>
        <p className="mt-3 break-all text-slate-300">{target}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
      <h1 className="text-3xl font-bold text-slate-50">Link Not Found</h1>
      <p className="mt-3 text-slate-300">
        This short link was not found in local storage on this device/browser.
      </p>
      <p className="mt-1 text-slate-400">Re-create the short link from the URL Shortener tool.</p>
      <Link
        href="/tools/shortener"
        className="mt-6 inline-flex rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100"
      >
        Open URL Shortener
      </Link>
    </section>
  );
}
