import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, CalendarDays, Users, Menu, X, Info, GraduationCap, Phone, Trophy } from "lucide-react";
import picselLogo from "@/assets/picsel-logo.png";


const mainTabs = [
  { name: "Home", path: "/", icon: Home },
  { name: "Events", path: "/events", icon: CalendarDays },
  { name: "Team", path: "/team", icon: Users },
  { name: "More", path: "", icon: Menu },
];

const moreLinks = [
  { name: "About Us", path: "/about", icon: Info },
  { name: "Faculty", path: "/faculty", icon: GraduationCap },
  { name: "Past Events", path: "/xevents", icon: Trophy },
  { name: "Contact", path: "/contact", icon: Phone },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-[998] bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setShowMore(false)}>
          <div
            className="absolute bottom-20 left-4 right-4 rounded-2xl border border-border bg-card p-4 shadow-card animate-[fadeIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <img src={picselLogo} alt="PICSEL" className="h-8 w-8 rounded-full" />
                <div>
                  <span className="block text-sm font-bold text-foreground font-heading">PICSEL</span>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">KDKCE</span>
                </div>
              </div>
              <button onClick={() => setShowMore(false)} className="p-1 text-muted-foreground">
                <X size={20} />
              </button>
            </div>
            
            {moreLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setShowMore(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground active:text-foreground active:bg-muted/50"
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-[999] border-t border-border bg-card/95 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {mainTabs.map((tab) => {
            const active = tab.path ? isActive(tab.path) : showMore;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  if (tab.name === "More") {
                    setShowMore(!showMore);
                  } else {
                    setShowMore(false);
                    navigate(tab.path);
                  }
                }}
                className={`flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <tab.icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">{tab.name}</span>
              </button>
            );
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  );
};

export default MobileBottomNav;
