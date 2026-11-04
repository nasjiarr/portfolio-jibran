import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PreloaderProvider } from './context/PreloaderContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import SmoothCursor from './components/SmoothCursor';
import ShutterPreloader from './components/ShutterPreloader';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';

import './styles/dealtech-tokens.css';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <PreloaderProvider>
        <BrowserRouter>
          <ScrollToTop />
          <SmoothCursor innerColor="#ffffff" outerColor="#3b82f6" />
          <ShutterPreloader />
          <div className="dt-app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/skills" element={<Navigate to="/projects" replace />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </PreloaderProvider>
    </ThemeProvider>
  );
}
