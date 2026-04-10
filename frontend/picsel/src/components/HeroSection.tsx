import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, X, ExternalLink } from "lucide-react";
import picselLogo from "@/assets/picsel-logo.png";
import hero1 from "@/assets/heroimg/hero1.jpg";
import hero2 from "@/assets/heroimg/hero2.jpg";
import hero4 from "@/assets/heroimg/hero3.jpeg";
import hero5 from "@/assets/heroimg/hero4.jpeg";
import hero3 from "@/assets/heroimg/hero5.jpeg";
import hero6 from "@/assets/heroimg/hero6.png";
import { API } from "@/config/api";
import Typewriter from "@/components/ui/typewriter";


const heroImages = [
  { src: hero1, label: "Faculty" },
  { src: hero2, label: "CSE" },
  { src: hero4, label: "Team" },
  { src: hero3, label: "CSE" },
  { src: hero5, label: "CSE" },
  { src: hero6, label: "CSE" },
  
  
];

interface EventData {
  id: number; title: string; description: string; date: string; time: string;
  coverImage: string; registerUrl: string; location: string; eventType: string;
  registrationOpen?: boolean; googleFormUrl?: string;
}

const HeroSection = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);


  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch(API.EVENTS);   // fetch all events

      if (!res.ok) throw new Error("Failed to fetch events");

      const data = await res.json();

      const now = new Date();
      now.setHours(0,0,0,0);

      // keep only active + upcoming events
      const upcoming = data
        .filter((e: EventData) => {
          const eventDate = new Date(e.date);
          eventDate.setHours(0,0,0,0);
          return eventDate >= now;
        })
        .sort((a: EventData, b: EventData) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

      // show only first 5 nearest events
      setEvents(upcoming.slice(0,5));

    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  fetchEvents();
}, []);

  const nextImage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => { setActiveImageIndex((prev) => (prev + 1) % heroImages.length); setIsTransitioning(false); }, 400);
  }, []);

  useEffect(() => { const interval = setInterval(nextImage, 4000); return () => clearInterval(interval); }, [nextImage]);
  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => setActiveEventIndex((prev) => (prev + 1) % events.length), 5000);
    return () => clearInterval(interval);
  }, [events.length]);

  const activeEvent = events.length > 0 ? events[activeEventIndex] : null;

  const getRegisterLink = (ev: EventData) => {
    if (ev.googleFormUrl) return ev.googleFormUrl;
    return `/register?event=${encodeURIComponent(ev.title)}&eventId=${ev.id}`;
  };

  const isExternal = (ev: EventData) => !!ev.googleFormUrl;

  return (
    <section className="relative min-h-screen px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12 md:px-10 md:pt-28 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-90" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 10% 0%, hsl(var(--accent-cyan) / 0.12) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 90% 10%, hsl(var(--accent-purple) / 0.15) 0%, transparent 55%),
          radial-gradient(ellipse 50% 70% at 50% 100%, hsl(var(--primary) / 0.08) 0%, transparent 50%)
        `
      }} />
      <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] left-[5%] w-[90%] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full bg-gradient-to-r from-primary/10 via-accent-cyan/8 to-accent-purple/10 blur-[80px] sm:blur-[120px] animate-[float_25s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="absolute top-5 left-4 sm:left-6 md:left-10 lg:left-16 z-20 flex items-center gap-2.5">
        <img src={picselLogo} alt="PICSEL" className="h-9 w-9 rounded-full border border-border/30 shadow-lg" />
        <div className="leading-none">
          <span className="block text-sm font-extrabold tracking-tight text-foreground font-heading">PICSEL</span>
          <span className="block text-[8px] font-mono font-medium uppercase tracking-[2px] text-muted-foreground">KDKCE</span>
        </div>
      </div>

      <div className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mb-10 sm:mb-16">
          <div className="animate-[fadeIn_0.8s_ease-out]">
            {/* <h1 className="font-heading text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-foreground/70"><Typewriter />Learn.</span>{" "}<br className="hidden sm:block" />
              <span className="text-foreground/70">Build.</span><br />
              <span className="bg-gradient-to-r from-primary via-[hsl(var(--accent-cyan))] to-[hsl(var(--accent-purple))] bg-clip-text text-transparent block mt-1">Grow Together.</span>
            </h1> */}

              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight space-y-2 tracking-tight">

      <div className="text-cyan-400">
        <Typewriter
          words={["Build."]}
          start={true}
          onComplete={() => setLine1Done(true)}
        />
      </div>

      <div className="text-gray-300">
        <Typewriter
          words={["Learn."]}
          start={line1Done}
          onComplete={() => setLine2Done(true)}
        />
      </div>

      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        <Typewriter
          words={["Grow Together."]}
          start={line2Done}
          onComplete={() => {}}
        />
      </div>

    </h1>
            <p className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground/90">
              PICSEL is a student-led technical community at KDKCE focused on practical learning, innovation, and collaboration through workshops, events, and real-world projects.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link to="/events">
                <div className="hidden md:block valorant-btn-wrapper"><button className="valorant-btn flex items-center gap-2">Explore Events <ArrowRight size={16} /></button></div>
                <button className="btn-mobile-primary md:hidden flex items-center gap-2 text-sm">Explore Events <ArrowRight size={14} /></button>
              </Link>
              <Link to="/about">
                <button className="hidden md:block valorant-btn-outline">About Us</button>
                <button className="btn-mobile-outline md:hidden text-sm">About Us</button>
              </Link>
            </div>
          </div>

          <div className="relative animate-[slideInRight_0.8s_ease-out] overflow-hidden">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] w-full mx-1 sm:mx-0">
              {heroImages.map((img, index) => {
                const isActive = index === activeImageIndex;
                const isPrev = index === (activeImageIndex - 1 + heroImages.length) % heroImages.length;
                const isNext = index === (activeImageIndex + 1) % heroImages.length;
                let transform = "scale(0.85) translateY(20px)"; let opacity = 0; let zIndex = 0;
                if (isActive) { transform = isTransitioning ? "scale(0.95) translateY(10px)" : "scale(1) translateY(0px)"; opacity = isTransitioning ? 0.5 : 1; zIndex = 3; }
                else if (isNext) { transform = "scale(0.92) translateX(20px) translateY(10px) rotate(3deg)"; opacity = 0.4; zIndex = 2; }
                else if (isPrev) { transform = "scale(0.92) translateX(-20px) translateY(10px) rotate(-3deg)"; opacity = 0.3; zIndex = 1; }
                return (
                  <div key={index} className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-border/20 cursor-pointer"
                    style={{ transform, opacity, zIndex, transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: isActive ? "0 25px 60px -15px rgba(0,0,0,0.5)" : "none" }}
                    onClick={() => { setIsTransitioning(true); setTimeout(() => { setActiveImageIndex(index); setIsTransitioning(false); }, 300); }}>
                    <img src={img.src} alt={img.label} className="h-full w-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {isActive && !isTransitioning && (
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 animate-[fadeIn_0.5s_ease-out]">
                        <span className="inline-block rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-primary">{img.label}</span>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-24 h-24 sm:w-32 sm:h-32 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl pointer-events-none z-10" />
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-24 h-24 sm:w-32 sm:h-32 border-b-2 border-l-2 border-accent-cyan/30 rounded-bl-3xl pointer-events-none z-10" />
            </div>
            <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-3">
              {heroImages.map((img, index) => (
                <button key={index}
                  onClick={() => { setIsTransitioning(true); setTimeout(() => { setActiveImageIndex(index); setIsTransitioning(false); }, 300); }}
                  className={`relative overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                    index === activeImageIndex ? "border-primary w-16 sm:w-20 h-10 sm:h-12 shadow-glow" : "border-border/30 w-10 sm:w-12 h-10 sm:h-12 opacity-40 hover:opacity-70"
                  }`}>
                  <img src={img.src} alt={img.label} className="h-full w-full object-cover" loading="lazy" />
                  {index === activeImageIndex && <div className="absolute bottom-0 left-0 h-0.5 bg-primary animate-[progressFill_4s_linear]" style={{ width: "100%" }} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Section - One at a time with slide */}
        {events.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[2px] sm:tracking-[3px] text-[hsl(var(--accent-yellow))] font-heading">Upcoming Events</h2>
              <Link to="/events" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <span className="hidden md:inline text-muted-foreground group-hover:text-foreground transition-colors">View All</span>
                <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border bg-secondary transition-all group-hover:bg-primary group-hover:border-primary"><ArrowRight size={14} /></span>
              </Link>
            </div>

            {/* Single Event Display */}
            {activeEvent && (
              <div
                className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:border-primary/30 hover:shadow-[0_12px_48px_-12px_hsl(var(--primary)/0.2)]"
                onClick={() => setSelectedEvent(activeEvent)}
              >
                <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    {activeEvent.coverImage ? (
                      <img src={activeEvent.coverImage} alt={activeEvent.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                        <Calendar size={40} className="opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 hidden md:block" />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                        {activeEvent.eventType || "Event"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground font-heading line-clamp-2">{activeEvent.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{activeEvent.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar size={13} /> {activeEvent.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {activeEvent.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {activeEvent.location}</span>
                    </div>
                    <div className="mt-5 flex items-center gap-3">
  {activeEvent.registrationOpen && (
    isExternal(activeEvent) ? (
      <a
        href={getRegisterLink(activeEvent)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Register <ExternalLink size={12} />
      </a>
    ) : (
      <Link
        to={getRegisterLink(activeEvent)}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Register Now <ArrowRight size={12} />
      </Link>
    )
  )}
</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-primary/30 w-full">
                  <div className="h-full bg-primary animate-[progressFill_5s_linear]" style={{ width: "100%" }} />
                </div>
              </div>
            )}

            {/* Event dots */}
            {events.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {events.map((_, i) => (
                  <button key={i} onClick={() => setActiveEventIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeEventIndex ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Detail Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4" onClick={() => setSelectedEvent(null)}>
          <div className="w-full sm:max-w-lg overflow-hidden rounded-t-2xl sm:rounded-2xl border-t sm:border border-border/30 bg-card shadow-2xl animate-[scaleIn_0.3s_ease-out] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {selectedEvent.coverImage && (
              <div className="relative h-48 sm:h-56">
                <img src={selectedEvent.coverImage} alt={selectedEvent.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              </div>
            )}
            <div className="absolute top-3 right-3 z-10">
              <button onClick={() => setSelectedEvent(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm hover:bg-background transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary mb-3">
                {selectedEvent.eventType || "Event"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading">{selectedEvent.title}</h2>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {selectedEvent.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {selectedEvent.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {selectedEvent.location}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{selectedEvent.description}</p>
              <div className="mt-6">
  {selectedEvent.registrationOpen && (
    isExternal(selectedEvent) ? (
      <a
        href={getRegisterLink(selectedEvent)}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl bg-primary text-primary-foreground text-center py-3 text-sm font-bold hover:bg-primary/90 transition-colors"
      >
        Register Now <ExternalLink size={14} className="inline ml-1" />
      </a>
    ) : (
      <Link
        to={getRegisterLink(selectedEvent)}
        className="block w-full rounded-xl bg-primary text-primary-foreground text-center py-3 text-sm font-bold hover:bg-primary/90 transition-colors"
      >
        Register Now
      </Link>
    )
  )}
</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
