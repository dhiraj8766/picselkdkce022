import { Instagram, Linkedin, Github, Twitter, Mail, Phone } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  email: Mail,
  phone: Phone,
};

interface SocialIconProps {
  type: string;
  url: string;
  size?: "sm" | "md";
}

const SocialIcon = ({ type, url, size = "sm" }: SocialIconProps) => {
  const Icon = iconMap[type.toLowerCase()] || Mail;
  const sizeClasses = size === "md" ? "h-10 w-10" : "h-8 w-8";
  const iconSize = size === "md" ? 18 : 14;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${sizeClasses} flex items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-glow`}
    >
      <Icon className={`w-[${iconSize}px] h-[${iconSize}px]`} size={iconSize} />
    </a>
  );
};

export default SocialIcon;
