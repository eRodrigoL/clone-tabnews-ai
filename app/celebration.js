"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });
const COLORS = ["#f5be32", "#f5f2e9", "#e79d27", "#8dbf9e"];

export default function Celebration() {
  const [viewport, setViewport] = useState(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    function updateViewport() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setViewport(preference.matches ? null : {
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    }
    updateViewport();
    window.addEventListener("resize", updateViewport);
    preference.addEventListener("change", updateViewport);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateViewport);
      preference.removeEventListener("change", updateViewport);
    };
  }, [complete]);

  if (!viewport || complete) return null;

  return (
    <Confetti
      {...viewport}
      aria-hidden="true"
      style={{ position: "fixed", pointerEvents: "none", zIndex: 2 }}
      numberOfPieces={250}
      recycle={false}
      gravity={0.18}
      tweenDuration={1800}
      colors={COLORS}
      onConfettiComplete={() => setComplete(true)}
    />
  );
}
