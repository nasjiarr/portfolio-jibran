import { useEffect, useState, useRef, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import { usePreloader } from '../context/PreloaderContext';
import '../styles/terminal-preloader.css';

export interface TerminalPreloaderProps {
  /** Optional callback fired when preloader finishes */
  onComplete?: () => void;
  /** Whether to show only once per browser session (default false for easy testing) */
  oncePerSession?: boolean;
}

/**
 * TerminalPreloader (Option 1)
 * Cyber / Developer Bootup splash screen.
 * Snappy 1.1s - 1.3s sequence that orchestrates seamlessly with Hero & TerminalConsole.
 */
export default function TerminalPreloader({
  onComplete,
  oncePerSession = false,
}: TerminalPreloaderProps) {
  const { triggerReady } = usePreloader();

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== 'undefined' && oncePerSession) {
      try {
        if (sessionStorage.getItem('terminal-preloader-completed')) {
          return true;
        }
      } catch {
        // ignore
      }
    }
    return false;
  });

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(15);
  const [isExiting, setIsExiting] = useState(false);

  const isDismissedRef = useRef(isDismissed);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // If already dismissed from sessionStorage
  useEffect(() => {
    if (isDismissed) {
      triggerReady();
    }
  }, [isDismissed, triggerReady]);

  const dismiss = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;
    triggerReady();
    document.body.style.overflow = '';

    if (oncePerSession) {
      try {
        sessionStorage.setItem('terminal-preloader-completed', 'true');
      } catch {
        // ignore
      }
    }

    setIsExiting(true);
    window.setTimeout(() => {
      setIsDismissed(true);
      onCompleteRef.current?.();
    }, 450);
  }, [oncePerSession, triggerReady]);

  useEffect(() => {
    if (isDismissedRef.current) return;

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timeouts: number[] = [];
    const schedule = (fn: () => void, delayMs: number) => {
      const id = window.setTimeout(() => {
        if (!isDismissedRef.current) fn();
      }, delayMs);
      timeouts.push(id);
    };

    // Step 1: Boot command
    schedule(() => {
      setStep(1);
      setProgress(35);
    }, 50);

    // Step 2: Load core modules
    schedule(() => {
      setStep(2);
      setProgress(68);
    }, 340);

    // Step 3: Configure environment
    schedule(() => {
      setStep(3);
      setProgress(90);
    }, 620);

    // Step 4: System Ready
    schedule(() => {
      setStep(4);
      setProgress(100);
    }, 880);

    // Step 5: Start exit transition & trigger Hero reveal
    schedule(() => {
      setIsExiting(true);
      triggerReady();
    }, 1120);

    // Step 6: Final unmount
    schedule(() => {
      dismiss();
    }, 1480);

    // Fail-safe timeout
    schedule(() => {
      dismiss();
    }, 2000);

    // Keyboard shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [dismiss, triggerReady]);

  if (isDismissed) {
    return null;
  }

  return (
    <aside
      className={`terminal-preloader ${isExiting ? 'is-exiting' : ''}`}
      aria-label="System Initializing"
      role="status"
      onClick={dismiss}
      title="Click or press ESC to skip"
    >
      {/* Light center ambient halo */}
      <div className="terminal-preloader__ambient" aria-hidden="true" />

      {/* Terminal Bento Card */}
      <div className="terminal-preloader__window">
        {/* Terminal Header */}
        <div className="terminal-preloader__header">
          <div className="terminal-preloader__controls">
            <span className="terminal-preloader__dot terminal-preloader__dot--close" />
            <span className="terminal-preloader__dot terminal-preloader__dot--min" />
            <span className="terminal-preloader__dot terminal-preloader__dot--max" />
          </div>

          <div className="terminal-preloader__title">
            <Terminal size={12} color="#3b82f6" strokeWidth={2.4} />
            <span>system_boot.sh — zsh</span>
          </div>

          <div className="terminal-preloader__status">
            <span className="terminal-preloader__status-dot" />
            <span>{step >= 4 ? 'READY' : 'BOOTING'}</span>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="terminal-preloader__body">
          {step >= 1 && (
            <div className="terminal-preloader__line">
              <span className="terminal-preloader__prompt">~ ❯</span>
              <span className="terminal-preloader__cmd">./boot.sys --profile="nasywan-jibran"</span>
            </div>
          )}

          {step >= 2 && (
            <div className="terminal-preloader__line">
              <span className="terminal-preloader__badge terminal-preloader__badge--info">SYS</span>
              <span className="terminal-preloader__text">
                Loaded core modules: <strong>[Laravel, React, TypeScript]</strong>
              </span>
            </div>
          )}

          {step >= 3 && (
            <div className="terminal-preloader__line">
              <span className="terminal-preloader__badge terminal-preloader__badge--ok">OK</span>
              <span className="terminal-preloader__text">
                Environment: <strong>Fullstack Web Developer</strong>
              </span>
            </div>
          )}

          {step >= 4 && (
            <div className="terminal-preloader__line">
              <span className="terminal-preloader__badge terminal-preloader__badge--ok">READY</span>
              <span className="terminal-preloader__text">
                Launching portfolio interface...
              </span>
              <span className="terminal-preloader__cursor" />
            </div>
          )}

          {/* Progress bar */}
          <div className="terminal-preloader__progress-line">
            <div className="terminal-preloader__progress-meta">
              <span>INITIALIZING SYSTEM</span>
              <span>{progress}%</span>
            </div>
            <div className="terminal-preloader__progress-track">
              <div
                className="terminal-preloader__progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tap / Click hint */}
      <span className="terminal-preloader__hint">
        [ Tap anywhere or press ESC to skip ]
      </span>
    </aside>
  );
}

