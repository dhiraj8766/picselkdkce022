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

const HexCard = ({
  member,
  size = "md",
  onClick,
}: {
  member: TeamMember;
  size?: "lg" | "md";
  onClick: () => void;
}) => {
  const sizes = {
    lg: "w-[140px] h-[160px] sm:w-[190px] sm:h-[220px] md:w-[220px] md:h-[250px]",
    md: "w-[95px] h-[110px] sm:w-[130px] sm:h-[150px] md:w-[160px] md:h-[185px]",
  };

  return (
    <div onClick={onClick} className="group cursor-pointer flex flex-col items-center">
      <div
        className={`relative ${sizes[size]} overflow-hidden transition-transform duration-500 group-hover:scale-105`}
        style={{
          clipPath:
            "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        }}
      >
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-xl text-primary font-heading">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="mt-2 text-xs sm:text-sm font-bold text-foreground text-center font-heading">
        {member.name}
      </h3>
      <p className="text-[10px] sm:text-xs text-primary text-center">
        {member.role}
      </p>
    </div>
  );
};

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

  const president = team.find((m) => m.tokenNo === 1);
  const coreTeam = team.filter((m) => m.tokenNo === 2).slice(0, 4);

  if (!president && coreTeam.length === 0) return null;

  return (
    <section className="relative pt-14 pb-4 sm:pt-20 sm:pb-6 px-4">

      {/* Heading */}
      <div className="mb-8 text-center">
        <span className="mb-2 inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-primary font-heading">
          Leadership
        </span>

        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Meet the Team
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The visionaries driving PICSEL forward
        </p>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col items-center gap-4">

        {president && (
          <HexCard
            member={president}
            size="lg"
            onClick={() => setSelectedProfile(president)}
          />
        )}

        <div className="flex justify-center gap-5">
          {coreTeam.slice(0, 2).map((m) => (
            <HexCard
              key={m.id}
              member={m}
              size="md"
              onClick={() => setSelectedProfile(m)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-5 -mt-3">
          {coreTeam.slice(2, 4).map((m) => (
            <HexCard
              key={m.id}
              member={m}
              size="md"
              onClick={() => setSelectedProfile(m)}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-center gap-6 flex-wrap">

        {coreTeam.slice(0, 2).map((member) => (
          <HexCard
            key={member.id}
            member={member}
            size="md"
            onClick={() => setSelectedProfile(member)}
          />
        ))}

        {president && (
          <HexCard
            member={president}
            size="lg"
            onClick={() => setSelectedProfile(president)}
          />
        )}

        {coreTeam.slice(2, 4).map((member) => (
          <HexCard
            key={member.id}
            member={member}
            size="md"
            onClick={() => setSelectedProfile(member)}
          />
        ))}
      </div>

      {/* Button */}
      <div className="mt-3 text-center">
        <Link
          to="/team"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-primary/5 transition"
        >
          View Full Team
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Modal */}
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