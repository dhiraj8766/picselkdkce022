import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, ArrowUpRight } from "lucide-react";
import picselLogo from "@/assets/picsel-logo.png";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/30 px-4 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-16 md:px-10 md:pt-16 md:pb-14 lg:px-16">

      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Main Grid */}
        <div className="grid gap-8 sm:gap-10 grid-cols-2 md:grid-cols-4">

          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={picselLogo}
                alt="PICSEL"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-border"
              />
              <div>
                <span className="block text-base sm:text-lg font-extrabold tracking-tight text-foreground font-heading">
                  PICSEL
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[2px] text-muted-foreground">
                  KDKCE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mb-3">
              Department of Computer Science & Engineering. Building the future,
              one pixel at a time.
            </p>

            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
              <MapPin size={12} />
              <span>Nagpur, Maharashtra, India</span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-foreground font-heading">
              Navigate
            </h4>

            <div className="flex flex-col gap-1.5">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Events", path: "/events" },
                { name: "Past Events", path: "/xevents" },
                { name: "Team", path: "/team" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary flex items-center gap-1 group"
                >
                  {link.name}
                  <ArrowUpRight
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-foreground font-heading">
              Resources
            </h4>

            <div className="flex flex-col gap-1.5">
              {[
                { name: "Faculty", path: "/faculty" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary flex items-center gap-1 group"
                >
                  {link.name}
                  <ArrowUpRight
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-foreground font-heading">
              Connect
            </h4>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                {
                  name: "Instagram",
                  icon: Instagram,
                  url: "https://instagram.com/picsel_kdkce",
                },
                {
                  name: "Facebook",
                  icon: Facebook,
                  url: "https://facebook.com/picsel.kdkce",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-glow"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 border-t border-border pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-muted-foreground gap-2">

          <span>
            © {new Date().getFullYear()} PICSEL Committee — KDKCE. All rights
            reserved.
          </span>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground/50">
              Crafted with ❤️ by PICSEL Dev Team
            </span>

            <Link
              to="/admin"
              className="opacity-20 transition-opacity hover:opacity-80 text-[9px] uppercase tracking-[0.28em] text-muted-foreground hover:text-primary"
            >
              ⚡
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;