import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/ambient-glow.css';

export interface AmbientGlowProps {
  className?: string;
  enableMouseFollow?: boolean;
}

/**
 * AmbientGlow
 * Sleek, modern ambient aurora glow and mesh gradient background (inspired by Linear & Vercel).
 * Features multi-color atmospheric light orbs, top stage spotlight, smooth mouse cursor tracking,
 * and edge vignette without any busy retro grid lines.
 */
export default function AmbientGlow({
  className = '',
  enableMouseFollow = true,
}: AmbientGlowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorActive, setCursorActive] = useState(false);

  const targetPos = useRef({ x: -9999, y: -9999 });
  const currentPos = useRef({ x: -9999, y: -9999 });
  const animFrameId = useRef<number | null>(null);

  const updateCursorPhysics = useCallback(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    // Smooth lerp interpolation
    const dx = targetPos.current.x - currentPos.current.x;
    const dy = targetPos.current.y - currentPos.current.y;

    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      currentPos.current.x += dx * 0.12;
      currentPos.current.y += dy * 0.12;
      cursorEl.style.left = `${currentPos.current.x.toFixed(1)}px`;
      cursorEl.style.top = `${currentPos.current.y.toFixed(1)}px`;
    }

    animFrameId.current = requestAnimationFrame(updateCursorPhysics);
  }, []);

  useEffect(() => {
    if (!enableMouseFollow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setCursorActive(false);
      } else {
        targetPos.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        if (currentPos.current.x === -9999) {
          currentPos.current = { ...targetPos.current };
        }

        setCursorActive(true);
      }
    };

    const handleMouseLeave = () => {
      setCursorActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    animFrameId.current = requestAnimationFrame(updateCursorPhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [enableMouseFollow, updateCursorPhysics]);

  return (
    <div
      ref={containerRef}
      className={`ambient-glow-wrapper ${className}`}
      aria-hidden="true"
    >
      {/* Top Center Spotlight */}
      <div className="ambient-glow-spotlight" />

      {/* Aurora Orbs */}
      <div className="ambient-glow-orb ambient-glow-orb--cyan" />
      <div className="ambient-glow-orb ambient-glow-orb--indigo" />
      <div className="ambient-glow-orb ambient-glow-orb--teal" />

      {/* Interactive Cursor Spotlight */}
      {enableMouseFollow && (
        <div
          ref={cursorRef}
          className="ambient-glow-cursor"
          style={{ opacity: cursorActive ? 1 : 0 }}
        />
      )}

      {/* Cinematic Vignette */}
      <div className="ambient-glow-vignette" />
    </div>
  );
}
