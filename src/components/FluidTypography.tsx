import { useRef, useEffect, useCallback, type ReactNode } from 'react';

export interface FluidTypographyProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'span' | 'div';
  influenceRadius?: number;
  maxLift?: number;
  maxScale?: number;
  id?: string;
}

interface CharState {
  currentY: number;
  targetY: number;
  currentScale: number;
  targetScale: number;
  currentRotate: number;
  targetRotate: number;
}

/**
 * FluidTypography
 * Renders words & characters with responsive fluid typography and interactive
 * liquid/magnetic spring wave animations on cursor hover and touch.
 */
export default function FluidTypography({
  text,
  className = '',
  as = 'span',
  influenceRadius = 120,
  maxLift = 12,
  maxScale = 0.22,
  id,
}: FluidTypographyProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statesRef = useRef<CharState[]>([]);
  const isHoveredRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Split into words and characters while preserving spaces
  const words = text.split(' ');

  let globalCharIndex = 0;
  const wordElements: ReactNode[] = words.map((word, wIdx) => {
    const letters = word.split('');
    const charElements = letters.map((char) => {
      const idx = globalCharIndex++;
      return (
        <span
          key={`char-${wIdx}-${idx}`}
          ref={(el) => {
            charsRef.current[idx] = el;
          }}
          className="fluid-char"
          data-char={char}
          style={{ '--i': idx } as React.CSSProperties}
          aria-hidden="true"
        >
          {char}
        </span>
      );
    });

    return (
      <span key={`word-${wIdx}`} className="fluid-word">
        {charElements}
        {wIdx < words.length - 1 && <span className="fluid-space">&nbsp;</span>}
      </span>
    );
  });

  const totalChars = globalCharIndex;

  // Initialize character spring physics states
  useEffect(() => {
    statesRef.current = Array.from({ length: totalChars }, () => ({
      currentY: 0,
      targetY: 0,
      currentScale: 1,
      targetScale: 1,
      currentRotate: 0,
      targetRotate: 0,
    }));
  }, [totalChars]);

  // Animation loop with spring physics damping
  const updatePhysics = useCallback(() => {
    let hasMotion = false;
    const states = statesRef.current;
    const chars = charsRef.current;

    for (let i = 0; i < states.length; i++) {
      const st = states[i];
      const el = chars[i];
      if (!st || !el) continue;

      // Spring interpolation
      const diffY = st.targetY - st.currentY;
      const diffScale = st.targetScale - st.currentScale;
      const diffRotate = st.targetRotate - st.currentRotate;

      if (
        Math.abs(diffY) > 0.05 ||
        Math.abs(diffScale) > 0.003 ||
        Math.abs(diffRotate) > 0.05
      ) {
        hasMotion = true;
        st.currentY += diffY * 0.24;
        st.currentScale += diffScale * 0.24;
        st.currentRotate += diffRotate * 0.24;
      } else {
        st.currentY = st.targetY;
        st.currentScale = st.targetScale;
        st.currentRotate = st.targetRotate;
      }

      if (st.currentY !== 0 || st.currentScale !== 1 || st.currentRotate !== 0) {
        el.style.transform = `translate3d(0, ${st.currentY.toFixed(2)}px, 0) scale(${st.currentScale.toFixed(3)}) rotate(${st.currentRotate.toFixed(2)}deg)`;
        el.style.zIndex = st.currentScale > 1.05 ? '3' : '1';
      } else {
        el.style.transform = '';
        el.style.zIndex = '';
      }
    }

    if (hasMotion || isHoveredRef.current) {
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    } else {
      animFrameRef.current = null;
    }
  }, []);

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      isHoveredRef.current = true;
      const chars = charsRef.current;
      const states = statesRef.current;

      chars.forEach((el, i) => {
        const st = states[i];
        if (!el || !st) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const distance = Math.hypot(dx, dy);

        if (distance < influenceRadius) {
          // Smooth cosine bell curve (fluid wave shape)
          const force = Math.cos((distance / influenceRadius) * (Math.PI / 2));
          st.targetY = -force * maxLift;
          st.targetScale = 1 + force * maxScale;
          st.targetRotate = (dx / (distance || 1)) * force * 5;
        } else {
          st.targetY = 0;
          st.targetScale = 1;
          st.targetRotate = 0;
        }
      });

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      }
    },
    [influenceRadius, maxLift, maxScale, updatePhysics],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    statesRef.current.forEach((st) => {
      st.targetY = 0;
      st.targetScale = 1;
      st.targetRotate = 0;
    });

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={containerRef as any}
      id={id}
      className={`fluid-typography-root ${className}`}
      aria-label={text}
      onMouseMove={handleMouseMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
    >
      {wordElements}
    </Tag>
  );
}
