export const AboutPreviewSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="glass rounded-3xl p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200/90">About</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-50">Design-minded engineer with systems thinking</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          I focus on end-to-end product outcomes: crisp frontend architecture, scalable APIs, and visual identity that feels intentional.
          My process blends rapid prototyping with production-level quality, performance, and maintainability.
        </p>
        <a href="/about" className="mt-5 inline-flex rounded-lg border border-slate-500/45 px-4 py-2 text-sm text-slate-100">
          Read full story
        </a>
      </div>
    </section>
  );
};