import { X, Instagram, Linkedin, Github, Twitter, Mail, Phone } from "lucide-react";

interface Social { [key: string]: string; }

interface ProfileData {
  name: string;
  role: string;
  description?: string;
  message?: string;
  image?: string;
  imageUrl?: string;
  email?: string;
  mobile?: string;
  social?: Social;
  socials?: Social;
  department?: string;
  specialization?: string;
  hidePhone?: boolean;
}

interface ProfileModalProps {
  profile: ProfileData | null;
  onClose: () => void;
}

const iconMap: Record<string, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
};

const ProfileModal = ({ profile, onClose }: ProfileModalProps) => {
  if (!profile) return null;

  const social = profile.social || profile.socials || {};
  const img = profile.image || profile.imageUrl || "";

  const initials = profile.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .slice(0, 2);

  const desc = profile.description || profile.message || "";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#020617] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-[scaleIn_0.3s_ease-out]"
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Top Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 bg-primary/30 blur-[120px] rounded-full" />

        {/* Content */}
        <div className="relative px-8 pt-12 pb-10 text-center">

          {/* Profile Image */}
          <div className="mx-auto mb-5 h-44 w-44 overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-muted">
            {img ? (
              <img
                src={img}
                alt={profile.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-primary bg-primary/10">
                {initials}
              </div>
            )}
          </div>

          {/* Name */}
          <h2 className="text-3xl font-bold text-white tracking-wide">
            {profile.name}
          </h2>

          {/* Role */}
          <div className="mt-3 inline-block rounded-full bg-primary/10 border border-primary/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {profile.role}
          </div>

          {/* Department */}
          {profile.department && (
            <p className="mt-2 text-sm text-gray-400">
              {profile.department}
            </p>
          )}

          {/* Description */}
          {desc && (
            <p className="mt-5 text-sm leading-relaxed text-gray-400 max-w-md mx-auto">
              {desc}
            </p>
          )}

          {/* Contact */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:border-primary hover:text-primary transition"
              >
                <Mail size={16} />
                Email
              </a>
            )}

            {profile.mobile && !profile.hidePhone && (
              <a
                href={`tel:${profile.mobile}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:border-primary hover:text-primary transition"
              >
                <Phone size={16} />
                Call
              </a>
            )}

          </div>

          {/* Social Icons */}
          {Object.keys(social).length > 0 && (
            <div className="mt-6 flex justify-center gap-4">
              {Object.entries(social).map(([key, url]) => {

                if (!url || url === "#") return null;

                const Icon = iconMap[key.toLowerCase()];
                if (!Icon) return null;

                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-primary hover:text-primary hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfileModal;