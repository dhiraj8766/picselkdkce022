import { X, Instagram, Linkedin, Github, Twitter, Mail, Phone, ExternalLink } from "lucide-react";

interface Social { [key: string]: string; }

interface ProfileData {
  name: string; role: string; description?: string; message?: string;
  image?: string; imageUrl?: string; email?: string; mobile?: string;
  social?: Social; socials?: Social; department?: string; specialization?: string;
  hidePhone?: boolean;
}

interface ProfileModalProps { profile: ProfileData | null; onClose: () => void; }

const iconMap: Record<string, any> = {
  instagram: Instagram, linkedin: Linkedin, github: Github, twitter: Twitter,
};

const ProfileModal = ({ profile, onClose }: ProfileModalProps) => {
  if (!profile) return null;

  const social = profile.social || profile.socials || {};
  const img = profile.image || profile.imageUrl || "";
  const initials = profile.name.split(" ").map(n => n.charAt(0)).join("").slice(0, 2);
  const desc = profile.description || profile.message || "";

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4" onClick={onClose}>
      <div
        className="w-full sm:max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl border-t sm:border border-border/30 bg-card shadow-2xl animate-[scaleIn_0.3s_ease-out] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Profile</span>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        {/* Avatar + Name */}
        <div className="flex flex-col items-center px-6 pt-6 pb-2">
          <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-border/40 bg-muted shadow-lg">
            {img ? (
              <img src={img} alt={profile.name} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-primary font-heading bg-primary/5">{initials}</div>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold text-foreground font-heading">{profile.name}</h2>
          <span className="mt-1 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            {profile.role}
          </span>
          {profile.department && <p className="mt-2 text-xs text-muted-foreground">{profile.department}</p>}
          {profile.specialization && <p className="text-xs text-accent-yellow">{profile.specialization}</p>}
        </div>

        {/* Description */}
        {desc && (
          <div className="px-6 pt-3 pb-1">
            <p className="text-sm leading-relaxed text-muted-foreground text-center">{desc}</p>
          </div>
        )}

        {/* Contact + Social */}
        <div className="px-6 pt-4 pb-6 space-y-4">
          {/* Contact buttons */}
          <div className="flex gap-2">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
                <Mail size={14} /> {profile.email}
              </a>
            )}
            {profile.mobile && !profile.hidePhone && (
              <a href={`tel:${profile.mobile}`} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
                <Phone size={14} /> {profile.mobile}
              </a>
            )}
          </div>

          {/* Social icons */}
          {Object.keys(social).length > 0 && (
            <div className="flex justify-center gap-2">
              {Object.entries(social).map(([key, url]) => {
                if (!url || url === "#") return null;
                const Icon = iconMap[key.toLowerCase()];
                if (!Icon) return null;
                return (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/5">
                    <Icon size={16} />
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
