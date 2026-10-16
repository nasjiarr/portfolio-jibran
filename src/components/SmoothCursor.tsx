import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../context/ThemeContext';

export interface SmoothCursorProps {
  /** Size of cursor bounding box in px (default 40) */
  cursorSize?: number;
  /** Spring stiffness for position tracking (default 400) */
  stiffness?: number;
  /** Spring damping for position tracking (default 45) */
  damping?: number;
  /** Spring mass for position tracking (default 1) */
  mass?: number;
  /** Hide OS system cursor while custom cursor is active (default true) */
  hideSystemCursor?: boolean;
  /** Optional custom image URL to use instead of default arrow */
  cursorImage?: string;
  /** CSS mix-blend-mode: difference (default false) */
  enableBlendMode?: boolean;
  /** Invert colors: true = white fill / black stroke; false = black fill / white stroke (default true for dark theme) */
  invertIconColors?: boolean;
  /** Custom inner fill color override */
  innerColor?: string;
  /** Custom outer stroke color override */
  outerColor?: string;
  /** Squish scale down to 0.7 on mousedown (default true) */
  enableClickEffect?: boolean;
  /** Scale factor when hovering over clickable elements (default 1.15) */
  hoverScale?: number;
}

/**
 * Default Arrow Pointer SVG Icon
 * Exact vector geometry from Framer module:
 * https://framer.com/m/Smoothcursor-o8zdlR.js@qLDPTPk3Xac6BgcRjs6q
 */
