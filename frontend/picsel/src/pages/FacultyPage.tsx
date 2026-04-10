import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import ProfileModal from "@/components/ProfileModal";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

interface FacultyMember {
  id: number; name: string; role: string; mobile: string; email: string;
  imageUrl: string; message: string;
}

const FacultyPage = () => {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(API.FACULTY);
        if (res.ok) {
  const data = await res.json();

  // sort faculty by id in increasing order
  const sortedFaculty = data.sort((a: any, b: any) => a.id - b.id);

  setFaculty(sortedFaculty);
}
      } catch (err) { console.error("Failed to fetch faculty:", err); }
      finally { setLoading(false); }
    };
    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">Loading faculty...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="relative z-10">
        <ScrollReveal direction="up" scale>
          <div className="mb-8 sm:mb-12 text-center">
            <span className="mb-3 inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-primary font-heading">Mentors</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">Our Faculty</h1>
            <p className="mx-auto mt-2 sm:mt-3 max-w-md text-sm sm:text-base text-muted-foreground">Guiding and inspiring the next generation of engineers.</p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-5xl grid gap-4 sm:gap-5 md:grid-cols-2">
          {faculty.map((f, index) => (
            <ScrollReveal key={f.id} delay={index * 100} direction="up">
              <div onClick={() => setSelectedProfile(f)}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/25 hover:shadow-glow cursor-pointer active:scale-[0.99]">
                <div className="h-1 w-full bg-gradient-to-r from-primary to-accent-cyan" />
                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center justify-center p-5 sm:p-6 sm:w-40 sm:flex-shrink-0">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
                      {f.imageUrl ? (
                        <img src={f.imageUrl} alt={f.name} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl sm:text-2xl font-bold text-primary font-heading bg-primary/5">
                          {f.name.split(" ").map(n => n.charAt(0)).join("")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 p-4 sm:p-5 pt-0 sm:pt-5">
                    <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">{f.role}</span>
                    <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">{f.name}</h3>
                    <div className="mt-3 space-y-1">
                      {f.email && (
                        <p onClick={(e) => e.stopPropagation()} className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
                          <Mail size={11} className="text-primary/60" />
                          <a href={`mailto:${f.email}`} className="hover:text-primary transition-colors">{f.email}</a>
                        </p>
                      )}
                      {f.mobile && (
                        <p onClick={(e) => e.stopPropagation()} className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
                          <Phone size={11} className="text-primary/60" />
                          <a href={`tel:${f.mobile}`} className="hover:text-primary transition-colors">{f.mobile}</a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {faculty.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-heading font-bold">No faculty members found</p>
          </div>
        )}
      </div>
      <ProfileModal profile={selectedProfile ? { ...selectedProfile, image: selectedProfile.imageUrl } : null} onClose={() => setSelectedProfile(null)} />
    </div>
  );
};

export default FacultyPage;
