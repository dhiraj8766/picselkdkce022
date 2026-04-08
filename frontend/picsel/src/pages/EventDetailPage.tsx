import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowLeft, Maximize2, X } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

interface EventData {
  id: number; title: string; description: string; date: string; time: string;
  location: string; coverImage: string; registerUrl: string; eventType: string;
  token: string; gallery?: string[];
  registrationOpen?: boolean; registrationType?: string; googleFormUrl?: string;
}

const EventDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get("id");
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(API.EVENTS);
        if (res.ok) {
          const data: EventData[] = await res.json();
          const found = data.find((e) => String(e.id) === eventId);
          if (found) setEvent(found);
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Event Not Found</h1>
          <p className="text-muted-foreground text-sm mb-6">The event you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/events")} className="text-primary text-sm hover:underline">← Back to Events</button>
        </div>
      </div>
    );
  }

  const getRegisterLink = () => {
    if (event.registrationType === "google_form" && event.googleFormUrl) return event.googleFormUrl;
    return `/register?event=${encodeURIComponent(event.title)}&eventId=${event.id}`;
  };

  const isExternal = event.registrationType === "google_form" && !!event.googleFormUrl;
  const isPast = new Date(event.date) < new Date();

  return (
    <div className="min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 relative">
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{
        background: `
          radial-gradient(ellipse 60% 40% at 10% 20%, hsl(var(--accent-cyan) / 0.08) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 90% 80%, hsl(var(--accent-purple) / 0.06) 0%, transparent 50%)
        `
      }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={16} /> Back
        </button>

        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Poster Side */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border bg-card">
                {event.coverImage ? (
                  <div className="relative">
                    <img src={event.coverImage} alt={event.title} className="w-full h-auto max-h-[600px] object-contain bg-black/5" />
                    <button
                      onClick={() => setShowFullImage(true)}
                      className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                      title="View full image"
                    >
                      <Maximize2 size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="h-64 bg-muted flex items-center justify-center text-muted-foreground">No Image</div>
                )}
              </div>
            </div>

            {/* Info Side */}
            <div className="flex flex-col justify-center">
              <span className="inline-block w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                {event.eventType}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                {event.title}
              </h1>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar size={16} className="text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock size={16} className="text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={16} className="text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
                {event.description}
              </p>

              {event.registrationOpen && !isPast && (
                isExternal ? (
                  <a href={getRegisterLink()} target="_blank" rel="noopener noreferrer" className="inline-block w-fit">
                    <button className="rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-bold hover:opacity-90 transition-opacity">
                      Register Now ↗
                    </button>
                  </a>
                ) : (
                  <Link to={getRegisterLink()} className="inline-block w-fit">
                    <button className="rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-bold hover:opacity-90 transition-opacity">
                      Register Now
                    </button>
                  </Link>
                )
              )}

              {isPast && (
                <span className="inline-block w-fit rounded-full border border-muted-foreground/30 bg-muted/50 px-6 py-3 text-sm font-medium text-muted-foreground">
                  Event Completed
                </span>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery */}
        {event.gallery && event.gallery.length > 0 && (
          <ScrollReveal delay={200}>
            <div className="mt-12">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Event Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {event.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-border cursor-pointer hover:border-primary/30 transition-colors">
                    <img src={img} alt={`${event.title} gallery ${i + 1}`} className="w-full h-40 object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Full Image Modal */}
      {showFullImage && event.coverImage && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4" onClick={() => setShowFullImage(false)}>
          <button
            onClick={() => setShowFullImage(false)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors z-10"
          >
            <X size={20} />
          </button>
          <img
            src={event.coverImage}
            alt={event.title}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
