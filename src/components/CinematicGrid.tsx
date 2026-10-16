import { useEffect, useRef } from 'react';

export interface CinematicGridProps {
  gridColor?: string;
  speed?: number;
  starCount?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

/**
 * CinematicGrid
 * Fullscreen 3D perspective infinite forward grid with horizon glow,
 * twinkling stars, distant fog, and vignette (inspired by BasePixel).
 */
export default function CinematicGrid({
  gridColor = '#00f2fe',
  speed = 1,
  starCount = 120,
  className = '',
}: CinematicGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];

    // Helper to convert hex / color to rgba
    const parseRgba = (color: string, alpha: number): string => {
      if (color.startsWith('#')) {
        let hex = color.slice(1);
        if (hex.length === 3) {
          hex = hex.split('').map((c) => c + c).join('');
        }
        const num = parseInt(hex, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return color;
    };

    // Initialize stars strictly above horizon
    const initStars = (w: number, horizonY: number) => {
      stars = [];
      const starColors = ['#ffffff', '#e0f7fa', '#80deea', '#b2ebf2', '#ffffff'];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * (horizonY - 8),
          radius: Math.random() * 1.3 + 0.35,
          baseAlpha: Math.random() * 0.65 + 0.35,
          twinkleSpeed: Math.random() * 0.0025 + 0.001,
          phase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const horizonY = height * 0.64;
      initStars(width, horizonY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 3D Perspective Grid Camera Parameters
    const fov = 320;
    const groundLevel = 140; // Height of camera above ground plane
    const nearZ = 35;
    const farZ = 1000;
    const lineSpacingZ = 45;
    const lineSpacingX = 55;

    let startTime = performance.now();

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const horizonY = height * 0.64;
      const vpX = width / 2;

      // 1. Deep cosmic background (#0a0a0f)
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, width, height);

      // Subtle gradient from top deep space towards horizon
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#06060a');
      skyGrad.addColorStop(0.65, '#0a0a14');
      skyGrad.addColorStop(1, '#0b1626');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // 2. Twinkling Stars above horizon
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = Math.max(
          0.1,
          Math.min(1, s.baseAlpha + Math.sin(elapsed * s.twinkleSpeed + s.phase) * 0.35),
        );
        ctx.fillStyle = parseRgba(s.color, alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Occasional soft star bloom
        if (s.radius > 1.1 && alpha > 0.7) {
          ctx.fillStyle = parseRgba(gridColor, alpha * 0.25);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. 3D Perspective Ground Plane & Infinite Moving Grid
      ctx.save();
      // Clip rendering to horizon and below for clean isolation
      ctx.beginPath();
      ctx.rect(0, horizonY, width, height - horizonY);
      ctx.clip();

      // Deep ground gradient under grid
      const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      groundGrad.addColorStop(0, '#071524');
      groundGrad.addColorStop(0.25, '#060e1a');
      groundGrad.addColorStop(1, '#05070c');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Calculate forward infinite scroll offset
      // Increasing offset moves lines towards camera (forward motion)
      const forwardVelocity = 0.045 * speed;
      const zOffset = (elapsed * forwardVelocity) % lineSpacingZ;

      // A. Transverse (Horizontal) Moving Grid Lines
      const numZLines = Math.ceil((farZ - nearZ) / lineSpacingZ) + 2;
      for (let i = numZLines; i >= 0; i--) {
        // Calculate Z distance for this line
        const z = nearZ + i * lineSpacingZ - zOffset;
        if (z < nearZ || z > farZ) continue;

        // Exact perspective projection
        const y = horizonY + (groundLevel * fov) / z;
        if (y < horizonY || y > height + 20) continue;

        // Proximity & fog attenuation factor
        const depthRatio = (z - nearZ) / (farZ - nearZ); // 0 (near) to 1 (far)
        const fogFade = Math.pow(1 - depthRatio, 1.4); // 1 near, 0 far
        const bottomFade = Math.min(1, (height - y) / 30); // Soft fade at very bottom
        const lineAlpha = fogFade * bottomFade * 0.7;

        if (lineAlpha > 0.01) {
          ctx.strokeStyle = parseRgba(gridColor, lineAlpha);
          ctx.lineWidth = 0.6 + (1 - depthRatio) * 1.3;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // B. Longitudinal (Perspective Depth) Grid Lines radiating from Vanishing Point
      const maxX = Math.max(width * 2.2, 2400);
      for (let x = -maxX; x <= maxX; x += lineSpacingX) {
        // Calculate projection at near plane and far plane
        const nearScreenX = vpX + (x * fov) / nearZ;
        const nearScreenY = horizonY + (groundLevel * fov) / nearZ;

        const farScreenX = vpX + (x * fov) / farZ;
        const farScreenY = horizonY + (groundLevel * fov) / farZ;

        // Skip lines completely outside viewport
        if (nearScreenX < -150 && farScreenX < -150) continue;
        if (nearScreenX > width + 150 && farScreenX > width + 150) continue;

        // Distance from center for subtle outer falloff
        const centerDist = Math.abs(x) / maxX;
        const lineMaxAlpha = Math.max(0.12, 0.65 - centerDist * 0.45);

        // Gradient stroke along depth: transparent near horizon, vibrant in mid-ground
        const longGrad = ctx.createLinearGradient(farScreenX, farScreenY, nearScreenX, nearScreenY);
        longGrad.addColorStop(0, parseRgba(gridColor, 0));
        longGrad.addColorStop(0.15, parseRgba(gridColor, lineMaxAlpha * 0.3));
        longGrad.addColorStop(0.7, parseRgba(gridColor, lineMaxAlpha));
        longGrad.addColorStop(1, parseRgba(gridColor, lineMaxAlpha * 0.4));

        ctx.strokeStyle = longGrad;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(farScreenX, farScreenY);
        ctx.lineTo(nearScreenX, nearScreenY);
        ctx.stroke();
      }

      ctx.restore();

      // 4. Horizon Glow & Atmospheric Haze (Teal / Cyan)
      // Diffuse atmospheric radial glow
      const horizonGlow = ctx.createRadialGradient(
        vpX,
        horizonY,
        0,
        vpX,
        horizonY,
        Math.max(width * 0.55, 550),
      );
      horizonGlow.addColorStop(0, parseRgba(gridColor, 0.35));
      horizonGlow.addColorStop(0.2, parseRgba(gridColor, 0.16));
      horizonGlow.addColorStop(0.55, parseRgba(gridColor, 0.04));
      horizonGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - 160, width, 320);

      // Distant Horizon Fog band
      const fogBand = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 60);
      fogBand.addColorStop(0, 'rgba(10, 10, 15, 0)');
      fogBand.addColorStop(0.45, parseRgba(gridColor, 0.14));
      fogBand.addColorStop(0.5, parseRgba(gridColor, 0.22));
      fogBand.addColorStop(0.55, parseRgba(gridColor, 0.14));
      fogBand.addColorStop(1, 'rgba(10, 10, 15, 0)');

      ctx.fillStyle = fogBand;
      ctx.fillRect(0, horizonY - 50, width, 110);

      // Soft central horizon beam (gently diffused, no harsh razor cut)
      ctx.save();
      ctx.shadowColor = gridColor;
      ctx.shadowBlur = 18;
      const beamGrad = ctx.createLinearGradient(0, 0, width, 0);
      beamGrad.addColorStop(0, 'transparent');
      beamGrad.addColorStop(0.25, parseRgba(gridColor, 0.2));
      beamGrad.addColorStop(0.5, parseRgba(gridColor, 0.65));
      beamGrad.addColorStop(0.75, parseRgba(gridColor, 0.2));
      beamGrad.addColorStop(1, 'transparent');

      ctx.strokeStyle = beamGrad;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();
      ctx.restore();

      // Soft atmospheric center fog to give clean backdrop for Hero content
      const centerFog = ctx.createRadialGradient(
        vpX,
        horizonY * 0.6,
        40,
        vpX,
        horizonY * 0.6,
        Math.min(width * 0.45, 540),
      );
      centerFog.addColorStop(0, 'rgba(10, 10, 15, 0.35)');
      centerFog.addColorStop(0.65, 'rgba(10, 10, 15, 0.12)');
      centerFog.addColorStop(1, 'transparent');
      ctx.fillStyle = centerFog;
      ctx.fillRect(0, 0, width, height);

      // 5. Cinematic Vignette (darkened edges & corners)
      const vignette = ctx.createRadialGradient(
        vpX,
        height * 0.5,
        Math.min(width, height) * 0.35,
        vpX,
        height * 0.5,
        Math.max(width, height) * 0.78,
      );
      vignette.addColorStop(0, 'rgba(10, 10, 15, 0)');
      vignette.addColorStop(0.5, 'rgba(10, 10, 15, 0.22)');
      vignette.addColorStop(0.85, 'rgba(10, 10, 15, 0.65)');
      vignette.addColorStop(1, 'rgba(10, 10, 15, 0.92)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [gridColor, speed, starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 pointer-events-none w-full h-full ${className}`}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'none',
      }}
    />
  );
}
