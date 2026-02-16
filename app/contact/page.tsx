export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">Contact</h1>
      <p className="mt-4 text-slate-300">Reach out for freelance, product builds, or collabs.</p>

      <form className="mt-8 grid gap-4 rounded-2xl glass p-5" aria-label="Contact form">
        <label className="text-sm text-slate-300">
          Name
          <input type="text" className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100" />
        </label>

        <label className="text-sm text-slate-300">
          Email
          <input type="email" className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100" />
        </label>

        <label className="text-sm text-slate-300">
          Message
          <textarea rows={5} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100" />
        </label>

        <a
          href="mailto:ankon@example.com?subject=Project%20Inquiry"
          className="inline-flex w-fit rounded-lg border border-cyan-300/45 bg-cyan-300/20 px-4 py-2 text-sm font-semibold text-cyan-50"
        >
          Send via Email
        </a>
      </form>
    </section>
  );
}