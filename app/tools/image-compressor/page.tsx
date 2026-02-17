"use client";

import { ChangeEvent, useMemo, useState } from "react";

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

export default function ImageCompressorPage() {
  const [sourceName, setSourceName] = useState("");
  const [sourceSize, setSourceSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [originalUrl, setOriginalUrl] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");
  const [compressedSize, setCompressedSize] = useState(0);
  const [error, setError] = useState("");

  const savings = useMemo(() => {
    if (!sourceSize || !compressedSize || compressedSize >= sourceSize) return "0%";
    const p = ((sourceSize - compressedSize) / sourceSize) * 100;
    return `${p.toFixed(1)}%`;
  }, [sourceSize, compressedSize]);

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setSourceName(file.name);
    setSourceSize(file.size);
    setCompressedUrl("");
    setCompressedSize(0);

    const src = URL.createObjectURL(file);
    setOriginalUrl(src);
  };

  const compress = async () => {
    if (!originalUrl) return;
    setError("");

    const image = new Image();
    image.src = originalUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image"));
    }).catch((e) => {
      setError((e as Error).message);
    });
    if (!image.width || !image.height) return;

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas is not available.");
      return;
    }

    ctx.drawImage(image, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Compression failed.");
          return;
        }
        if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        setCompressedSize(blob.size);
        setCompressedUrl(URL.createObjectURL(blob));
      },
      "image/jpeg",
      quality / 100
    );
  };

  const download = () => {
    if (!compressedUrl) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = sourceName ? `${sourceName.replace(/\.[^.]+$/, "")}-compressed.jpg` : "compressed.jpg";
    a.click();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">Image Compressor</h1>
      <p className="mt-3 text-slate-300">Client-side compression with no upload required.</p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
          <label className="block text-sm text-slate-200">
            Select image
            <input type="file" accept="image/*" onChange={onSelectFile} className="mt-2 block w-full text-sm text-slate-200" />
          </label>

          <label className="mt-5 block text-sm text-slate-200">
            Quality ({quality}%)
            <input
              type="range"
              min={20}
              max={95}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={compress}
              disabled={!originalUrl}
              className="rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 disabled:opacity-50"
            >
              Compress
            </button>
            <button
              type="button"
              onClick={download}
              disabled={!compressedUrl}
              className="rounded-lg border border-fuchsia-300/35 bg-fuchsia-300/15 px-4 py-2 text-sm font-semibold text-fuchsia-100 disabled:opacity-50"
            >
              Download
            </button>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-200">
            <p>Original: {formatBytes(sourceSize)}</p>
            <p>Compressed: {formatBytes(compressedSize)}</p>
            <p>Savings: {savings}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5">
          <h2 className="text-xl font-semibold text-slate-100">Preview</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-950/80 p-2">
              <p className="mb-2 text-xs text-slate-400">Original</p>
              {originalUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={originalUrl} alt="Original preview" className="h-auto w-full rounded-md" />
              ) : (
                <p className="text-sm text-slate-500">No image selected.</p>
              )}
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-950/80 p-2">
              <p className="mb-2 text-xs text-slate-400">Compressed</p>
              {compressedUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={compressedUrl} alt="Compressed preview" className="h-auto w-full rounded-md" />
              ) : (
                <p className="text-sm text-slate-500">Run compression first.</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
