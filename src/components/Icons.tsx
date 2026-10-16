interface IconProps {
  size?: number;
  className?: string;
}

export function GithubIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function LaravelIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 7.5L12 2.5L20.5 7.5V16.5L12 21.5L3.5 16.5V7.5Z" stroke="#FF2D20" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(255, 45, 32, 0.12)" />
      <path d="M12 12L20.5 7.5M12 12V21.5M12 12L3.5 7.5" stroke="#FF2D20" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7.5 5.2L16.5 10.2V15.5" stroke="#FF2D20" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PhpIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#777BB4" fillOpacity="0.15" stroke="#777BB4" strokeWidth="1.5" />
      <text x="12" y="15.5" fill="#777BB4" fontSize="9.5" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.5">PHP</text>
    </svg>
  );
}

export function MysqlIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 6C4 4.34315 7.58172 3 12 3C16.4183 3 20 4.34315 20 6M4 6V18C4 19.6569 7.58172 21 12 21C16.4183 21 20 19.6569 20 18V6M4 6C4 7.65685 7.58172 9 12 9C16.4183 9 20 7.65685 20 6" stroke="#00758F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12C4 13.6569 7.58172 15 12 15C16.4183 15 20 13.6569 20 12" stroke="#F29111" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="17" r="2.5" fill="#F29111" />
    </svg>
  );
}

export function VueIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2 3.5H6.5L12 13L17.5 3.5H22L12 21L2 3.5Z" fill="#41B883" />
      <path d="M6.5 3.5H10L12 7L14 3.5H17.5L12 13.2L6.5 3.5Z" fill="#35495E" />
    </svg>
  );
}

export function ReactIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  );
}

export function TailwindIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 8C5.5 8 4.75 8.5 4.25 9.5C5.25 9 6.25 9.25 6.75 10C7.3 10.8 7.8 11.5 9 11.5C10.5 11.5 11.5 10.5 12 9.5C11 10 10 9.75 9.5 9C9 8.2 8.2 8 6.5 8ZM12.5 13C11.5 13 10.75 13.5 10.25 14.5C11.25 14 12.25 14.25 12.75 15C13.3 15.8 13.8 16.5 15 16.5C16.5 16.5 17.5 15.5 18 14.5C17 15 16 14.75 15.5 14C15 13.2 14.2 13 12.5 13Z" fill="#38BDF8" />
    </svg>
  );
}

export function TypescriptIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#3178C6" />
      <path d="M4.5 9.5H11.5M8 9.5V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <path d="M13.5 15.2C14.2 16 15.4 16.3 16.4 15.7C17.2 15.2 17.2 14.1 16.4 13.6C15.4 13 14 12.5 14 11.3C14 10.3 15 9.5 16.2 9.5C17.2 9.5 18 10 18.5 10.8" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function JavascriptIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#F7DF1E" />
      <path d="M8 12V16.2C8 17.4 7.2 17.8 6 17.3" stroke="#000000" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M12.5 15.6C13.3 16.4 14.6 16.6 15.6 16C16.4 15.4 16.3 14.3 15.4 13.7C14.2 13 13 12.5 13 11.3C13 10.2 14 9.5 15.3 9.5C16.3 9.5 17.1 10 17.6 10.8" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DockerIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5.5" y="8" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="9" y="8" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="12.5" y="8" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="9" y="5" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="12.5" y="5" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="2" y="11" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="5.5" y="11" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="9" y="11" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="12.5" y="11" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <path d="M1.5 14C2.5 17.5 6 19.5 11 19.5C18 19.5 21.5 15 22.5 12.5C21 12 19 12.5 18 13.5C17.5 12 16 11.5 15 11.5H1.5V14Z" fill="#2496ED" fillOpacity="0.8" />
    </svg>
  );
}

export function GitIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M21.5 10.5L13.5 2.5C12.8 1.8 11.7 1.8 11 2.5L2.5 11C1.8 11.7 1.8 12.8 2.5 13.5L10.5 21.5C11.2 22.2 12.3 22.2 13 21.5L21.5 13C22.2 12.3 22.2 11.2 21.5 10.5Z" fill="#F05032" fillOpacity="0.15" stroke="#F05032" strokeWidth="1.6" />
      <circle cx="8" cy="12" r="2" fill="#F05032" />
      <circle cx="16" cy="12" r="2" fill="#F05032" />
      <circle cx="12" cy="8" r="2" fill="#F05032" />
      <path d="M8 12L12 8M12 8L16 12" stroke="#F05032" strokeWidth="1.5" />
    </svg>
  );
}

export function PostmanIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#FF6C37" fillOpacity="0.15" stroke="#FF6C37" strokeWidth="1.5" />
      <path d="M6 13L18 7L13 18L11 13L6 13Z" fill="#FF6C37" stroke="#FF6C37" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function FigmaIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="2" width="7" height="6.5" rx="3.2" fill="#F24E1E" />
      <rect x="12" y="2" width="7" height="6.5" rx="3.2" fill="#FF7262" />
      <rect x="5" y="8.5" width="7" height="6.5" rx="3.2" fill="#A259FF" />
      <circle cx="15.5" cy="11.7" r="3.2" fill="#1ABCFE" />
      <path d="M5 15C5 13.3 6.3 12 8 12H12V18.5C12 20.4 10.4 22 8.5 22C6.6 22 5 20.4 5 18.5V15Z" fill="#0ACF83" />
    </svg>
  );
}

export function TerminalIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 8L10 12L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
