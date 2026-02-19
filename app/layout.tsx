import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { PageShell } from "@/components/PageShell";
import { ParticleSettingsProvider } from "@/components/providers/ParticleSettingsProvider";

export const metadata: Metadata = {
  title: "Ankon's Live Website",
  description: "Cinematic portfolio experience built with Next.js 14"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ParticleSettingsProvider>
          <PageShell>
            <Navbar />
            {children}
          </PageShell>
        </ParticleSettingsProvider>
      </body>
    </html>
  );
}
