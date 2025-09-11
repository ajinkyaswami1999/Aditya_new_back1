import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import HeroSlider from '@/components/HeroSlider';
import StatsSection from '@/components/StatsSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import TestimonialsSection from '@/components/TestimonialsSection';
import SocialMedia from '@/components/SocialMedia';
import Footer from '@/components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next";


export default function Home() {
  return (
    <>
      <Preloader />
      <Navigation />
      <SpeedInsights/>
      <main>
        <HeroSlider />
        <StatsSection />
        <ProjectsGrid />
        <TestimonialsSection />
      </main>
      <SocialMedia />
      <Footer />
    </>
  );
}