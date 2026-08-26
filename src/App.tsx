import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from './hooks/useTypewriter';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;
const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];
const PILL_BUTTONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];
const CONTACT_EMAIL = 'hello@mainframe.co';

const LABS_ITEMS = [
  { title: 'Neural Type', desc: 'AI-powered generative typography system', tag: 'Experiment' },
  { title: 'Spatial UI', desc: 'Mixed reality interface prototypes', tag: 'Prototype' },
  { title: 'Voice Canvas', desc: 'Real-time voice-to-visual engine', tag: 'Research' },
  { title: 'Motion Grammar', desc: 'Kinetic design language framework', tag: 'Open Source' },
];

const STUDIO_ITEMS = [
  { title: 'Meridian Finance', category: 'Brand Identity', year: '2026' },
  { title: 'Volta Robotics', category: 'Product Design', year: '2025' },
  { title: 'Arcadia Health', category: 'Web Platform', year: '2025' },
  { title: 'Prism Studios', category: 'Creative Direction', year: '2026' },
  { title: 'Nomad Travel', category: 'Mobile App', year: '2024' },
  { title: 'Flux Media', category: 'Campaign Design', year: '2026' },
];

const OPENINGS = [
  { title: 'Senior Designer', team: 'Studio', location: 'Remote / NYC', type: 'Full-time' },
  { title: 'Creative Engineer', team: 'Labs', location: 'Remote', type: 'Full-time' },
  { title: 'Brand Strategist', team: 'Studio', location: 'NYC', type: 'Full-time' },
  { title: 'Design Intern', team: 'Studio', location: 'NYC', type: 'Internship' },
];

const SHOP_ITEMS = [
  { title: 'Mainframe Monograph', price: '$48', desc: '240-page hardcover. Our work, process, and philosophy.' },
  { title: 'Helvetica Now Print', price: '$120', desc: 'Limited run letterpress on French paper. 18×24."' },
  { title: 'Studio Tote', price: '$35', desc: 'Heavy cotton canvas. Screen-printed in Brooklyn.' },
  { title: 'Technical Tee', price: '$45', desc: 'Japanese cotton. Embroidered logo. Made in Portugal.' },
];

const CopyIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration || isSeekingRef.current) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, video.currentTime + timeOffset));

      if (!isSeekingRef.current) {
        seekToTarget();
      }
    };

    const seekToTarget = () => {
      const video = videoRef.current;
      if (!video || isSeekingRef.current) return;

      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      const video = videoRef.current;
      if (video && Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        seekToTarget();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const { displayed, done } = useTypewriter({
    text: 'Glad you stopped in. Good taste tends to find us. Now, what are we building?',
    speed: 38,
    startDelay: 600,
  });

  return (
    <>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 w-full h-full object-cover"
        style={{ objectPosition: '70% center' }}
        aria-hidden="true"
      />

      <nav className="fixed top-0 left-0 right-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-3" aria-label="Mainframe logo">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Mainframe(R)
          </span>
          <span className="text-[25px] sm:text-[30px] text-white select-none" style={{ letterSpacing: '-0.02em' }} aria-hidden="true">
            {'✳︎'}
          </span>
        </div>

        <div className="hidden md:flex items-center text-[23px] text-white">
          {NAV_LINKS.map((link, index) => (
            <span key={link} className="flex items-center">
              <a href={`#${link.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
                {link}
              </a>
              {index < NAV_LINKS.length - 1 && <span className="text-white">, </span>}
            </span>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className="w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'rotate(0) translateY(0)',
            }}
            aria-hidden="true"
          />
          <span
            className="w-6 h-[2px] bg-white transition-all duration-300"
            style={{ opacity: mobileMenuOpen ? 0 : 1 }}
            aria-hidden="true"
          />
          <span
            className="w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'rotate(0) translateY(0)',
            }}
            aria-hidden="true"
          />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-9 bg-black/90 backdrop-blur-md flex flex-col items-start justify-center px-8 gap-8 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get in touch
          </a>
        </div>
      )}

      {/* Hero */}
      <section className="relative z-1 h-screen flex flex-col overflow-hidden px-5 sm:px-8 md:px-10 md:justify-center md:pb-0 justify-end pb-12">
        <div className="max-w-xl relative z-10 w-full">
          <p
            className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: '1.3',
              fontWeight: 400,
              filter: 'blur(4px)',
            }}
            aria-label="Introduction"
          >
            Hey there, meet A.R.I.A,<br />
            Mainframe&apos;s Adaptive Response Interface Agent
          </p>

          <p
            className="mb-5 sm:mb-6 text-white min-h-[54px] flex items-center"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: '1.35',
              fontWeight: 400,
            }}
            aria-live="polite"
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" aria-hidden="true" />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: showPills ? 1 : 0,
              transform: showPills ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
            role="group"
            aria-label="Action buttons"
          >
            {PILL_BUTTONS.map((label, index) => (
              <button
                key={label}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
            >
              <span>
                Reach us: <u className="underline-offset-1">{copied ? 'Copied!' : CONTACT_EMAIL}</u>
              </span>
              <CopyIcon />
            </button>
          </div>
        </div>
      </section>

      {/* Labs */}
      <section id="labs" className="relative z-1 bg-black text-white px-5 sm:px-8 md:px-10 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-16 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] md:text-[48px] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Labs
            </h2>
            <span className="text-[14px] sm:text-[16px] opacity-40">What we&apos;re exploring</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white/10">
            {LABS_ITEMS.map((item) => (
              <a
                key={item.title}
                href="#"
                className="bg-black p-8 sm:p-10 group hover:bg-white/5 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] opacity-40">
                    {item.tag}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowIcon />
                  </span>
                </div>
                <h3 className="text-[22px] sm:text-[26px] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] opacity-50 leading-relaxed">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="relative z-1 bg-black text-white px-5 sm:px-8 md:px-10 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-16 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] md:text-[48px] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Studio
            </h2>
            <span className="text-[14px] sm:text-[16px] opacity-40">Selected work</span>
          </div>
          <div className="space-y-[1px]">
            {STUDIO_ITEMS.map((item) => (
              <a
                key={item.title}
                href="#"
                className="flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 border-b border-white/10 group hover:pl-4 transition-all duration-300"
              >
                <div>
                  <h3 className="text-[24px] sm:text-[30px] md:text-[36px] tracking-tight mb-2 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <span className="text-[13px] sm:text-[14px] opacity-40">
                    {item.category}
                  </span>
                </div>
                <span className="text-[13px] sm:text-[14px] opacity-30 mt-3 sm:mt-0">
                  {item.year}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="relative z-1 bg-black text-white px-5 sm:px-8 md:px-10 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-16 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] md:text-[48px] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Openings
            </h2>
            <span className="text-[14px] sm:text-[16px] opacity-40">Join the team</span>
          </div>
          <div className="space-y-[1px]">
            {OPENINGS.map((item) => (
              <a
                key={item.title}
                href="#"
                className="flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 border-b border-white/10 group hover:pl-4 transition-all duration-300"
              >
                <div>
                  <h3 className="text-[22px] sm:text-[26px] md:text-[30px] tracking-tight mb-2 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[13px] sm:text-[14px] opacity-40">
                    <span>{item.team}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.12em] opacity-50 mt-4 sm:mt-0 border border-white/20 rounded-full px-4 py-1 self-start sm:self-auto">
                  {item.type}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="relative z-1 bg-black text-white px-5 sm:px-8 md:px-10 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-16 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] md:text-[48px] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Shop
            </h2>
            <span className="text-[14px] sm:text-[16px] opacity-40">Objects & print</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10">
            {SHOP_ITEMS.map((item) => (
              <a
                key={item.title}
                href="#"
                className="bg-black p-8 sm:p-10 group hover:bg-white/5 transition-colors duration-300"
              >
                <div className="aspect-[4/5] bg-white/5 mb-6 flex items-center justify-center">
                  <span className="text-[40px] opacity-10" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title.charAt(0)}
                  </span>
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[16px] sm:text-[17px] leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <span className="text-[14px] opacity-50 ml-4 shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-[13px] sm:text-[14px] opacity-40 leading-relaxed">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-1 bg-black text-white px-5 sm:px-8 md:px-10 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-16 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] md:text-[48px] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Contact
            </h2>
            <span className="text-[14px] sm:text-[16px] opacity-40">Let&apos;s talk</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            <div>
              <p className="text-[18px] sm:text-[20px] leading-relaxed mb-10 opacity-70">
                Have a project in mind? A question? Or just want to say hello?
                We&apos;d love to hear from you.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-3 text-[20px] sm:text-[24px] underline underline-offset-4 hover:opacity-60 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {CONTACT_EMAIL}
                <ArrowIcon />
              </a>
              <div className="mt-12 flex gap-6 text-[14px] opacity-40">
                <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
                <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
              </div>
            </div>
            <div>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[13px] uppercase tracking-[0.12em] opacity-40 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-[16px] focus:outline-none focus:border-white/60 transition-colors placeholder:opacity-20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] uppercase tracking-[0.12em] opacity-40 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-[16px] focus:outline-none focus:border-white/60 transition-colors placeholder:opacity-20"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[13px] uppercase tracking-[0.12em] opacity-40 mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-[16px] focus:outline-none focus:border-white/60 transition-colors placeholder:opacity-20 resize-none"
                    placeholder="Tell us about your project"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 text-[15px] border border-white rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors duration-200 mt-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Send message
                  <ArrowIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-1 bg-black text-white px-5 sm:px-8 md:px-10 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[13px] opacity-30">
            &copy; 2026 Mainframe. All rights reserved.
          </span>
          <span className="text-[13px] opacity-30">
            New York &middot; Remote
          </span>
        </div>
      </footer>
    </>
  );
}
