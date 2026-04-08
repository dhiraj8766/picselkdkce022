import { useState, useEffect } from "react";
import { Handshake } from "lucide-react";
import { API } from "@/config/api";

interface Sponsor {
  id: number; name: string; logoUrl: string; website: string; tier: string;
}

const tierOrder = ["Platinum", "Gold", "Silver", "Partner"];

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch(API.SPONSORS);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setSponsors(data);
        }
      } catch { /* fallback */ }
    };
    fetchSponsors();
  }, []);

  const groupedSponsors = tierOrder.map(tier => ({
    tier,
    sponsors: sponsors.filter(s => s.tier === tier),
  })).filter(g => g.sponsors.length > 0);

  return (
    <section className="relative bg-background px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14 text-center">
          <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-yellow/20 bg-accent-yellow/10">
            <Handshake className="h-6 w-6 text-accent-yellow" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-foreground md:text-5xl">
            Our Sponsors & Partners
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-muted-foreground">
            Empowering our vision through their generous support.
          </p>
        </div>

        {/* Grouped by tier */}
        {groupedSponsors.length > 0 ? (
          <div className="space-y-8">
            {groupedSponsors.map(group => (
              <div key={group.tier}>
                <h3 className="text-[10px] font-bold uppercase tracking-[3px] text-muted-foreground mb-4 text-center font-heading">{group.tier}</h3>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {group.sponsors.map(sponsor => (
                    <a key={sponsor.id} href={sponsor.website && sponsor.website !== "#" ? sponsor.website : undefined}
                      target="_blank" rel="noopener noreferrer"
                      className="flex h-16 w-32 sm:h-20 sm:w-44 items-center justify-center rounded-xl border border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:shadow-glow hover:-translate-y-0.5">
                      {sponsor.logoUrl ? (
                        <img src={sponsor.logoUrl} alt={sponsor.name} className="h-8 sm:h-10 w-auto opacity-50 grayscale transition-all hover:opacity-90 hover:grayscale-0" loading="lazy" />
                      ) : (
                        <span className="text-xs sm:text-sm font-medium text-muted-foreground/60 hover:text-foreground transition-colors font-heading">
                          {sponsor.name}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Marquee fallback */
          <div className="relative overflow-hidden py-4 sm:py-8">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-[marquee_20s_linear_infinite] gap-6 sm:gap-8">
              {["Google", "Microsoft", "GitHub", "Notion", "Vercel", "AWS", "Google", "Microsoft", "GitHub", "Notion", "Vercel", "AWS"].map((name, i) => (
                <div key={i} className="flex h-16 w-32 sm:h-20 sm:w-44 flex-shrink-0 items-center justify-center rounded-xl border border-border/50 bg-card/50">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground/40 font-heading">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default SponsorsSection;
