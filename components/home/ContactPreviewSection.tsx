export const ContactPreviewSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:px-6">
      <div className="rounded-3xl border border-cyan-300/35 bg-cyan-300/10 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-cyan-50">Let&apos;s build something unforgettable</h2>
        <p className="mt-2 text-slate-200">Available for collaborations, freelance product builds, and creative experiments.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="mailto:bindankon@gmail.com" className="rounded-lg border border-cyan-200/40 bg-slate-900/35 px-4 py-2 text-sm font-medium text-cyan-50">
            bindankon@gmail.com
          </a>
          <a href="/contact" className="rounded-lg border border-slate-500/40 bg-slate-900/30 px-4 py-2 text-sm font-medium text-slate-100">
            Contact Page
          </a>
        </div>
      </div>
    </section>
  );
};
