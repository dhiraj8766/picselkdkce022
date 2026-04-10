import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Award, Code2 } from "lucide-react";
import picselLogo from "@/assets/picsel-logo.png";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "500+", label: "Members", icon: Users },
  { value: "50+", label: "Events", icon: Calendar },
  { value: "15+", label: "Workshops", icon: Code2 },
  { value: "3", label: "Years", icon: Award },
];

/* Previous timeline
const timeline = [
  { year: "2023", title: "Club Founded", description: "PICSEL Club was established under the Department of Computer Science & Engineering at KDKCE." },
  { year: "2024", title: "First Hackathon", description: "Successfully organized our first inter-college hackathon with 200+ participants." },
  { year: "2025", title: "National Recognition", description: "Recognized as one of the top student-led tech clubs in Maharashtra." },
  { year: "2026", title: "Expanding Horizons", description: "Launching new verticals in AI/ML, Cloud Computing, and Competitive Programming." },
];
*/
const timeline = [
  {
    year: "Institution",
    title: "KDKCE Foundation of Excellence",
    description:
      "KDK College of Engineering, Nagpur is one of the premier institutions of science and technology in India, known for high-quality knowledge delivery and cutting-edge research.",
  },
  {
    year: "2006",
    title: "FACE-IT Established",
    description:
      "The student forum FACE-IT was founded under the CSE department with a strong non-profit vision guided by eminent professors and dedicated students.",
  },
  {
    year: "Legacy",
    title: "FAHRENHEIT and Pre-Techfest Growth",
    description:
      "Alongside FAHRENHEIT, the forum expanded through pre-Techfest initiatives. The key objective was to provide a national platform for students to showcase technical talent.",
  },
  {
    year: "Aug 2023",
    title: "FACE-IT Renamed to PICSEL",
    description:
      "FACE-IT was renamed as PICSEL with dual aims: spreading science and technology ideas among budding engineers and fostering all-round social and technical development.",
  },
  {
    year: "Today",
    title: "A Dynamic CSE-Driven Community",
    description:
      "PICSEL continues to empower students in computer science and engineering through events, workshops, symposiums, competitions, and real-world problem solving at the intersection of technology and innovation.",
  },
  {
    year: "Future",
    title: "Bigger Impact, Stronger Legacy",
    description:
      "With the long-standing FAHRENHEIT legacy in the Vidarbha region, PICSEL remains committed to delivering the latest in science and technology while keeping social and technical welfare at its core.",
  },
];

const values = [
  { title: "Innovation", description: "We push boundaries and explore emerging technologies to stay ahead.", color: "text-primary" },
  { title: "Collaboration", description: "We believe great things happen when diverse minds work together.", color: "text-accent-cyan" },
  { title: "Learning", description: "Continuous growth through hands-on projects, workshops, and peer mentoring.", color: "text-accent-yellow" },
  { title: "Leadership", description: "Empowering students to lead initiatives and create lasting impact.", color: "text-accent-green" },
];

