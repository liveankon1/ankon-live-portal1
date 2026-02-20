"use client";

import { useEffect, useMemo, useState } from "react";

type ReviewItem = {
  name: string;
  role: string;
  stars: 3 | 4 | 5;
  text: string;
  tool: string;
};

const reviewPool: ReviewItem[] = [
  { name: "Rafi H.", role: "Student", stars: 5, tool: "QR Code Maker", text: "Fast and clean. I generated codes for my class project in minutes." },
  { name: "Nusrat J.", role: "Freelancer", stars: 4, tool: "Link Shortener", text: "Simple and useful. History feature is great for daily work." },
  { name: "Tanvir A.", role: "Dev Learner", stars: 5, tool: "Password Generator", text: "Security checker gives clear feedback. Very practical." },
  { name: "Mira S.", role: "UI Designer", stars: 4, tool: "Color Palette Generator", text: "Good tool for quick palette ideas and copy workflow." },
  { name: "Adnan K.", role: "Campus Club", stars: 3, tool: "Smart Calculator", text: "Core features are solid. Would love more advanced graph controls." },
  { name: "Shanto R.", role: "Frontend Dev", stars: 5, tool: "JSON Formatter", text: "Exactly what I need for API payload cleanup and debugging." },
  { name: "Nadim P.", role: "Content Writer", stars: 4, tool: "Markdown Editor", text: "Easy editor and preview. Feels clean and lightweight." },
  { name: "Rimsha T.", role: "Intern", stars: 5, tool: "Image Compressor", text: "Compressed files quickly without uploading anywhere. Nice privacy touch." },
  { name: "Hasib M.", role: "Beginner Coder", stars: 3, tool: "Smart Calculator", text: "Useful overall. I still need more examples for formula input." },
  { name: "Sakib D.", role: "Builder", stars: 4, tool: "Tool Box UI", text: "Professional layout and smooth interactions. Easy to navigate." }
];

const starsText = (count: 3 | 4 | 5) => (count === 5 ? "★★★★★" : count === 4 ? "★★★★☆" : "★★★☆☆");

export default function ReviewsPage() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setOffset((prev) => (prev + 1) % reviewPool.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const visible = useMemo(() => {
    const out: ReviewItem[] = [];
    for (let i = 0; i < 6; i += 1) out.push(reviewPool[(offset + i) % reviewPool.length]);
    return out;
  }, [offset]);

  const average = useMemo(() => {
    const sum = reviewPool.reduce((acc, item) => acc + item.stars, 0);
    return (sum / reviewPool.length).toFixed(1);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="rounded-3xl border border-slate-600/50 bg-slate-900/45 p-5 backdrop-blur-xl md:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Feedback Hub</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-50">Community Reviews</h1>
        <p className="mt-3 text-slate-300">Rotating review feed to preview social proof styling for your website.</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-300/35 bg-amber-300/10 px-3 py-1.5 text-sm text-amber-100">
          <span className="font-semibold">{average}/5</span>
          <span>Average Rating</span>
        </div>
        <p className="mt-3 text-xs text-slate-400">Demo feed for portfolio UI preview.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, idx) => (
          <article key={`${item.name}-${item.tool}-${idx}`} className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-4">
            <p className="text-amber-300">{starsText(item.stars)}</p>
            <p className="mt-2 text-sm text-slate-200">{item.text}</p>
            <div className="mt-3 border-t border-slate-700/70 pt-3">
              <p className="text-sm font-semibold text-slate-100">{item.name}</p>
              <p className="text-xs text-slate-400">{item.role}</p>
              <p className="mt-1 text-xs text-cyan-200/80">Tool: {item.tool}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
