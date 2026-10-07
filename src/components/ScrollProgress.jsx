import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const percentage = (scrollTop / scrollable) * 100;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);

      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] bg-[#C9A227]"
      style={{
        width: `${progress}%`,
      }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
