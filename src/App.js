import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Sobre mí', href: '#quien-soy' },
    { label: 'En qué ayudo', href: '#ayuda' },
    { label: 'Cómo trabajo', href: '#como' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Miriam<span>.</span>
      </div>
      <button className={`nav__burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <button onClick={() => handleNav(l.href)}>{l.label}</button>
          </li>
        ))}
        <li>
          <a href="mailto:miriam@ejemplo.com" className="nav__cta">Pide tu sesión</a>
        </li>
      </ul>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__noise" />
      </div>
      <div className="hero__content">
        <div className="hero__tag animate-in delay-1">Psicóloga · Online & Presencial</div>
        <h1 className="hero__title animate-in delay-2">
          Te ayudo a entender<br />
          <em>lo que te pasa</em>
        </h1>
        <p className="hero__sub animate-in delay-3">
          Para empezar a vivir con más calma<br />y menos ruido mental.
        </p>
        <div className="hero__actions animate-in delay-4">
          <a href="mailto:miriam@ejemplo.com" className="btn btn--primary">
            Pide tu primera sesión
            <span className="btn__arrow">→</span>
          </a>
          <button
            className="btn btn--ghost"
            onClick={() => document.getElementById('quien-soy').scrollIntoView({ behavior: 'smooth' })}
          >
            Conóceme
          </button>
        </div>
      </div>
      <div className="hero__scroll-hint animate-in delay-5">
        <span />
      </div>
    </section>
  );
}

// ─── Quien soy ────────────────────────────────────────────────────────────────
function QuienSoy() {
  const [ref, visible] = useReveal();
  return (
    <section className="section quien-soy" id="quien-soy">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="section__label">Sobre mí</div>
        <div className="quien-soy__grid">
          <div className="quien-soy__photo-wrap">
            <div className="quien-soy__photo-frame">
              <div className="quien-soy__photo-placeholder">
                <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="60" cy="45" rx="28" ry="32" fill="currentColor" opacity="0.15"/>
                  <path d="M10 140 C10 100 110 100 110 140" fill="currentColor" opacity="0.12"/>
                </svg>
                <span>Tu foto aquí</span>
              </div>
            </div>
            <div className="quien-soy__photo-deco" />
          </div>
          <div className="quien-soy__text">
            <h2 className="section__title">
              Hola, soy Miriam.<br />
              <em>Psicóloga.</em>
            </h2>
            <p>
              Trabajo con personas que sienten que algo no encaja, que están agotadas de pensar demasiado, o que simplemente quieren entenderse mejor.
            </p>
            <p>
              Mi enfoque es cercano, sin tecnicismos. Creo que la terapia puede ser un espacio real, donde de verdad te puedas soltar.
            </p>
            <p>
              No necesitas tenerlo todo claro para empezar. <strong>Empezamos desde donde estás.</strong>
            </p>
            <a href="mailto:miriam@ejemplo.com" className="btn btn--outline">
              Escríbeme →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── En qué ayudo ─────────────────────────────────────────────────────────────
const AREAS = [
  { icon: '🌀', title: 'Ansiedad y sobrepensamiento', desc: 'Cuando la cabeza no para y el cuerpo lo acusa.' },
  { icon: '🌊', title: 'Gestión emocional', desc: 'Aprender a sentir sin que las emociones te desborden.' },
  { icon: '🧭', title: 'Bloqueos y falta de dirección', desc: 'Cuando sabes que quieres cambiar algo pero no sabes por dónde.' },
  { icon: '🪞', title: 'Autoexigencia y presión', desc: 'Soltar el perfeccionismo y tratarte con más amabilidad.' },
  { icon: '🤝', title: 'Relaciones y límites', desc: 'Aprender a relacionarte desde un lugar más sano.' },
  { icon: '🌱', title: 'Momentos de cambio', desc: 'Acompañarte en transiciones importantes de tu vida.' },
];

function EnQueAyudo() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="section en-que-ayudo" id="ayuda">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="section__label">Áreas de trabajo</div>
        <h2 className="section__title centered">
          ¿En qué te puedo<br /><em>ayudar?</em>
        </h2>
        <p className="section__intro centered">
          Sin etiquetas diagnósticas ni tecnicismos. Solo lo que de verdad sientes.
        </p>
        <div className="areas__grid">
          {AREAS.map((a, i) => (
            <div key={i} className="area-card" style={{ '--delay': `${i * 0.08}s` }}>
              <div className="area-card__icon">{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cómo trabajaremos ────────────────────────────────────────────────────────
const STEPS = [
  { num: '01', title: 'Nos contactamos', desc: 'Me escribes por email y hablamos un poco. Sin compromiso, sin formularios raros.' },
  { num: '02', title: 'Primera sesión gratuita', desc: 'Nos conocemos, me cuentas lo que te pasa y vemos si hay feeling para trabajar juntas.' },
  { num: '03', title: 'Empezamos', desc: 'Trabajo contigo de forma continua, adaptado a tu ritmo y a lo que necesitas.' },
];

function ComoTrabajo() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="section como-trabajo" id="como">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="section__label">El proceso</div>
        <h2 className="section__title centered">
          Así es como<br /><em>trabajaremos</em>
        </h2>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={i} className="step" style={{ '--delay': `${i * 0.12}s` }}>
              <div className="step__num">{s.num}</div>
              <div className="step__connector" />
              <div className="step__body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="como-trabajo__formats">
          <div className="format-pill">🌍 Online</div>
          <div className="format-pill">🏢 Presencial</div>
          <div className="format-pill">🕐 Horario flexible</div>
        </div>
      </div>
    </section>
  );
}

// ─── Contacto ─────────────────────────────────────────────────────────────────
function Contacto() {
  const [ref, visible] = useReveal(0.1);
  const [copied, setCopied] = useState(false);
  const email = 'miriam@ejemplo.com';

  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="section contacto" id="contacto">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="contacto__inner">
          <div className="contacto__bg-deco" />
          <div className="section__label light">Contacto</div>
          <h2 className="section__title light">
            ¿Empezamos<br /><em>a hablar?</em>
          </h2>
          <p className="contacto__text">
            No necesitas tenerlo todo claro. Un mensaje es suficiente.
          </p>
          <div className="contacto__email-block">
            <span className="contacto__email-label">Email</span>
            <div className="contacto__email-row">
              <a href={`mailto:${email}`} className="contacto__email">{email}</a>
              <button className="contacto__copy" onClick={copy} title="Copiar email">
                {copied ? '✓' : '⧉'}
              </button>
            </div>
          </div>
          <a href={`mailto:${email}`} className="btn btn--primary btn--large">
            Escríbeme ahora
            <span className="btn__arrow">→</span>
          </a>
          <div className="contacto__socials">
            <a href="#" aria-label="Instagram" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" aria-label="TikTok" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M12 10v7m0-5a3 3 0 0 1 6 0v5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Miriam · Psicóloga</p>
      <p className="footer__sub">Hecho con cuidado ✦</p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <QuienSoy />
      <EnQueAyudo />
      <ComoTrabajo />
      <Contacto />
      <Footer />
    </div>
  );
}
