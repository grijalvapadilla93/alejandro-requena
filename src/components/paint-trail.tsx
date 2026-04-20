"use client";
import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
  size: number;
  color: string;
}

export function PaintTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const frameRef = useRef<number>(0);

  const colors = [
    "rgba(0, 0, 0, 0.12)",
    "rgba(60, 59, 59, 0.10)",
    "rgba(79, 55, 11, 0.11)",
    "rgba(142, 111, 63, 0.09)",
    "rgba(95, 94, 94, 0.08)",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      addPoints();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
      addPoints();
    };

    const addPoints = () => {
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      const steps = Math.max(1, Math.floor(speed / 2));

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const x = mouseRef.current.prevX + dx * t;
        const y = mouseRef.current.prevY + dy * t;

        // Thin line — size varies very little, stays in 1-4px range
        const size = Math.max(0.8, Math.min(4, 2.5 - speed * 0.01));

        pointsRef.current.push({
          x,
          y,
          age: 0,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const maxAge = 100;

      // Draw as connected line segments for smooth continuous stroke
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age++;

        if (p.age > maxAge) continue;

        const fade = 1 - p.age / maxAge;

        // Draw line to next point
        if (i < points.length - 1) {
          const next = points[i + 1];
          if (next.age <= maxAge) {
            const nextFade = 1 - next.age / maxAge;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = p.color.replace(
              /[\d.]+\)$/,
              `${(parseFloat(p.color.match(/[\d.]+\)$/)![0]) * fade).toFixed(3)})`
            );
            ctx.lineWidth = p.size * fade;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
          }
        }
      }

      // Clean up old points
      while (points.length > 0 && points[0].age > maxAge) {
        points.shift();
      }

      // Limit for performance
      if (points.length > 1200) {
        points.splice(0, points.length - 1200);
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
