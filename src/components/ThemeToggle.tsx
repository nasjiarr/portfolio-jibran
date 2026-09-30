import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`dt-theme-toggle ${className}`}
      aria-label={theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
      title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={2.2} className="dt-theme-icon dt-theme-icon--sun" />
      ) : (
        <Moon size={18} strokeWidth={2.2} className="dt-theme-icon dt-theme-icon--moon" />
      )}
    </button>
  );
}
