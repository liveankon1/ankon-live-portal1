import { HeroSection } from "@/components/home/HeroSection";
import { LiveCommandPanel } from "@/components/home/LiveCommandPanel";
import { RecentProjectsSection } from "@/components/home/RecentProjectsSection";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { ContactPreviewSection } from "@/components/home/ContactPreviewSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveCommandPanel />
      <RecentProjectsSection />
      <AboutPreviewSection />
      <ContactPreviewSection />
    </>
  );
}
