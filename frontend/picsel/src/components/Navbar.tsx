import { useLocation, Link } from "react-router-dom";
import picselLogo from "@/assets/picsel-logo.png";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Team", path: "/team" },
  { name: "Faculty", path: "/faculty" },
  { name: "Contact", path: "/contact" },
  
];

const socialLinks = [
  { icon: Instagram, url: "https://instagram.com/picsel_kdkce", label: "Instagram" },
  { icon: Linkedin, url: "https://linkedin.com/company/picsel-kdkce", label: "LinkedIn" },
  
  { icon: Facebook, url: "https://facebook.com/picselkdkce", label: "Facebook" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden md:block">
      <div className="flex justify-center pt-5 px-6 lg:px-10">
        <div className="flex items-center gap-5 rounded-full border border-border bg-card/80 px-4 py-2.5 backdrop-blur-xl shadow-card">
          <Link to="/" className="flex items-center gap-2">
            <img src={picselLogo} alt="PICSEL Club" className="h-9 w-9 rounded-full object-cover" />
            <div className="leading-none">
              <span className="block text-sm font-extrabold tracking-tight text-foreground font-heading">PICSEL</span>
              <span className="block text-[9px] font-medium uppercase tracking-[2px] text-muted-foreground">KDKCE</span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  location.pathname === item.path
                    ? "text-foreground bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Social icons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-3 backdrop-blur-xl shadow-card">
        {socialLinks.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
            className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <s.icon size={15} />
          </a>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
