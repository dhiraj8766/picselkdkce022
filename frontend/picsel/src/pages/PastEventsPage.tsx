import { useState, useEffect } from "react";
import { Calendar, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

interface EventData {
  id: number; title: string; description: string; date: string; time: string;
  location: string; coverImage: string; eventType: string; token: string;
  gallery?: string[];
}

const PastEventsPage = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(API.EVENTS);
        if (res.ok) {
          const data = await res.json();
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          setEvents(
            data
              .filter((event: EventData) => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate < today;
              })
              .sort((a: EventData, b: EventData) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
              )
          );
        }
      } catch (err) { console.error("Failed to fetch events:", err); }
      finally { setLoading(false); }
    };
    fetchEvents();
  }, []);

  const openEvent = (event: EventData) => {
    setSelectedEvent(event);
    setGalleryIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-geo-pattern">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-hex-pattern pointer-events-none" />

      <div className="relative z-10">
        <ScrollReveal direction="up" scale>
          <div className="mb-8 sm:mb-12 text-center">
            <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-[2px] sm:tracking-[3px] text-primary mb-2 sm:mb-3 font-heading">Gallery</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">Successful Events</h1>
            <p className="mx-auto mt-2 sm:mt-3 max-w-lg text-sm sm:text-base text-muted-foreground">Relive the moments that defined our journey.</p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-6xl grid gap-4 sm:gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 100} direction="up">
              <div onClick={() => openEvent(event)}
                className="group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-glow active:scale-[0.99]">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  {event.coverImage ? (
                    <img src={event.coverImage} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">No Image</div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full border border-primary/50 bg-background/60 px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase text-primary backdrop-blur-sm">{event.eventType}</span>
                  {event.gallery && event.gallery.length > 0 && (
                    <span className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full bg-background/60 px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-foreground backdrop-blur-sm">📸 {event.gallery.length} photos</span>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">{event.title}</h3>
                  <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {event.location}</span>
                  </div>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-heading font-bold">No events found</p>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-background/90 backdrop-blur-md p-0 sm:p-4" onClick={() => setSelectedEvent(null)}>
          <div className="w-full sm:max-w-2xl overflow-hidden rounded-t-2xl sm:rounded-2xl border-t sm:border border-border bg-card shadow-card animate-[scaleIn_0.3s_ease-out] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48 sm:h-72">
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 ? (
                <img src={selectedEvent.gallery[galleryIndex]} alt={`${selectedEvent.title} photo`} className="h-full w-full object-cover" />
              ) : selectedEvent.coverImage ? (
                <img src={selectedEvent.coverImage} alt={selectedEvent.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card to-transparent" />
              <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-sm hover:bg-destructive"><X size={16} /></button>
              {selectedEvent.gallery && selectedEvent.gallery.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => (prev - 1 + selectedEvent.gallery!.length) % selectedEvent.gallery!.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-sm hover:bg-primary"><ChevronLeft size={16} /></button>
                  <button onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => (prev + 1) % selectedEvent.gallery!.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-sm hover:bg-primary"><ChevronRight size={16} /></button>
                </>
              )}
              {selectedEvent.gallery && selectedEvent.gallery.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {selectedEvent.gallery.map((_, i) => (
                    <button key={i} onClick={(e) => { e.stopPropagation(); setGalleryIndex(i); }} className={`h-1.5 rounded-full transition-all ${i === galleryIndex ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"}`} />
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 sm:p-6">
              <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 sm:px-3 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{selectedEvent.eventType}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading">{selectedEvent.title}</h2>
              <div className="mt-1.5 sm:mt-2 flex gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={12} /> {selectedEvent.date}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {selectedEvent.location}</span>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-secondary-foreground">{selectedEvent.description}</p>
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                <div className="mt-3 sm:mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
                  {selectedEvent.gallery.map((img, i) => (
                    <button key={i} onClick={() => setGalleryIndex(i)} className={`h-14 w-18 sm:h-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl border transition-all ${i === galleryIndex ? "border-primary ring-2 ring-primary/20" : "border-border opacity-60 hover:opacity-100"}`}>
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastEventsPage;
