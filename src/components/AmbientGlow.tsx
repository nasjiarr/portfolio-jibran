import '../styles/ambient-glow.css';

export interface AmbientGlowProps {
  className?: string;
}

/**
 * AmbientGlow
 * Sleek, modern ambient aurora glow and mesh gradient background (inspired by Linear & Vercel).
 * Features multi-color atmospheric light orbs, top stage spotlight, and edge vignette.
 */
export default function AmbientGlow({ className = '' }: AmbientGlowProps) {
  return (
    <div className={`ambient-glow-wrapper ${className}`} aria-hidden="true">
      {/* Top Center Spotlight */}
      <div className="ambient-glow-spotlight" />

      {/* Aurora Orbs */}
      <div className="ambient-glow-orb ambient-glow-orb--cyan" />
      <div className="ambient-glow-orb ambient-glow-orb--indigo" />
      <div className="ambient-glow-orb ambient-glow-orb--teal" />

      {/* Cinematic Vignette */}
      <div className="ambient-glow-vignette" />
    </div>
  );
}
