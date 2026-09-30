import { WhatsAppIcon } from './Icons';
import '../styles/whatsapp-button.css';

export default function WhatsAppButton() {
  const phoneNumber = '6289653404050';
  const defaultMessage = encodeURIComponent(
    'Halo Nasywan, saya tertarik untuk berdiskusi mengenai proyek / peluang kerja sama.'
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float-btn"
      aria-label="Chat via WhatsApp"
      title="Hubungi via WhatsApp"
    >
      <WhatsAppIcon size={22} />
      <span className="wa-float-btn__label">Chat WhatsApp</span>
    </a>
  );
}
