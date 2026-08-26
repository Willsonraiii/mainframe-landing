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
    </>
  );
}