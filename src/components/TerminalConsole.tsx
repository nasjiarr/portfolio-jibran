import { useEffect, useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import '../styles/terminal-console.css';

interface TerminalCommand {
  cmdPrefix: string;
  cmdArgs: string;
  fullCommand: string;
  output: string;
}

const commands: TerminalCommand[] = [
  {
    cmdPrefix: 'npx',
    cmdArgs: 'whoami',
    fullCommand: 'npx whoami',
    output: 'Nasywan Jibran Aryadi • Fullstack Developer',
  },
  {
    cmdPrefix: 'cat',
    cmdArgs: 'tech-stack.json',
    fullCommand: 'cat tech-stack.json',
    output: '["Laravel", "Vue.js", "React", "TypeScript", "MySQL"]',
  },
  {
    cmdPrefix: 'git',
    cmdArgs: 'status',
    fullCommand: 'git status',
    output: 'On branch main • Ready to build great products!',
  },
  {
    cmdPrefix: 'ping',
    cmdArgs: 'availability.io',
    fullCommand: 'ping availability.io',
    output: '64 bytes: status=Available for freelance & full-time',
  },
];

export interface TerminalConsoleProps {
  className?: string;
}

export default function TerminalConsole({ className = '' }: TerminalConsoleProps) {
  const [commandIndex, setCommandIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentCmd = commands[commandIndex];

  useEffect(() => {
    let timer: number;

    if (!isDeleting) {
      if (typedText === currentCmd.fullCommand) {
        // Typing finished: brief pause, then show output
        timer = window.setTimeout(() => {
          setShowOutput(true);

          // Hold output for 2.6 seconds, then start deleting
          timer = window.setTimeout(() => {
            setShowOutput(false);
            timer = window.setTimeout(() => {
              setIsDeleting(true);
            }, 180);
          }, 2600);
        }, 220);
      } else {
        // Type next character with slight human-like variation
        const nextChar = currentCmd.fullCommand.slice(0, typedText.length + 1);
        const speed = Math.floor(Math.random() * 25) + 45;
        timer = window.setTimeout(() => {
          setTypedText(nextChar);
        }, speed);
      }
    } else {
      // Deleting command
      if (typedText === '') {
        timer = window.setTimeout(() => {
          setIsDeleting(false);
          setCommandIndex((prev) => (prev + 1) % commands.length);
        }, 320);
      } else {
        timer = window.setTimeout(() => {
          setTypedText((prev) => prev.slice(0, -1));
        }, 25);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, commandIndex, currentCmd]);

  const handleCopy = () => {
    const textToCopy = `${currentCmd.fullCommand}\n${currentCmd.output}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  // Render command text with syntax highlighting
  const renderSyntaxHighlightedCommand = () => {
    const prefix = currentCmd.cmdPrefix;
    if (typedText.length <= prefix.length) {
      return <span className="macos-terminal__token-keyword">{typedText}</span>;
    }

    const keywordPart = typedText.slice(0, prefix.length);
    const argsPart = typedText.slice(prefix.length);

    return (
      <>
        <span className="macos-terminal__token-keyword">{keywordPart}</span>
        <span className="macos-terminal__token-args">{argsPart}</span>
      </>
    );
  };

  return (
    <div className={`macos-terminal ${className}`} aria-live="polite">
      {/* Header bar with macOS traffic dots and status */}
      <div className="macos-terminal__header">
        <div className="macos-terminal__controls">
          <span className="macos-terminal__dot macos-terminal__dot--close" title="Close" />
          <span className="macos-terminal__dot macos-terminal__dot--minimize" title="Minimize" />
          <span className="macos-terminal__dot macos-terminal__dot--expand" title="Expand" />
        </div>

        <div className="macos-terminal__title">
          <Terminal size={12} strokeWidth={2.4} />
          <span>jibran@portfolio: ~ (zsh)</span>
        </div>

        <div className="macos-terminal__status">
          <span className="macos-terminal__status-dot" />
          <span>online</span>
          <button
            type="button"
            className="macos-terminal__copy-btn"
            onClick={handleCopy}
            title={copied ? 'Disalin!' : 'Salin Perintah'}
            aria-label="Copy terminal text"
          >
            {copied ? <Check size={11} color="#10b981" /> : <Copy size={11} />}
          </button>
        </div>
      </div>

      {/* Terminal interactive body */}
      <div className="macos-terminal__body">
        {/* Command line */}
        <div className="macos-terminal__command-line">
          <span className="macos-terminal__prompt-symbol">~ ❯</span>
          <span className="macos-terminal__typed-cmd">{renderSyntaxHighlightedCommand()}</span>
          <span className="macos-terminal__cursor" />
        </div>

        {/* Output response line */}
        {showOutput && (
          <div className="macos-terminal__output-line">
            <span className="macos-terminal__output-arrow">↳</span>
            <span className="macos-terminal__output-text">{currentCmd.output}</span>
          </div>
        )}
      </div>
    </div>
  );
}
