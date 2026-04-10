import { useState, useEffect } from "react";

const greetings = [
  "Hello", "Hallo", "Hola", "Sawubona", "こんにちは",
  "안녕하세요", "مرحبا", "Ciao", "Olá", "Привет",
  "你好", "Bonjour", "Merhaba", "नमस्ते",
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => {
        if (prev >= greetings.length - 1) return prev;
        return prev + 1;
      });
    }, 180);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      clearInterval(greetingInterval);
    }, 2800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[99999] flex items-center justify-center bg-background transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <div className="text-center">
        <div className="h-16 flex items-center justify-center overflow-hidden">
          <span key={currentGreeting} className="text-3xl sm:text-5xl font-bold text-foreground font-heading animate-[fadeIn_0.15s_ease-out]">
            {greetings[currentGreeting]}
          </span>
        </div>
        <div className="mt-6 space-y-1">
          <p className="text-lg sm:text-xl font-bold text-primary font-heading tracking-wide">PICSEL</p>
          <p className="text-xs text-muted-foreground">Department of Computer Science & Engineering</p>
          <p className="text-[10px] text-muted-foreground/60">K.D.K. College of Engineering, Nagpur</p>
        </div>
        <div className="mt-8 mx-auto w-32 h-0.5 rounded-full bg-border overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-[progressFill_2.8s_ease-out]" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
