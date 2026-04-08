import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import TeamHighlights from "@/components/TeamHighlights";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground pb-mobile-nav bg-geo-pattern overflow-x-hidden">
      <AnimatedBackground />
      <HeroSection />
      <ScrollReveal>
        <VisionSection />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <TeamHighlights />
      </ScrollReveal>
    </div>
  );
};

export default Index;
