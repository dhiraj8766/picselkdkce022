import { Target, Lightbulb, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const visionData = [
  {
    id: 1,
    icon: Target,
    title: "Our Vision",
    description:
      "To be a leading student-driven community that empowers future engineers with the skills, confidence, and mindset to tackle real-world challenges through technology and collaboration.",
    gradient: "from-primary to-[hsl(var(--accent-cyan))]",
    borderColor: "hover:border-primary/40",
    iconColor: "text-primary",
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Our Mission",
    description:
      "To foster a culture of innovation, hands-on learning, and peer collaboration by organizing workshops, hackathons, and events that bridge the gap between academics and industry.",
    gradient: "from-[hsl(var(--accent-cyan))] to-[hsl(var(--accent-purple))]",
    borderColor: "hover:border-[hsl(var(--accent-cyan))]/40",
    iconColor: "text-[hsl(var(--accent-cyan))]",
  },
  {
    id: 3,
    icon: Rocket,
    title: "Our Future",
    description:
      "Expanding into AI/ML, cloud computing, and open-source contributions while building partnerships with industry leaders to provide students with real-world project experience and career opportunities.",
    gradient: "from-[hsl(var(--accent-yellow))] to-[hsl(var(--accent-orange))]",
    borderColor: "hover:border-[hsl(var(--accent-yellow))]/40",
    iconColor: "text-[hsl(var(--accent-yellow))]",
  },
];

const VisionSection = () => {
  return (
    <section className="relative bg-background px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal scale>
          <div className="mb-12 sm:mb-16 text-center">
            <span className="mb-3 sm:mb-4 inline-block rounded-full border border-primary/30 px-5 py-1.5 text-[10px] sm:text-xs uppercase tracking-[3px] text-primary font-heading font-semibold">
              Who We Are
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold md:text-5xl">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Vision · Mission · Future
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Driving innovation and excellence in the Department of Computer Science & Engineering.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {visionData.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.id} delay={index * 150} direction="up">
                <div className={`group relative flex flex-col items-start text-left p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-500 ${item.borderColor} hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.2)] hover:-translate-y-1 h-full overflow-hidden`}>
                  {/* Gradient accent line at top */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 ${item.iconColor}`}>
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className={`font-heading text-base sm:text-lg font-bold mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
