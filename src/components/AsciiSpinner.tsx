import { useEffect, useState } from "react";

interface AsciiSpinnerProps {
  interval?: number;
  className?: string;
}

const AsciiSpinner: React.FC<AsciiSpinnerProps> = ({ interval = 100, className = "" }) => {
  const spinnerFrames = ["|", "/", "-", "\\"];
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const spin = setInterval(() => {
      setIndex((prev) => (prev + 1) % spinnerFrames.length);
    }, interval);
    return () => clearInterval(spin);
  }, [interval]);

  return (
    <span className={`text-2xl font-mono animate-pulse ${className}`}>
      {spinnerFrames[index]}
    </span>
  );
};

export default AsciiSpinner;