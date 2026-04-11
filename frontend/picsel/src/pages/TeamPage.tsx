import { useState, useEffect } from "react";
import ProfileModal from "@/components/ProfileModal";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  mobile: string;
  email: string;
  tokenNo: number;
  imageUrl: string;
  socials: { linkedin: string; instagram: string; twitter: string };
}

const HexCard = ({
  member,
  size = "md",
  onClick,
}: {
  member: TeamMember;
  size?: "lg" | "md" | "sm";
  onClick: () => void;
}) => {
  const sizeClasses = {
    lg: "w-[130px] h-[150px] sm:w-[180px] sm:h-[207px] md:w-[240px] md:h-[276px]",
    md: "w-[90px] h-[104px] sm:w-[140px] sm:h-[161px] md:w-[180px] md:h-[207px]",
    sm: "w-[75px] h-[86px] sm:w-[100px] sm:h-[115px] md:w-[120px] md:h-[138px]",
  };

  return (
    <div onClick={onClick} className="group cursor-pointer flex flex-col items-center">
      <div
        className={`relative ${sizeClasses[size]} overflow-hidden transition-transform duration-500 group-hover:scale-105`}
        style={{
          clipPath:
            "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        }}
      >
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-2xl text-primary font-heading">
            {member.name.charAt(0)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <h3 className="mt-2 text-xs sm:text-sm font-bold text-foreground text-center font-heading">
        {member.name}
      </h3>

      <p className="text-[10px] sm:text-xs text-primary font-medium text-center">
        {member.role}
      </p>
    </div>
  );
};

const TeamPage = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(API.TEAM);
        if (res.ok) setTeam(await res.json());
      } catch (err) {
        console.error("Failed to fetch team:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const president = team.filter((m) => m.tokenNo === 1);
  const coreTeam = team.filter((m) => m.tokenNo === 2);
  const members = team.filter((m) => m.tokenNo === 3);

  const pres = president[0];
  const firstFourCore = coreTeam.slice(0, 4);
  const remainingCore = coreTeam.slice(4);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">
          Loading team...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 pb-10">

      <AnimatedBackground />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10">

        {/* Heading */}
        <ScrollReveal direction="up" scale>
          <div className="mb-8 text-center">
            <span className="text-xs uppercase tracking-widest text-primary font-heading">
              The Squad
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-2 font-heading">
              Our Team
            </h1>

            <p className="text-sm text-muted-foreground mt-2">
              The passionate minds powering PICSEL Club.
            </p>
          </div>
        </ScrollReveal>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col items-center gap-6 mb-10">

          {pres && (
            <HexCard
              member={pres}
              size="lg"
              onClick={() => setSelectedProfile(pres)}
            />
          )}

          <div className="grid grid-cols-2 gap-6">
            {firstFourCore.map((m) => (
              <HexCard
                key={m.id}
                member={m}
                size="md"
                onClick={() => setSelectedProfile(m)}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <ScrollReveal>
          <div className="hidden md:flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-10 flex-wrap">

            {firstFourCore.slice(0, 2).map((m) => (
              <HexCard
                key={m.id}
                member={m}
                size="md"
                onClick={() => setSelectedProfile(m)}
              />
            ))}

            {pres && (
              <HexCard
                member={pres}
                size="lg"
                onClick={() => setSelectedProfile(pres)}
              />
            )}

            {firstFourCore.slice(2, 4).map((m) => (
              <HexCard
                key={m.id}
                member={m}
                size="md"
                onClick={() => setSelectedProfile(m)}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Remaining Core */}
        {remainingCore.length > 0 && (
          <div className="mb-10 max-w-6xl mx-auto">
            <h3 className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6 font-heading">
              Core Team
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {remainingCore.map((m) => (
                <HexCard
                  key={m.id}
                  member={m}
                  size="md"
                  onClick={() => setSelectedProfile(m)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Members */}
        {members.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6 font-heading">
              Core Committee
            </h3>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {members.map((member) => (
                <HexCard
                  key={member.id}
                  member={member}
                  size="sm"
                  onClick={() => setSelectedProfile(member)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ProfileModal
        profile={
          selectedProfile
            ? {
                ...selectedProfile,
                image: selectedProfile.imageUrl,
                social: selectedProfile.socials,
                hidePhone: true,
              }
            : null
        }
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
};

export default TeamPage;