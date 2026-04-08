import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { API } from "@/config/api";
import ProfileModal from "@/components/ProfileModal";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  tokenNo: number;
  email?: string;
  socials?: { linkedin?: string; instagram?: string; twitter?: string };
}

const TeamHighlights = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(API.TEAM);
        if (res.ok) {
          const data: TeamMember[] = await res.json();
          setTeam(data);
        }
      } catch (err) {
        console.error("Failed to fetch team:", err);
      }
    };
    fetchTeam();
  }, []);

  const president = team.filter((m) => m.tokenNo === 1);
  const coreTeam = team.filter((m) => m.tokenNo === 2).slice(0, 4);

  if (president.length === 0 && coreTeam.length === 0) return null;

  // Layout: 2 core left | president center (bigger) | 2 core right
  const leftCore = coreTeam.slice(0, 2);
  const rightCore = coreTeam.slice(2, 4);
  const pres = president[0];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mb-12 text-center px-4">
        <span className="mb-3 inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-primary font-heading">
          Leadership
        </span>
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Meet the Team
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The visionaries driving PICSEL forward
        </p>
      </div>

      {/* Hexagonal Layout */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4 flex-wrap">
        {/* Left core members */}
        {leftCore.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedProfile(member)}
            className="group cursor-pointer flex flex-col items-center"
          >
            <div className="relative w-[80px] h-[92px] sm:w-[120px] sm:h-[138px] md:w-[160px] md:h-[184px] overflow-hidden transition-transform duration-500 group-hover:scale-105"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-2xl text-primary font-heading">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="mt-2 text-xs sm:text-sm font-bold text-foreground font-heading text-center">{member.name}</h3>
            <p className="text-[10px] sm:text-xs text-primary">{member.role}</p>
          </div>
        ))}

        {/* President - bigger */}
        {pres && (
          <div
            onClick={() => setSelectedProfile(pres)}
            className="group cursor-pointer flex flex-col items-center"
          >
            <div className="relative w-[140px] h-[161px] sm:w-[180px] sm:h-[207px] md:w-[220px] md:h-[253px] overflow-hidden transition-transform duration-500 group-hover:scale-105 ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
              {pres.imageUrl ? (
                <img src={pres.imageUrl} alt={pres.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-3xl text-primary font-heading">
                  {pres.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="mt-2 text-sm sm:text-base font-bold text-foreground font-heading text-center">{pres.name}</h3>
            <p className="text-xs text-primary font-semibold">{pres.role}</p>
          </div>
        )}

        {/* Right core members */}
        {rightCore.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedProfile(member)}
            className="group cursor-pointer flex flex-col items-center"
          >
            <div className="relative w-[100px] h-[115px] sm:w-[140px] sm:h-[161px] md:w-[160px] md:h-[184px] overflow-hidden transition-transform duration-500 group-hover:scale-105"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-2xl text-primary font-heading">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="mt-2 text-xs sm:text-sm font-bold text-foreground font-heading text-center">{member.name}</h3>
            <p className="text-[10px] sm:text-xs text-primary">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center px-4">
        <Link
          to="/team"
          className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-primary/5 transition"
        >
          View Full Team
          <ArrowRight size={16} />
        </Link>
      </div>

      <ProfileModal
        profile={
          selectedProfile
            ? {
                ...selectedProfile,
                image: selectedProfile.imageUrl,
                social: selectedProfile.socials as any,
                hidePhone: true,
              }
            : null
        }
        onClose={() => setSelectedProfile(null)}
      />
    </section>
  );
};

export default TeamHighlights;
