import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight, Maximize2, Info } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

interface EventData {
  id: number; title: string; description: string; date: string; time: string;
  location: string; coverImage: string; registerUrl: string; eventType: string;
  token: string; gallery?: string[];
  registrationOpen?: boolean; registrationType?: string; googleFormUrl?: string;
}

const eventTypes = [
  { key: "Technical", label: "Technical Events" },
  { key: "Esports", label: "Esports" },
  { key: "Sports", label: "Sports Events" },
  { key: "Fun", label: "Fun Events" },
];

const MiniCalendar = ({ events: calEvents, onEventClick }: { events: EventData[]; onEventClick: (event: EventData) => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  // Only show upcoming events in calendar
  const upcomingCalEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return calEvents.filter(e => new Date(e.date) >= now);
  }, [calEvents]);

  const eventsByDate = useMemo(() => {
    const map = new Map<number, EventData[]>();
    upcomingCalEvents.forEach(e => {
      const d = new Date(e.date);
      if (d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()) {
        const day = d.getDate();
        if (!map.has(day)) map.set(day, []);
        map.get(day)!.push(e);
      }
    });
    return map;
  }, [upcomingCalEvents, currentMonth]);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  const hoveredEvents = hoveredDay !== null ? eventsByDate.get(hoveredDay) : null;

  return (
    <div className="rounded-xl sm:rounded-2xl border border-[#c4a97d]/30 bg-[#ebe4d2]/70 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1 text-[#8a7a6a] hover:text-[#1a3a2a] transition-colors"><ChevronLeft size={16} /></button>
        <h3 className="text-xs sm:text-sm font-bold text-[#1a3a2a] font-heading">{monthName}</h3>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1 text-[#8a7a6a] hover:text-[#1a3a2a] transition-colors"><ChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="text-[9px] sm:text-[10px] font-bold text-[#8a7a6a] py-1">{d}</div>
        ))}
        {days.map((day, i) => {
          const hasEvent = day !== null && eventsByDate.has(day);
          return (
            <div key={i}
              className={`relative h-7 w-7 sm:h-8 sm:w-8 mx-auto flex items-center justify-center rounded-lg text-[10px] sm:text-xs transition-colors ${
                day === null ? "" : hasEvent
                  ? "bg-[#2d5a3d]/15 text-[#2d5a3d] font-bold border border-[#2d5a3d]/30 cursor-pointer hover:bg-[#2d5a3d]/30"
                  : "text-[#5a7d6a] hover:bg-[#c4a97d]/20"
              }`}
              onMouseEnter={() => hasEvent && setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              onClick={() => { if (hasEvent && day !== null) onEventClick(eventsByDate.get(day)![0]); }}>
              {day}
              {hasEvent && hoveredDay === day && hoveredEvents && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-40 sm:w-44 rounded-lg bg-[#1a3a2a] text-[#f3ecdc] p-2 sm:p-2.5 shadow-lg pointer-events-none animate-[fadeIn_0.15s_ease-out]">
                  {hoveredEvents.map(ev => (
                    <div key={ev.id} className="mb-1 last:mb-0">
                      <p className="text-[10px] sm:text-[11px] font-semibold truncate">{ev.title}</p>
                      <p className="text-[8px] sm:text-[9px] opacity-70">{ev.time} · {ev.location}</p>
                    </div>
                  ))}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1a3a2a]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CategorySlider = ({ type, typeEvents, onEventClick }: { type: typeof eventTypes[0]; typeEvents: EventData[]; onEventClick: (e: EventData) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
  }, []);

  return (
    <div className="mb-6 sm:mb-10">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-lg font-bold text-[#2d5a3d] font-heading">{type.label}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-[#8a7a6a] mr-1">{typeEvents.length} events</span>
          <button onClick={() => scroll("left")} className="hidden md:flex h-8 w-8 items-center justify-center rounded-full border border-[#c4a97d]/40 bg-[#f3ecdc] text-[#2d5a3d] hover:bg-[#2d5a3d] hover:text-[#f3ecdc] transition-colors"><ChevronLeft size={16} /></button>
          <button onClick={() => scroll("right")} className="hidden md:flex h-8 w-8 items-center justify-center rounded-full border border-[#c4a97d]/40 bg-[#f3ecdc] text-[#2d5a3d] hover:bg-[#2d5a3d] hover:text-[#f3ecdc] transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
        {typeEvents.map((event) => (
          <div key={event.id} onClick={() => onEventClick(event)}
            className="group flex-shrink-0 w-[72vw] sm:w-[280px] md:w-[300px] lg:w-[320px] snap-start cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-[#c4a97d]/30 bg-[#ebe4d2]/60 transition-all hover:border-[#2d5a3d]/30 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]">
            <div className="relative h-36 sm:h-40 overflow-hidden">
              {event.coverImage ? (
                <img src={event.coverImage} alt={event.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" loading="lazy" />
              ) : (
                <div className="h-full w-full bg-[#c4a97d]/20 flex items-center justify-center text-[#8a7a6a] text-sm">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#ebe4d2] to-transparent" />
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full border border-[#2d5a3d]/30 bg-[#f3ecdc]/80 px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase text-[#2d5a3d] backdrop-blur-sm">{event.eventType}</span>
            </div>
            <div className="p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm font-bold text-[#1a3a2a] font-heading">{event.title}</h4>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-[#5a7d6a] flex items-center gap-1"><Calendar size={10} /> {event.date}</p>
              <div className="mt-2 sm:mt-3 flex items-center gap-2 flex-wrap">
                {event.registrationOpen && (
                  event.registrationType === "google_form" && event.googleFormUrl ? (
                    <a href={event.googleFormUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <button className="rounded-full bg-[#1a3a2a] text-[#f3ecdc] text-[10px] sm:text-[11px] py-1 sm:py-1.5 px-2.5 sm:px-3 font-semibold hover:bg-[#2d5a3d] transition-colors">Register ↗</button>
                    </a>
                  ) : (
                    <Link to={`/register?event=${encodeURIComponent(event.title)}&eventId=${event.id}`} onClick={(e) => e.stopPropagation()}>
                      <button className="rounded-full bg-[#1a3a2a] text-[#f3ecdc] text-[10px] sm:text-[11px] py-1 sm:py-1.5 px-2.5 sm:px-3 font-semibold hover:bg-[#2d5a3d] transition-colors">Register ↗</button>
                    </Link>
                  )
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/event-detail?id=${event.id}`); }}
                  className="rounded-full border border-[#2d5a3d]/30 text-[#2d5a3d] text-[10px] sm:text-[11px] py-1 sm:py-1.5 px-2.5 sm:px-3 font-semibold hover:bg-[#2d5a3d]/10 transition-colors flex items-center gap-1"
                >
                  <Info size={10} /> More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showFullPoster, setShowFullPoster] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(API.EVENTS);
        if (res.ok) {
          const data = await res.json();
          setAllEvents(data.filter((e: EventData) => String(e.token) === "1"));
        }
      } catch (err) { console.error("Failed to fetch events:", err); }
      finally { setLoading(false); }
    };
    fetchEvents();
  }, []);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const upcomingEvents = allEvents.filter(e => new Date(e.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedEvents = allEvents.filter(e => new Date(e.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Only upcoming events for categories
  const upcomingForCategories = upcomingEvents;

  if (loading) {
    return (
      <div className="min-h-screen bg-events-cosmic flex items-center justify-center">
        <div className="text-[#8a7a6a] text-sm animate-pulse">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-events-cosmic">
      <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-[hsl(35,40%,75%,0.2)] pointer-events-none z-0 blur-[80px]" />
      <div className="absolute bottom-[15%] left-[8%] w-[250px] h-[250px] rounded-full bg-[hsl(30,35%,70%,0.15)] pointer-events-none z-0 blur-[70px]" />

      <div className="relative z-10">
        <ScrollReveal direction="up" scale>
          <div className="mb-6 sm:mb-8 border-b border-[#c4a97d]/30 pb-4 sm:pb-6">
            <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-[2px] sm:tracking-[3px] text-[#2d5a3d] mb-1.5 sm:mb-2 font-heading">Schedule</span>
            <h1 className="font-heading text-2xl sm:text-4xl font-bold text-[#1a3a2a] md:text-5xl">Upcoming & Past Events</h1>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 mb-10 sm:mb-16">
          <div className="flex-1 min-w-0">
            {upcomingEvents.length > 0 && (
              <ScrollReveal direction="left">
                <div className="mb-8 sm:mb-10">
                  <h2 className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#2d5a3d] font-heading flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#2d5a3d] animate-pulse" /> Upcoming
                  </h2>
                  <div className="relative border-l-2 border-[#2d5a3d]/30 ml-2 sm:ml-3 space-y-0">
                    {upcomingEvents.map((event, i) => {
                      const progress = ((i + 1) / upcomingEvents.length) * 100;
                      return (
                        <div key={event.id} className="group relative pl-5 sm:pl-8 pb-4 sm:pb-6 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                          <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-[#2d5a3d] bg-[#f3ecdc] group-hover:bg-[#2d5a3d] transition-colors" />
                          <div className="flex items-center gap-3 sm:gap-4 rounded-lg sm:rounded-xl border border-transparent p-2 sm:p-3 transition-all hover:border-[#c4a97d]/40 hover:bg-[#ebe4d2]/60">
                            <div className="hidden md:block min-w-[90px]">
                              <span className="font-mono text-[10px] sm:text-xs text-[#2d5a3d]">{event.date}</span>
                              <div className="mt-1 h-1 w-full rounded-full bg-[#c4a97d]/30 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-[#2d5a3d] to-[#4a8c6a]" style={{ width: `${progress}%` }} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base font-semibold text-[#1a3a2a] font-heading">{event.title}</h3>
                              <p className="text-[10px] sm:text-xs text-[#5a7d6a] mt-0.5 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                <span className="flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                                <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                              </p>
                              <span className="md:hidden font-mono text-[9px] sm:text-[10px] text-[#2d5a3d]">{event.date}</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                              {event.registrationOpen && (
                                event.registrationType === "google_form" && event.googleFormUrl ? (
                                  <a href={event.googleFormUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <button className="rounded-full bg-[#1a3a2a] text-[#f3ecdc] text-[11px] py-2 px-4 font-semibold hover:bg-[#2d5a3d] transition-colors">Register</button>
                                  </a>
                                ) : (
                                  <Link to={`/register?event=${encodeURIComponent(event.title)}&eventId=${event.id}`} onClick={(e) => e.stopPropagation()}>
                                    <button className="rounded-full bg-[#1a3a2a] text-[#f3ecdc] text-[11px] py-2 px-4 font-semibold hover:bg-[#2d5a3d] transition-colors">Register</button>
                                  </Link>
                                )
                              )}
                              <button
                                onClick={(e) => { e.stopPropagation(); navigate(`/event-detail?id=${event.id}`); }}
                                className="rounded-full border border-[#2d5a3d]/30 text-[#2d5a3d] text-[11px] py-2 px-4 font-semibold hover:bg-[#2d5a3d]/10 transition-colors flex items-center gap-1"
                              >
                                <Info size={12} /> More Info
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {completedEvents.length > 0 && (
              <ScrollReveal direction="left" delay={150}>
                <div className="mb-8 sm:mb-10" id="past">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8a7a6a] font-heading">Completed</h2>
                    <Link to="/xevents" className="text-[10px] sm:text-xs text-[#2d5a3d] hover:underline flex items-center gap-1">View all stories <ArrowRight size={10} /></Link>
                  </div>
                  <div className="relative border-l-2 border-[#c4a97d]/30 ml-2 sm:ml-3 space-y-0">
                    {completedEvents.map((event) => (
                      <div key={event.id} className="group relative pl-5 sm:pl-8 pb-4 sm:pb-6 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                        <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-[#c4a97d] bg-[#c4a97d]/30" />
                        <div className="flex items-center gap-3 sm:gap-4 rounded-lg sm:rounded-xl p-2 sm:p-3 opacity-60 transition-all hover:opacity-100 hover:bg-[#ebe4d2]/40">
                          <span className="font-mono text-[10px] sm:text-xs text-[#8a7a6a] min-w-[90px] hidden md:block">{event.date}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-medium text-[#3a5a4a]">{event.title}</h3>
                            <p className="text-[10px] sm:text-xs text-[#8a7a6a] mt-0.5 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <span className="flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                              <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                            </p>
                            <span className="md:hidden font-mono text-[9px] sm:text-[10px] text-[#8a7a6a]">{event.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {allEvents.length === 0 && (
              <div className="text-center py-16 text-[#8a7a6a]">
                <p className="text-lg font-heading font-bold">No events found</p>
                <p className="text-sm mt-2">Check back later for upcoming events.</p>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <MiniCalendar events={allEvents} onEventClick={setSelectedEvent} />
            </div>
          </div>
        </div>

        {/* Categories - Only upcoming events */}
        {upcomingForCategories.length > 0 && (
          <ScrollReveal>
            <div className="mt-6 sm:mt-8 mx-auto max-w-6xl">
              <h2 className="mb-5 sm:mb-8 text-center font-heading text-2xl sm:text-3xl font-bold text-[#1a3a2a] md:text-4xl">Explore by Category</h2>
              {eventTypes.map((type) => {
                const typeEvents = upcomingForCategories.filter(e => e.eventType === type.key);
                if (typeEvents.length === 0) return null;
                return <CategorySlider key={type.key} type={type} typeEvents={typeEvents} onEventClick={setSelectedEvent} />;
              })}
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-[#1a3a2a]/80 backdrop-blur-md p-0 sm:p-4" onClick={() => setSelectedEvent(null)}>
          <div className="w-full sm:max-w-lg overflow-hidden rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#c4a97d]/30 bg-[#f3ecdc] shadow-2xl animate-[scaleIn_0.3s_ease-out] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-40 sm:h-56">
              {selectedEvent.coverImage ? (
                <img src={selectedEvent.coverImage} alt={selectedEvent.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-[#c4a97d]/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f3ecdc] via-[#f3ecdc]/50 to-transparent" />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button onClick={() => setShowFullPoster(true)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3ecdc]/70 text-[#1a3a2a] backdrop-blur-sm hover:bg-[#c4a97d]"><Maximize2 size={14} /></button>
                <button onClick={() => { setSelectedEvent(null); setShowFullPoster(false); }} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3ecdc]/70 text-[#1a3a2a] backdrop-blur-sm hover:bg-[#c4a97d]">✕</button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2d5a3d] font-heading">{selectedEvent.title}</h2>
              <div className="mt-2 sm:mt-3 flex gap-3 sm:gap-4 text-xs sm:text-sm text-[#1a3a2a]">
                <span className="flex items-center gap-1"><Calendar size={12} /> {selectedEvent.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {selectedEvent.time}</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#5a7d6a] flex items-center gap-1"><MapPin size={12} /> {selectedEvent.location}</p>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-[#3a5a4a]">{selectedEvent.description}</p>
              <div className="mt-4 sm:mt-6 flex gap-3">
                {selectedEvent.registrationOpen && new Date(selectedEvent.date) >= now && (
                  selectedEvent.registrationType === "google_form" && selectedEvent.googleFormUrl ? (
                    <a href={selectedEvent.googleFormUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <button className="rounded-full bg-[#1a3a2a] text-[#f3ecdc] w-full py-2.5 sm:py-3 text-sm font-semibold hover:bg-[#2d5a3d] transition-colors">Register Now</button>
                    </a>
                  ) : (
                    <Link to={`/register?event=${encodeURIComponent(selectedEvent.title)}&eventId=${selectedEvent.id}`} className="flex-1">
                      <button className="rounded-full bg-[#1a3a2a] text-[#f3ecdc] w-full py-2.5 sm:py-3 text-sm font-semibold hover:bg-[#2d5a3d] transition-colors">Register Now</button>
                    </Link>
                  )
                )}
                <button
                  onClick={() => { setSelectedEvent(null); navigate(`/event-detail?id=${selectedEvent.id}`); }}
                  className="rounded-full border-2 border-[#2d5a3d]/30 text-[#2d5a3d] py-2.5 sm:py-3 px-6 text-sm font-semibold hover:bg-[#2d5a3d]/10 transition-colors flex items-center gap-2"
                >
                  <Info size={14} /> More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFullPoster && selectedEvent && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setShowFullPoster(false)}>
          <button onClick={() => setShowFullPoster(false)} className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">✕</button>
          <img src={selectedEvent.coverImage} alt={selectedEvent.title} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg animate-[scaleIn_0.3s_ease-out]" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default EventsPage;