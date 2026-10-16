import { useEffect, useRef, useState, useCallback } from 'react';

export interface FloatingParticlesBackgroundProps {
  particleCount?: number;
  particleSize?: number;
  particleOpacity?: number;
  glowIntensity?: number;
  glowAnimation?: 'instant' | 'ease' | 'spring';
  movementSpeed?: number;
  mouseInfluence?: number;
  backgroundColor?: string;
  particleColor?: string; // Hex, rgb, or 'auto' for theme-aware
  mouseGravity?: 'none' | 'attract' | 'repel';
  gravityStrength?: number;
  particleInteraction?: boolean;
  interactionType?: 'bounce' | 'merge';
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  mass: number;
  glowMultiplier?: number;
  glowVelocity?: number;
}

/**
 * FloatingParticlesBackground
 * Inspired by Framer module FloatingParticlesBackground
 * Floating dust / stardust particles background with mouse gravity, glow dynamics, and interaction
 */
export default function FloatingParticlesBackground({
  particleCount = 55,
  particleSize = 2.4,
  particleOpacity = 0.65,
  glowIntensity = 10,
  glowAnimation = 'spring',
  movementSpeed = 0.55,
  mouseInfluence = 130,
  backgroundColor = 'transparent',
  particleColor = 'auto',
  mouseGravity = 'attract',
  gravityStrength = 60,
  particleInteraction = true,
  interactionType = 'bounce',
  className = '',
}: FloatingParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [resolvedColor, setResolvedColor] = useState('#38bdf8');

  // Detect theme (dark or light)
  const updateColor = useCallback(() => {
    if (particleColor !== 'auto') {
      setResolvedColor(particleColor);
      return;
    }
    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setResolvedColor(isDark ? '#38bdf8' : '#0284c7');
  }, [particleColor]);

  useEffect(() => {
    updateColor();
    const observer = new MutationObserver(() => updateColor());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    return () => observer.disconnect();
  }, [updateColor]);

  const initializeParticles = useCallback(
    (width: number, height: number) => {
      // Scale count slightly down on narrow screens for silky 60fps performance
      const effectiveCount = width < 600 ? Math.min(particleCount, 28) : particleCount;

      return Array.from({ length: effectiveCount }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * movementSpeed,
        vy: (Math.random() - 0.5) * movementSpeed,
        size: Math.random() * particleSize + 1,
        opacity: particleOpacity,
        baseOpacity: particleOpacity,
        mass: Math.random() * 0.5 + 0.5,
        id: index,
        glowMultiplier: 1,
        glowVelocity: 0,
      }));
    },
    [particleCount, particleSize, particleOpacity, movementSpeed],
  );

  const redistributeParticles = useCallback((width: number, height: number) => {
    particlesRef.current.forEach((particle) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
    });
  }, []);

  const updateParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      const mouse = mouseRef.current;

      particlesRef.current.forEach((particle, index) => {
        // Distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse influence and gravity
        if (distance < mouseInfluence && distance > 0) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;
          const gravityForce = force * (gravityStrength * 0.001);

          if (mouseGravity === 'attract') {
            particle.vx += normalizedDx * gravityForce;
            particle.vy += normalizedDy * gravityForce;
          } else if (mouseGravity === 'repel') {
            particle.vx -= normalizedDx * gravityForce;
            particle.vy -= normalizedDy * gravityForce;
          }

          particle.opacity = Math.min(1, particle.baseOpacity + force * 0.4);

          // Glow animation
          const targetGlow = 1 + force * 2.2;
          const currentGlow = particle.glowMultiplier || 1;

          if (glowAnimation === 'instant') {
            particle.glowMultiplier = targetGlow;
          } else if (glowAnimation === 'ease') {
            const easeSpeed = 0.15;
            particle.glowMultiplier = currentGlow + (targetGlow - currentGlow) * easeSpeed;
          } else if (glowAnimation === 'spring') {
            const springForce = (targetGlow - currentGlow) * 0.2;
            const damping = 0.85;
            particle.glowVelocity = (particle.glowVelocity || 0) * damping + springForce;
            particle.glowMultiplier = currentGlow + particle.glowVelocity;
          }
        } else {
          particle.opacity = Math.max(particle.baseOpacity * 0.35, particle.opacity - 0.02);
          const targetGlow = 1;
          const currentGlow = particle.glowMultiplier || 1;

          if (glowAnimation === 'instant') {
            particle.glowMultiplier = targetGlow;
          } else if (glowAnimation === 'ease') {
            const easeSpeed = 0.08;
            particle.glowMultiplier = Math.max(1, currentGlow + (targetGlow - currentGlow) * easeSpeed);
          } else if (glowAnimation === 'spring') {
            const springForce = (targetGlow - currentGlow) * 0.15;
            const damping = 0.9;
            particle.glowVelocity = (particle.glowVelocity || 0) * damping + springForce;
            particle.glowMultiplier = Math.max(1, currentGlow + particle.glowVelocity);
          }
        }

        // Particle interaction (bounce or merge)
        if (particleInteraction) {
          for (let j = index + 1; j < particlesRef.current.length; j++) {
            const other = particlesRef.current[j];
            const odx = other.x - particle.x;
            const ody = other.y - particle.y;
            const odistance = Math.sqrt(odx * odx + ody * ody);
            const minDistance = particle.size + other.size + 5;

            if (odistance < minDistance && odistance > 0) {
              if (interactionType === 'bounce') {
                const normalX = odx / odistance;
                const normalY = ody / odistance;
                const relativeVx = particle.vx - other.vx;
                const relativeVy = particle.vy - other.vy;
                const speed = relativeVx * normalX + relativeVy * normalY;

                if (speed < 0) {
                  const impulse = (2 * speed) / (particle.mass + other.mass);
                  particle.vx -= impulse * other.mass * normalX;
                  particle.vy -= impulse * other.mass * normalY;
                  other.vx += impulse * particle.mass * normalX;
                  other.vy += impulse * particle.mass * normalY;

                  const overlap = minDistance - odistance;
                  const separationX = normalX * overlap * 0.5;
                  const separationY = normalY * overlap * 0.5;
                  particle.x -= separationX;
                  particle.y -= separationY;
                  other.x += separationX;
                  other.y += separationY;
                }
              } else if (interactionType === 'merge') {
                const mergeForce = (minDistance - odistance) / minDistance;
                particle.glowMultiplier = (particle.glowMultiplier || 1) + mergeForce * 0.5;
                other.glowMultiplier = (other.glowMultiplier || 1) + mergeForce * 0.5;
                const attractForce = mergeForce * 0.01;
                particle.vx += odx * attractForce;
                particle.vy += ody * attractForce;
                other.vx -= odx * attractForce;
                other.vy -= ody * attractForce;
              }
            }
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Subtle random movement
        particle.vx += (Math.random() - 0.5) * 0.001;
        particle.vy += (Math.random() - 0.5) * 0.001;

        // Damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Boundary wrapping
        if (particle.x < 0) particle.x = rect.width;
        if (particle.x > rect.width) particle.x = 0;
        if (particle.y < 0) particle.y = rect.height;
        if (particle.y > rect.height) particle.y = 0;
      });
    },
    [mouseInfluence, mouseGravity, gravityStrength, glowAnimation, particleInteraction, interactionType],
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      particlesRef.current.forEach((particle) => {
        ctx.save();
        const currentGlowMultiplier = particle.glowMultiplier || 1;
        ctx.shadowColor = resolvedColor;
        ctx.shadowBlur = glowIntensity * currentGlowMultiplier * 2;
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = resolvedColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    },
    [resolvedColor, glowIntensity],
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles(canvas);
    drawParticles(ctx);
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      mouseRef.current = { x: -9999, y: -9999 };
    } else {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    if (
      touch.clientX < rect.left ||
      touch.clientX > rect.right ||
      touch.clientY < rect.top ||
      touch.clientY > rect.bottom
    ) {
      mouseRef.current = { x: -9999, y: -9999 };
    } else {
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const newWidth = Math.floor(rect.width);
    const newHeight = Math.floor(rect.height);

    if (newWidth === 0 || newHeight === 0) return;

    canvas.width = newWidth;
    canvas.height = newHeight;

    setCanvasSize({ width: newWidth, height: newHeight });

    if (particlesRef.current.length > 0) {
      redistributeParticles(newWidth, newHeight);
    }
  }, [redistributeParticles]);

  // Reinitialize particles on canvas size change or particle count change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    particlesRef.current = initializeParticles(
      canvas.width || canvasSize.width,
      canvas.height || canvasSize.height,
    );
  }, [particleCount, initializeParticles, canvasSize]);

  // Update particle properties if props change
  useEffect(() => {
    particlesRef.current.forEach((particle) => {
      particle.baseOpacity = particleOpacity;
      particle.opacity = particleOpacity;
      const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (currentSpeed > 0) {
        const ratio = movementSpeed / currentSpeed;
        particle.vx *= ratio;
        particle.vy *= ratio;
      }
    });
  }, [particleOpacity, movementSpeed]);

  useEffect(() => {
    resizeCanvas();
    const container = containerRef.current;

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);

    let resizeObserver: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerLeave);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [handleMouseMove, handleTouchMove, handlePointerLeave, resizeCanvas]);

  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={`floating-particles-container ${className}`}
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
