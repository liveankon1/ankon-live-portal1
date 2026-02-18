import { HeroSection } from "@/components/home/HeroSection";
import { RecentProjectsSection } from "@/components/home/RecentProjectsSection";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { ContactPreviewSection } from "@/components/home/ContactPreviewSection";
import { OptimizerFeatureSection } from "@/components/home/OptimizerFeatureSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RecentProjectsSection />
      <AboutPreviewSection />
      <OptimizerFeatureSection />
      <ContactPreviewSection />
    </>
  );
}
