import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import picselLogo from "@/assets/picsel-logo.png";
import { LAUNCH_DATE } from "@/config/launch.js";

type OverlayPhase = "countdown" | "celebrating" | "revealing" | "hidden";

type CountdownState = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type LaunchOverlayProps = {
  onComplete?: () => void;
};

const ZERO_COUNTDOWN: CountdownState = {
  totalMs: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

// const CELEBRATION_DURATION_MS = 1400;
// const CELEBRATION_DURATION_MS = 12000;
const CELEBRATION_DURATION_MS = 5500;
// const REVEAL_ANIMATION_DURATION_MS = 1000;
// const REVEAL_ANIMATION_DURATION_MS = 12000;
const REVEAL_ANIMATION_DURATION_MS = 4500;
// const REVEAL_START_DELAY_MS = 1400;
// const REVEAL_START_DELAY_MS = 500;
const REVEAL_START_DELAY_MS = 250;

/**
 * Converts remaining milliseconds into a structured countdown state.
 */
const calculateCountdown = (targetDate: string): CountdownState => {
  const diff = Math.max(new Date(targetDate).getTime() - Date.now(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
  };
};

/**
 * Full-screen launch overlay that blocks app access until launch time,
 * then celebrates and reveals the website with a curtain transition.
 */
const LaunchOverlay = ({ onComplete }: LaunchOverlayProps) => {
  const [phase, setPhase] = useState<OverlayPhase>("countdown");
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateCountdown(LAUNCH_DATE),
  );

  const hasTriggeredCompletionRef = useRef(false);
  const timeoutIdsRef = useRef<number[]>([]);

  const countdownItems = useMemo(
    () => [
      { label: "Days", value: countdown.days },
      { label: "Hours", value: countdown.hours },
      { label: "Minutes", value: countdown.minutes },
      { label: "Seconds", value: countdown.seconds },
    ],
    [countdown.days, countdown.hours, countdown.minutes, countdown.seconds],
  );

  const revealDurationStyle = useMemo(
    () => ({ transitionDuration: `${REVEAL_ANIMATION_DURATION_MS}ms` }),
    [],
  );

  useEffect(() => {
    const startCelebration = () => {
      // const durationMs = 1400;
      const durationMs = CELEBRATION_DURATION_MS;
      const endAt = Date.now() + durationMs;
      let lastBurstAt = 0;

      const frame = () => {
        const timeLeft = endAt - Date.now();
        if (timeLeft <= 0) {
          return;
        }

        const now = Date.now();
        if (now - lastBurstAt < 90) {
          requestAnimationFrame(frame);
          return;
        }
        lastBurstAt = now;

        // Previous confetti style used fixed top origins only (left/right/center).
        // New style: randomized bursts across the full viewport.
        const burstCount = 5;
        for (let burstIndex = 0; burstIndex < burstCount; burstIndex += 1) {
          confetti({
            particleCount: 10,
            startVelocity: 26,
            spread: 80,
            ticks: 115,
            scalar: 0.95,
            origin: {
              x: Math.random() * 0.98,
              y: Math.random() * 0.95,
            },
            gravity: 0.95,
            colors: ["#22d3ee", "#67e8f9", "#f5d76e", "#ffffff"],
          });
        }

        confetti({
          // particleCount: 3,
          particleCount: 12,
          startVelocity: 24,
          // spread: 60,
          spread: 75,
          ticks: 100,
          // scalar: 0.85,
          scalar: 0.95,
          // origin: { x: 0.22, y: 0.62 },
          origin: { x: 0.18, y: 0.08 },
          gravity: 0.95,
          colors: ["#22d3ee", "#67e8f9", "#f5d76e", "#ffffff"],
        });

        confetti({
          // particleCount: 3,
          particleCount: 12,
          startVelocity: 24,
          // spread: 60,
          spread: 75,
          ticks: 100,
          // scalar: 0.85,
          scalar: 0.95,
          // origin: { x: 0.78, y: 0.62 },
          origin: { x: 0.82, y: 0.08 },
          gravity: 0.95,
          colors: ["#22d3ee", "#67e8f9", "#f5d76e", "#ffffff"],
        });

        confetti({
          particleCount: 8,
          startVelocity: 22,
          spread: 90,
          ticks: 110,
          scalar: 0.9,
          // origin: { x: 0.5, y: 0.58 },
          origin: { x: 0.5, y: 0.06 },
          gravity: 1,
          colors: ["#22d3ee", "#67e8f9", "#f5d76e", "#ffffff"],
        });

        requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    };

    const handleCountdownEnd = () => {
      if (hasTriggeredCompletionRef.current) {
        return;
      }

      hasTriggeredCompletionRef.current = true;
      setCountdown(ZERO_COUNTDOWN);
      setPhase("celebrating");
      startCelebration();

      const revealTimer = window.setTimeout(() => {
        setPhase("revealing");
      // }, 1400);
      }, REVEAL_START_DELAY_MS);

      const finishTimer = window.setTimeout(() => {
        setPhase("hidden");
        onComplete?.();
      // }, 2400);
      }, REVEAL_START_DELAY_MS + REVEAL_ANIMATION_DURATION_MS);

      timeoutIdsRef.current.push(revealTimer, finishTimer);
    };

    const tick = () => {
      const nextCountdown = calculateCountdown(LAUNCH_DATE);
      setCountdown(nextCountdown);

      if (nextCountdown.totalMs <= 0) {
        handleCountdownEnd();
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(intervalId);
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase === "hidden") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  if (phase === "hidden") {
    return null;
  }

  // Previous classes kept for easy rollback:
  // Left curtain: transition-all + 12s duration + ease-out
  // Right curtain: transition-all + 12s duration + ease-out
  // Content wrapper: transition-opacity + 12s duration
  // Current reveal duration uses 4.5s for a less ad-like opening.

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.16),transparent_45%),linear-gradient(140deg,#020617_0%,#0f172a_100%)]" />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 transition-all ease-out ${
            phase === "revealing" ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
          style={revealDurationStyle}
        />
        <div
          className={`absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-slate-950 via-slate-900 to-slate-900 transition-all ease-out ${
            phase === "revealing" ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
          style={revealDurationStyle}
        />
      </div>

      <div
        className={`relative z-10 flex h-full w-full items-center justify-center px-4 transition-opacity ${
          phase === "revealing" ? "opacity-0" : "opacity-100"
        }`}
        style={revealDurationStyle}
      >
        <div className="w-full max-w-3xl rounded-3xl border border-cyan-300/20 bg-slate-900/40 p-6 text-center shadow-2xl shadow-cyan-950/30 backdrop-blur-md sm:p-10">
          <img
            src={picselLogo}
            alt="PICSEL logo"
            className="mx-auto mb-5 h-14 w-14 animate-pulse rounded-full border border-cyan-300/40 object-cover p-1 shadow-lg shadow-cyan-500/20 sm:h-16 sm:w-16"
          />

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/85 sm:text-sm">
            PICSEL 2026
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Launching Soon
          </h1>

          <p className="mt-3 font-body text-sm text-slate-300 sm:text-base">
            PICSEL Website is going live soon..
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-cyan-300/20 bg-slate-950/65 p-3 shadow-lg shadow-cyan-900/10 sm:p-4"
              >
                <p className="font-mono text-2xl font-semibold text-cyan-300 sm:text-4xl">
                  {item.value.toString().padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400 sm:text-[11px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {phase === "celebrating" && (
            <p className="mt-6 animate-pulse text-sm font-medium text-cyan-200">
              We are live. Opening the website...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchOverlay;
