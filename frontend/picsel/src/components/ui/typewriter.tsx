import { useEffect, useState } from "react";

export default function Typewriter({ words, start, onComplete }) {
  const typingSpeed = 100;
  const deletingSpeed = 60;
  const delayBetweenWords = 800;

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!start) return;

    const currentWord = words[wordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          setTimeout(() => {
            if (wordIndex === words.length - 1) {
              onComplete && onComplete(); // trigger next line
            } else {
              setIsDeleting(true);
            }
          }, delayBetweenWords);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, start]);

  return (
    <span>
      {text}
      <span className="ml-1 animate-pulse">|</span>
    </span>
  );
}