import { Mail, MapPin, Phone, Instagram, Linkedin, Twitter, Send, Facebook, MessageCircle } from "lucide-react";
import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

const socials = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/picsel_kdkce" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/picsel-kdkce" },
  { name: "Twitter/X", icon: Twitter, url: "https://twitter.com/picsel_kdkce" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/picsel.kdkce" },
  { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/919876543210" },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError("Please fill all fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(API.CONTACTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-geo-pattern">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-hex-pattern pointer-events-none" />

      <div className="relative z-10">
        <ScrollReveal direction="up" scale>
          <div className="mb-8 sm:mb-12 text-center">
            <span className="mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[2px] sm:tracking-[3px] text-primary font-heading">Get in Touch</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground md:text-6xl">Contact Us</h1>
            <p className="mx-auto mt-2 sm:mt-3 max-w-md text-sm sm:text-base text-muted-foreground">
              Have questions, ideas, or want to collaborate? We'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-5xl grid gap-4 sm:gap-8 md:grid-cols-2">
          <div className="space-y-4 sm:space-y-6">
            <ScrollReveal direction="left" delay={100}>
              <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6">
                <h3 className="mb-3 sm:mb-4 font-heading text-base sm:text-lg font-bold text-foreground">Contact Information</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">Email</p>
                      <a href="mailto:picsel@kdkce.edu" className="text-xs sm:text-sm text-muted-foreground hover:text-primary">picsel@kdkce.edu</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">Phone</p>
                      <a href="tel:+919876543210" className="text-xs sm:text-sm text-muted-foreground hover:text-primary">+91 98765 43210</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">Address</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        K.D.K. College of Engineering,<br />Nagpur, Maharashtra, India - 440009
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6">
                <h3 className="mb-3 sm:mb-4 font-heading text-base sm:text-lg font-bold text-foreground">Follow Us</h3>
                <div className="flex gap-2 sm:gap-3">
                  {socials.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-glow"
                      aria-label={s.name}>
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" delay={150}>
            <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6">
              <h3 className="mb-3 sm:mb-4 font-heading text-base sm:text-lg font-bold text-foreground">Send a Message</h3>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
                    <Send className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-foreground font-semibold">Message Sent!</p>
                  <p className="text-sm text-muted-foreground mt-1">We'll get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-xs text-primary hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg sm:rounded-xl border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg sm:rounded-xl border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="your@email.com" required />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Subject</label>
                    <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg sm:rounded-xl border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="What's this about?" required />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Message</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3}
                      className="w-full rounded-lg sm:rounded-xl border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="Your message..." required />
                  </div>
                  {error && <p className="text-xs text-accent-red bg-accent-red/10 border border-accent-red/20 rounded-lg px-3 py-2">{error}</p>}
                  <button type="submit" disabled={submitting} className="hidden md:flex valorant-btn-cyan items-center gap-2 w-full justify-center disabled:opacity-50">
                    <Send size={16} /> {submitting ? "Sending..." : "Send Message"}
                  </button>
                  <button type="submit" disabled={submitting} className="btn-mobile-primary md:hidden w-full flex items-center gap-2 justify-center text-sm disabled:opacity-50">
                    <Send size={14} /> {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
