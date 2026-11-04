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
 * Optimized with high-efficiency rendering on mobile touch devices.
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
  const isDarkRef = useRef(true);
  const isMobileRef = useRef(false);
  const isVisibleRef = useRef(true);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [resolvedColor, setResolvedColor] = useState('#3b82f6');

  // Detect theme (dark or light)
  const updateColor = useCallback(() => {
    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkRef.current = isDark;

    if (particleColor !== 'auto') {
      setResolvedColor(particleColor);
      return;
    }
    setResolvedColor('#3b82f6');
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
      const isMobile =
        width < 768 ||
        (typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(pointer: coarse)').matches);
      isMobileRef.current = isMobile;

      // Scale count down significantly on narrow/touch screens for silky 60fps performance
      const effectiveCount = isMobile ? Math.min(particleCount, 16) : particleCount;

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
      const isMobile = isMobileRef.current;

      particlesRef.current.forEach((particle, index) => {
        // Distance to mouse (only on desktop/fine pointers)
        if (!isMobile) {
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
            const minOpacity = isDarkRef.current
              ? particle.baseOpacity * 0.35
              : Math.max(0.62, particle.baseOpacity * 0.9);
            particle.opacity = Math.max(minOpacity, particle.opacity - 0.02);
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
        }

        // Particle interaction (bounce or merge) - skip on mobile to prevent O(N^2) calculations
        if (particleInteraction && !isMobile) {
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
      const isDark = isDarkRef.current;
      const isMobile = isMobileRef.current;

      particlesRef.current.forEach((particle) => {
        ctx.save();
        const currentGlowMultiplier = particle.glowMultiplier || 1;

        if (isDark) {
          // Only use shadowBlur on desktop to prevent mobile rasterization lag
          if (!isMobile) {
            ctx.shadowColor = resolvedColor;
            ctx.shadowBlur = glowIntensity * currentGlowMultiplier * 2;
          }
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = resolvedColor;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Light Mode: crisp, defined particles with tight ambient halo
          const effectiveSize = particle.size * 1.25;
          if (!isMobile) {
            ctx.shadowColor = 'rgba(2, 132, 199, 0.4)';
            ctx.shadowBlur = Math.min(6, glowIntensity * currentGlowMultiplier * 0.5);
          }
          ctx.globalAlpha = Math.max(0.62, particle.opacity);
          ctx.fillStyle = resolvedColor;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, effectiveSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });
    },
    [resolvedColor, glowIntensity],
  );

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles(canvas);
    drawParticles(ctx);
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobileRef.current) return;
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

    isMobileRef.current =
      newWidth < 768 ||
      (typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(pointer: coarse)').matches);

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

  // IntersectionObserver: automatically pause animation loop when hero is off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        isVisibleRef.current = isIntersecting;
        if (isIntersecting) {
          if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animate);
          }
        } else {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [animate]);

  useEffect(() => {
    resizeCanvas();
    const container = containerRef.current;

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

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
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [handleMouseMove, handlePointerLeave, resizeCanvas]);

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
