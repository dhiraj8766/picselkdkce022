import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Building2, BookOpen, GraduationCap, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { API } from "@/config/api";

const departments = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventTitle = searchParams.get("event") || "";
  const eventId = searchParams.get("eventId") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    department: departments[0],
    year: years[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) {
      setError("Please open this form from an event card.");
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.college.trim()) {
      setError("Please fill all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(API.REGISTRATIONS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eventId: Number(eventId), eventTitle }),
      });
      if (!res.ok) throw new Error("Registration failed");
      setSubmitted(true);
    } catch {
      setError("Registration failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pb-mobile-nav">
        <ScrollReveal scale>
          <div className="text-center max-w-md mx-auto">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Registration Successful!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mb-2">
              You've registered for <span className="text-primary font-semibold">{eventTitle}</span>.
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm mb-8">
              We'll send event details to your email. See you there!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/events")}
                className="valorant-btn-cyan text-center text-xs"
              >
                Browse More Events
              </button>
              <button
                onClick={() => navigate("/")}
                className="valorant-btn-outline text-center text-xs"
              >
                Back to Home
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 relative overflow-x-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{
        background: `
          radial-gradient(ellipse 60% 40% at 10% 20%, hsl(var(--accent-cyan) / 0.08) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 90% 80%, hsl(var(--accent-purple) / 0.06) 0%, transparent 50%)
        `
      }} />

      <div className="relative z-10 mx-auto max-w-xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <ScrollReveal direction="up" scale>
          {/* Header */}
          <div className="mb-8">
            <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-[2px] text-primary mb-2 font-heading">
              Event Registration
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              {eventTitle || "Register for Event"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in your details to secure your spot.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <User size={12} /> Full Name <span className="text-accent-red">*</span>
              </label>
              <input
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={100}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <Mail size={12} /> Email Address <span className="text-accent-red">*</span>
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                maxLength={255}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <Phone size={12} /> Phone Number <span className="text-accent-red">*</span>
              </label>
              <input
                type="tel"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                placeholder="10-digit phone number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                required
              />
            </div>

            {/* College */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <Building2 size={12} /> College Name <span className="text-accent-red">*</span>
              </label>
              <input
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                placeholder="Your college / institution"
                value={form.college}
                onChange={(e) => handleChange("college", e.target.value)}
                maxLength={200}
                required
              />
            </div>

            {/* Department + Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                  <BookOpen size={12} /> Department
                </label>
                <select
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  value={form.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                  <GraduationCap size={12} /> Year
                </label>
                <select
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  value={form.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-accent-red font-medium bg-accent-red/10 border border-accent-red/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="valorant-btn-cyan w-full text-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? "Registering..." : "Register Now"}
            </button>

            <p className="text-[10px] text-muted-foreground text-center mt-3">
              By registering, you agree to receive event-related communications.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default RegisterPage;
