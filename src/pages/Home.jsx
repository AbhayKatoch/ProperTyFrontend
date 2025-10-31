import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <HeroSection />
      <FeatureSection />
    </div>
  );
}