const aboutLegacyNarrative = [
  "KDK College of Engineering, Nagpur is one of the premier institutions of science and technology in India. It is known for high-quality knowledge imparted to students and for its cutting-edge research culture.",
  "The student forum FACE-IT was established in 2006. From August 2023, it was renamed as PICSEL with dual aims: to provide budding engineers and innovators a platform for sharing and spreading ideas in science and technology, and to nurture socially responsible technical leadership. PICSEL is a non-profit initiative of eminent professors and an active group of students from the CSE department of KDKCE.",
  "Apart from technological growth, PICSEL has always envisioned the social development of students. With this mission, multiple initiatives are taken every year for all-round student development. Since its beginning, PICSEL has consistently focused on organizing bigger and better events that leave a lasting impact on young minds.",
  "The Computer Science and Engineering (CSE) branch is a dynamic field at the intersection of technology and innovation. It focuses on the design, development, and application of computer systems, software, and algorithms. CSE students are trained to solve complex problems, build cutting-edge technology, and drive advancement across industries.",
  "For the past several years, alongside FAHRENHEIT, FACE-IT and now PICSEL have organized pre-Techfest events that broaden the dimension of the overall technical culmination. The primary objective of FAHRENHEIT is to provide a national platform for students to showcase their talent.",
  "Our annual techfest, FAHRENHEIT, has earned the tag of one of the most popular and awaited technology festivals in the Vidarbha region through quality execution and participant-first hospitality. It is known for its unique blend of events, exhibitions, lecture series, technical symposiums, and competitions. Carrying this legacy forward since 2006, PICSEL remains committed to delivering the best and latest in science and technology with social and technical welfare at its core.",
];

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-background pb-mobile-nav pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-geo-pattern">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-cross-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-abstract-lines pointer-events-none" />
      
      <div className="relative z-10">
        {/* Hero */}
        <ScrollReveal direction="up" scale>
          <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-16">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <img src={picselLogo} alt="PICSEL" className="h-14 w-14 sm:h-20 sm:w-20 rounded-full border-2 border-primary/20 shadow-glow" />
            </div>
            <span className="mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[2px] sm:tracking-[3px] text-primary font-heading">About Us</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground md:text-6xl">
              We are <span className="text-primary">PICSEL</span>
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed text-muted-foreground">
              PICSEL (Panel in Computer Science and Engineering Learners) is the flagship community of 
              the Department of Computer Science & Engineering at K.D.K. College of Engineering, Nagpur. 
              We are a community of passionate learners, builders, and innovators.
            </p>
          </div>
        </ScrollReveal>

        {/* Legacy Narrative */}
        <ScrollReveal delay={80}>
          <div className="mx-auto mb-12 max-w-4xl rounded-2xl border border-border bg-card/70 p-5 sm:mb-16 sm:p-8">
            <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[3px] text-primary sm:text-xs font-heading">
              Our Legacy
            </span>
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">From FACE-IT to PICSEL</h2>
            <div className="mt-4 space-y-4 text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
              {aboutLegacyNarrative.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={100}>
          <div className="mx-auto max-w-3xl mb-12 sm:mb-20">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {stats.map((stat, i) => (
                <ScrollReveal key={i} delay={i * 100} direction="up">
                  <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 text-center transition-all hover:border-primary/20 hover:shadow-glow">
                    <stat.icon className="mx-auto mb-1.5 sm:mb-2 text-primary" size={20} />
                    <span className="block text-2xl sm:text-3xl font-bold text-primary md:text-4xl font-heading">{stat.value}</span>
                    <span className="mt-1 block text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Mission & Vision */}
        <div className="mx-auto max-w-4xl mb-12 sm:mb-20 grid gap-4 sm:gap-8 md:grid-cols-2">
          <ScrollReveal direction="left" delay={0}>
            <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-8 h-full">
              <h3 className="mb-3 sm:mb-4 font-heading text-xl sm:text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                To create a vibrant ecosystem where students can explore, learn, and master emerging technologies 
                through hands-on projects, workshops, hackathons, and peer collaboration. We believe in learning by doing.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-secondary p-5 sm:p-8 h-full">
              <h3 className="mb-3 sm:mb-4 font-heading text-xl sm:text-2xl font-bold text-primary">Our Vision</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                To be the leading student-run technical community in the region, producing industry-ready engineers 
                who are not just skilled programmers, but creative problem-solvers and effective leaders.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Core Values */}
        <ScrollReveal>
          <div className="mx-auto max-w-4xl mb-12 sm:mb-20">
            <h2 className="mb-6 sm:mb-8 text-center font-heading text-2xl sm:text-3xl font-bold text-foreground">Core Values</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {values.map((v, i) => (
                <ScrollReveal key={i} delay={i * 80} scale>
                  <div className="rounded-lg sm:rounded-xl border border-border bg-card/50 p-3 sm:p-5 text-center transition-all hover:border-primary/20">
                    <h4 className={`text-xs sm:text-sm font-bold ${v.color} font-heading`}>{v.title}</h4>
                    <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <div className="mx-auto max-w-4xl mb-12 sm:mb-16">
            <h2 className="mb-6 sm:mb-8 text-center font-heading text-2xl sm:text-3xl font-bold text-foreground">Our Journey</h2>
            <div className="relative border-l-2 border-border ml-3 sm:ml-4">
              {timeline.map((item, index) => (
                <ScrollReveal key={index} direction="left" delay={index * 120}>
                  <div className="relative pl-6 sm:pl-8 pb-6 sm:pb-8">
                    <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <span className="font-mono text-[10px] uppercase tracking-wider sm:text-xs font-bold text-primary">{item.year}</span>
                    <h3 className="mt-1 text-base sm:text-lg font-bold text-foreground font-heading">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed sm:text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal scale delay={100}>
          <div className="mx-auto max-w-2xl text-center mb-6 sm:mb-8">
            <h2 className="mb-3 sm:mb-4 font-heading text-xl sm:text-2xl font-bold text-foreground">Want to join us?</h2>
            <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
              We're always looking for passionate individuals who want to learn, grow, and make an impact.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/team">
                <div className="hidden md:block valorant-btn-wrapper">
                  <button className="valorant-btn flex items-center gap-2">Meet the Team <ArrowRight size={16} /></button>
                </div>
                <button className="btn-mobile-primary md:hidden flex items-center gap-2 text-sm">Meet the Team <ArrowRight size={14} /></button>
              </Link>
              <Link to="/events">
                <button className="hidden md:block valorant-btn-outline">Explore Events</button>
                <button className="btn-mobile-outline md:hidden text-sm">Explore Events</button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutPage;