const DefaultCursorSVG = ({
  innerColor = 'white',
  outerColor = 'black',
}: {
  innerColor?: string;
  outerColor?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 50 54"
      fill="none"
      style={{ overflow: 'visible' }}
    >
      <g filter="url(#smooth-cursor-shadow)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill={innerColor}
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke={outerColor}
          strokeWidth="2.25825"
        />
      </g>
      <defs>
        <filter
          id="smooth-cursor-shadow"
          x="0.602397"
          y="0.952444"
          width="49.0584"
          height="52.428"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.25825" />
          <feGaussianBlur stdDeviation="2.25825" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

// Damped Harmonic Oscillator step
function springStep(
  current: number,
  velocity: number,
  target: number,
  stiffness: number,
  damping: number,
  mass: number,
  dt: number,
): [number, number] {
  const displacement = current - target;
  const springForce = -stiffness * displacement;
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / mass;

  const nextVel = velocity + acceleration * dt;
  const nextPos = current + nextVel * dt;
  return [nextPos, nextVel];
}

/**
 * SmoothCursor (Magic Cursor Pro)
 * Direct implementation of Framer's Smoothcursor component.
 * Features:
 * - Fluid spring-damped trajectory tracking
 * - Direction-aligned angular rotation with angle-unwrapping
 * - Dynamic velocity squish & mousedown click scale feedback
 * - Subtle hover expansion on interactive elements (links, buttons)
 * - Automatic theme adaptation (Light / Dark mode)
 * - System cursor suppression (* { cursor: none !important })
 * - Responsive & mobile touch auto-detection
 */
export default function SmoothCursor({
  cursorSize = 40,
  stiffness = 400,
  damping = 45,
  mass = 1,
  hideSystemCursor = true,
  cursorImage,
  enableBlendMode = false,
  invertIconColors,
  innerColor: customInnerColor,
  outerColor: customOuterColor,
  enableClickEffect = true,
  hoverScale = 1.15,
}: SmoothCursorProps) {
  const isMounted = typeof window !== 'undefined';
  const [isVisible, setIsVisible] = useState(true);

  const { theme } = useTheme();
  const activeTheme = theme;

  // References for spring physics
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // Target values
  const targetX = useRef(-100);
  const targetY = useRef(-100);
  const targetRotation = useRef(0);
  const targetScale = useRef(1);

  // Current physics values
  const currX = useRef(-100);
  const currY = useRef(-100);
  const velX = useRef(0);
  const velY = useRef(0);

  const currRot = useRef(0);
  const velRot = useRef(0);

  const currScale = useRef(1);
  const velScale = useRef(0);

  // Mouse kinematics
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const isMouseDown = useRef(false);
  const isInteractiveHover = useRef(false);
  const hasMoved = useRef(false);
  const squishTimeoutRef = useRef<number | null>(null);

  const rafId = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);

  // 1. Device Constraints & Mobile Detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkConstraints = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobileWidth = window.innerWidth < 768;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isTouch = ('ontouchstart' in window) && (window.innerWidth < 1024);

      if (isMobileWidth || (isPortrait && window.innerWidth < 1024) || (isCoarse && isTouch)) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    checkConstraints();
    window.addEventListener('resize', checkConstraints);
    return () => window.removeEventListener('resize', checkConstraints);
  }, []);

  // 2. Physics animation loop
  useEffect(() => {
    if (!isMounted || !isVisible) return;

    let active = true;
    lastFrameTime.current = performance.now();

    const loop = (timestamp: number) => {
      if (!active) return;

      const elapsed = Math.min((timestamp - lastFrameTime.current) / 1000, 0.05);
      lastFrameTime.current = timestamp;

      // 2 sub-steps for numerical stability
      const subSteps = 2;
      const subDt = elapsed / subSteps;

      for (let i = 0; i < subSteps; i++) {
        // Position spring
        const [nx, nvx] = springStep(currX.current, velX.current, targetX.current, stiffness, damping, mass, subDt);
        currX.current = nx;
        velX.current = nvx;

        const [ny, nvy] = springStep(currY.current, velY.current, targetY.current, stiffness, damping, mass, subDt);
        currY.current = ny;
        velY.current = nvy;

        // Rotation spring (stiffness: 300, damping: 60)
        const [nrot, nvrot] = springStep(currRot.current, velRot.current, targetRotation.current, 300, 60, 1, subDt);
        currRot.current = nrot;
        velRot.current = nvrot;

        // Scale spring (stiffness: 500, damping: 35)
        const [nscale, nvscale] = springStep(currScale.current, velScale.current, targetScale.current, 500, 35, 1, subDt);
        currScale.current = nscale;
        velScale.current = nvscale;
      }

      // Update DOM transform directly without React rerender
      if (cursorRef.current && hasMoved.current) {
        cursorRef.current.style.transform = `translate3d(${currX.current}px, ${currY.current}px, 0) rotate(${currRot.current}deg) scale(${currScale.current})`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMounted, isVisible, stiffness, damping, mass]);

  // 3. Mouse kinematics, Click events & Interactive Hover
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted || !isVisible) {
      document.body.style.cursor = 'auto';
      return;
    }

    const updateVelocity = (currentPos: { x: number; y: number }) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      if (deltaTime > 0 && lastUpdateTime.current > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };

      if (!hasMoved.current) {
        hasMoved.current = true;
        currX.current = currentPos.x;
        currY.current = currentPos.y;
        targetX.current = currentPos.x;
        targetY.current = currentPos.y;
        lastMousePos.current = currentPos;
        lastUpdateTime.current = Date.now();
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '1';
        }
        return;
      }

      updateVelocity(currentPos);
      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
      );

      targetX.current = currentPos.x;
      targetY.current = currentPos.y;

      if (speed > 0.1) {
        // Direction vector: +90 aligns upward-pointing SVG tip with vector
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        accumulatedRotation.current += angleDiff;
        targetRotation.current = accumulatedRotation.current;
        previousAngle.current = currentAngle;

        // Apply movement squish if not clicked down and not hovering
        if (!isMouseDown.current && !isInteractiveHover.current) {
          targetScale.current = 0.95;
          if (squishTimeoutRef.current) clearTimeout(squishTimeoutRef.current);
          squishTimeoutRef.current = window.setTimeout(() => {
            if (!isMouseDown.current) {
              targetScale.current = isInteractiveHover.current ? hoverScale : 1;
            }
          }, 150);
        }
      }
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
      if (enableClickEffect) {
        targetScale.current = 0.7;
      }
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      if (enableClickEffect) {
        targetScale.current = isInteractiveHover.current ? hoverScale : 1;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('a, button, input, textarea, select, [role="button"], label, .interactive, .cursor-pointer');
      if (isInteractive) {
        isInteractiveHover.current = true;
        if (!isMouseDown.current) {
          targetScale.current = hoverScale;
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      const stillInteractive = !!related?.closest('a, button, input, textarea, select, [role="button"], label, .interactive, .cursor-pointer');
      if (!stillInteractive) {
        isInteractiveHover.current = false;
        if (!isMouseDown.current) {
          targetScale.current = 1;
        }
      }
    };

    const handleWindowLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      handleMouseUp();
    };

    const handleWindowEnter = () => {
      if (cursorRef.current && hasMoved.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    if (hideSystemCursor) {
      document.body.style.cursor = 'none';
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleWindowLeave);
    document.documentElement.addEventListener('mouseenter', handleWindowEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleWindowLeave);
      document.documentElement.removeEventListener('mouseenter', handleWindowEnter);
      document.body.style.cursor = 'auto';
      if (squishTimeoutRef.current) clearTimeout(squishTimeoutRef.current);
    };
  }, [isMounted, isVisible, hideSystemCursor, enableClickEffect, hoverScale]);

  if (!isMounted || !isVisible || typeof document === 'undefined') {
    return null;
  }

  // Resolve inner and outer colors based on theme or explicit override
  const isDark = activeTheme === 'dark';
  const shouldInvert = invertIconColors !== undefined ? invertIconColors : isDark;

  const resolvedInnerColor =
    customInnerColor || (shouldInvert ? '#ffffff' : '#09090b');
  const resolvedOuterColor =
    customOuterColor || (shouldInvert ? '#000000' : '#ffffff');

  return createPortal(
    <>
      {hideSystemCursor && (
        <style dangerouslySetInnerHTML={{ __html: '* { cursor: none !important; }' }} />
      )}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorSize,
          height: cursorSize,
          marginLeft: -cursorSize / 2,
          marginTop: -cursorSize / 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          willChange: 'transform',
          zIndex: 999999,
          mixBlendMode: enableBlendMode ? 'difference' : 'normal',
          opacity: 0, // Starts hidden until first mousemove
          transition: 'opacity 0.2s ease',
          transformOrigin: 'center center',
        }}
      >
        {cursorImage ? (
          <img
            src={cursorImage}
            alt="Custom Cursor"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <DefaultCursorSVG
            innerColor={resolvedInnerColor}
            outerColor={resolvedOuterColor}
          />
        )}
      </div>
    </>,
    document.body,
  );
}

// Export aliases
export { SmoothCursor as MagicCursorPro };
