import { useState, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Layers } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

interface EventData {
  id: number;
  title: string;
  date: string;
  eventType: string;
  coverImage: string;
  gallery?: string[];
}

const GalleryPage = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number; title: string } | null>(null);

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
              .filter((e: EventData) => {
                const d = new Date(e.date);
                d.setHours(0, 0, 0, 0);
                return d < today;
              })
              .sort((a: EventData, b: EventData) => new Date(b.date).getTime() - new Date(a.date).getTime())
          );
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = useMemo(() => {
    const types = new Set(events.map((e) => e.eventType));
    return ["All", ...Array.from(types)];
  }, [events]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return events;
    return events.filter((e) => e.eventType === activeFilter);
  }, [events, activeFilter]);

  // Collect all photos with event info
  const allPhotos = useMemo(() => {
    const photos: { src: string; title: string; eventType: string; allImages: string[]; indexInEvent: number }[] = [];
    filtered.forEach((event) => {
      const imgs = event.gallery && event.gallery.length > 0 ? event.gallery : event.coverImage ? [event.coverImage] : [];
      imgs.forEach((src, i) => {
        photos.push({ src, title: event.title, eventType: event.eventType, allImages: imgs, indexInEvent: i });
      });
    });
    return photos;
  }, [filtered]);

  const openLightbox = (images: string[], index: number, title: string) => {
    setLightbox({ images, index, title });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  const navLightbox = (dir: number) => {
    if (!lightbox) return;
    const len = lightbox.images.length;
    setLightbox({ ...lightbox, index: (lightbox.index + dir + len) % len });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navLightbox(-1);
      if (e.key === "ArrowRight") navLightbox(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm font-heading animate-pulse">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-hex-pattern pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up" scale>
          <div className="mb-8 sm:mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-4">
              <Camera size={14} className="text-primary" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-primary font-heading">
                Photo Gallery
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent-cyan))] to-[hsl(var(--accent-purple))] bg-clip-text text-transparent">
                Event Memories
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-muted-foreground">
              Relive the moments that defined our journey through stunning captures.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mt-6">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary font-heading">{events.length}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Events</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[hsl(var(--accent-yellow))] font-heading">{allPhotos.length}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Photos</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[hsl(var(--accent-purple))] font-heading">{categories.length - 1}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Categories</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat === "All" && <Layers size={13} />}
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        {allPhotos.length > 0 ? (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {allPhotos.map((photo, i) => (
              <ScrollReveal key={`${photo.src}-${i}`} delay={Math.min(i * 40, 400)} direction="up">
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card break-inside-avoid transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  onClick={() => openLightbox(photo.allImages, photo.indexInEvent, photo.title)}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                    <p className="text-xs sm:text-sm font-bold text-foreground font-heading line-clamp-1">{photo.title}</p>
                    <span className="mt-1 inline-block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {photo.eventType}
                    </span>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                    <ZoomIn size={14} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Camera size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg font-heading font-bold text-muted-foreground">No photos found</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Check back after our next event!</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-destructive hover:border-destructive transition-colors"
          >
            <X size={18} />
          </button>

          {/* Title */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
            <p className="text-sm sm:text-base font-bold text-foreground font-heading">{lightbox.title}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {lightbox.index + 1} / {lightbox.images.length}
            </p>
          </div>

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt={lightbox.title}
            className="max-h-[80vh] max-w-[90vw] sm:max-w-[85vw] object-contain rounded-lg sm:rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Nav arrows */}
          {lightbox.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navLightbox(-1); }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-card/80 border border-border text-foreground backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navLightbox(1); }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-card/80 border border-border text-foreground backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {lightbox.images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto scrollbar-hide px-2 py-1">
              {lightbox.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: i }); }}
                  className={`h-12 w-16 sm:h-14 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    i === lightbox.index
                      ? "border-primary ring-2 ring-primary/30 scale-105"
                      : "border-border opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
