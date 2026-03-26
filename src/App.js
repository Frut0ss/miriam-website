import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const API = 'https://api.conmiriamzamora.es';

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.05) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: '0px 0px -60px 0px' }
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
          <a href="#contacto" onClick={e => { e.preventDefault(); handleNav('#contacto'); }} className="nav__cta">Pide tu sesión</a>
        </li>
      </ul>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ data }) {
  const d = data || {};
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__noise" />
      </div>
      <div className="hero__content">
        <div className="hero__tag animate-in delay-1">{d.tag || 'Psicóloga · Online & Presencial'}</div>
        <h1 className="hero__title animate-in delay-2">
          {(d.title || 'Te ayudo a entender lo que te pasa').split(' ').map((w, i, arr) =>
            i === arr.length - 3 ? <span key={i}><br /><em>{arr.slice(i).join(' ')}</em></span> : i > arr.length - 3 ? null : w + ' '
          )}
        </h1>
        <p className="hero__sub animate-in delay-3">{d.subtitle || 'Para empezar a vivir con más calma y menos ruido mental.'}</p>
        <div className="hero__actions animate-in delay-4">
          <a href="#contacto" onClick={e => { e.preventDefault(); document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' }); }} className="btn btn--primary">
            {d.ctaPrimary || 'Pide tu primera sesión'}
            <span className="btn__arrow">→</span>
          </a>
          <button className="btn btn--ghost" onClick={() => document.getElementById('quien-soy').scrollIntoView({ behavior: 'smooth' })}>
            {d.ctaSecondary || 'Conóceme'}
          </button>
        </div>
      </div>
      <div className="hero__scroll-hint animate-in delay-5"><span /></div>
    </section>
  );
}

// ─── Quien soy ────────────────────────────────────────────────────────────────
function QuienSoy({ data, email }) {
  const [ref, visible] = useReveal();
  const d = data || {};
  return (
    <section className="section quien-soy" id="quien-soy">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="section__label">Sobre mí</div>
        <div className="quien-soy__grid">
          <div className="quien-soy__photo-wrap">
            <div className="quien-soy__photo-frame">
              {d.photo ? (
                <img src={d.photo} alt="Miriam Zamora" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="quien-soy__photo-placeholder">
                  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="60" cy="45" rx="28" ry="32" fill="currentColor" opacity="0.15"/>
                    <path d="M10 140 C10 100 110 100 110 140" fill="currentColor" opacity="0.12"/>
                  </svg>
                  <span>Foto próximamente</span>
                </div>
              )}
            </div>
            <div className="quien-soy__photo-deco" />
          </div>
          <div className="quien-soy__text">
            <h2 className="section__title">
              {(d.title || 'Hola, soy Miriam. Psicóloga.').split('Psicóloga').map((part, i) =>
                i === 0 ? <span key={i}>{part}<em>Psicóloga.</em></span> : null
              )}
            </h2>
            <p>{d.p1 || 'Trabajo con personas que sienten que algo no encaja.'}</p>
            <p>{d.p2 || 'Mi enfoque es cercano, sin tecnicismos.'}</p>
            <p>{d.p3 || 'No necesitas tenerlo todo claro para empezar.'}</p>
            <a href={`mailto:${email || 'info@conmiriamzamora.es'}`} className="btn btn--outline">Escríbeme →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── En qué ayudo ─────────────────────────────────────────────────────────────
const AREA_ICONS = [
  <svg key={0} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2C6 8 6 16 12 22M12 2c6 6 6 14 0 20M12 2v20M2 12h20"/></svg>,
  <svg key={1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 21.6C6 18 2 13.8 2 9a6 6 0 0 1 10-4.47A6 6 0 0 1 22 9c0 4.8-4 9-10 12.6z"/></svg>,
  <svg key={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  <svg key={3} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M22 2L12 12M17 2h5v5"/></svg>,
  <svg key={4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key={5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>,
];

function EnQueAyudo({ data }) {
  const [ref, visible] = useReveal(0.1);
  const areas = data || [];
  return (
    <section className="section en-que-ayudo" id="ayuda">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="section__label">Áreas de trabajo</div>
        <h2 className="section__title centered">¿En qué te puedo<br /><em>ayudar?</em></h2>
        <p className="section__intro centered">Sin etiquetas diagnósticas ni tecnicismos. Solo lo que de verdad sientes.</p>
        <div className="areas__grid">
          {areas.map((a, i) => (
            <div key={i} className="area-card" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(48px)',
              transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.05}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.05}s`
            }}>
              <div className="area-card__icon">{AREA_ICONS[i]}</div>
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
function ComoTrabajo({ data }) {
  const [ref, visible] = useReveal(0.1);
  const steps = data?.steps || [];
  return (
    <section className="section como-trabajo" id="como">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="section__label">El proceso</div>
        <h2 className="section__title centered">Así es como<br /><em>trabajaremos</em></h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} className="step" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(48px)',
              transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.08}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.08}s`
            }}>
              <div className="step__left">
                <div className="step__num">{s.num}</div>
                <div className="step__connector" />
              </div>
              <div className="step__body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="como-trabajo__formats">
          <div className="format-pill">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="7"/><path d="M10 3c-2.5 2.5-2.5 11.5 0 14M10 3c2.5 2.5 2.5 11.5 0 14M3 10h14"/></svg>
            Online
          </div>
          <div className="format-pill">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="14" height="10" rx="2"/><path d="M7 7V5a3 3 0 0 1 6 0v2"/></svg>
            Presencial
          </div>
          <div className="format-pill">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l2.5 2.5"/></svg>
            Horario flexible
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contacto con formulario ──────────────────────────────────────────────────
function Contacto({ data }) {
  const [ref, visible] = useReveal(0.1);
  const d = data || {};
  const email = d.email || 'info@conmiriamzamora.es';

  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error
  const [copied, setCopied]   = useState(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="section contacto" id="contacto">
      <div className={`reveal ${visible ? 'revealed' : ''}`} ref={ref}>
        <div className="contacto__inner">
          <div className="contacto__bg-deco" />
          <div className="section__label light">Contacto</div>
          <h2 className="section__title light">{(d.title || '¿Empezamos a hablar?').split('hablar').map((p,i) => i===0 ? <span key={i}>{p}<em>hablar?</em></span> : null)}</h2>
          <p className="contacto__text">{d.subtitle || 'No necesitas tenerlo todo claro. Un mensaje es suficiente.'}</p>

          {status === 'success' ? (
            <div className="contacto__success">
              <div className="contacto__success-icon">✦</div>
              <h3>Mensaje enviado</h3>
              <p>Te he escrito un email de confirmación. Te respondo en 24–48 horas.</p>
            </div>
          ) : (
            <form className="contacto__form" onSubmit={handleSubmit}>
              <div className="contacto__form-row">
                <div className="contacto__field">
                  <label>Nombre</label>
                  <input
                    type="text" placeholder="Tu nombre"
                    value={form.name} onChange={e => set('name', e.target.value)}
                    required
                  />
                </div>
                <div className="contacto__field">
                  <label>Email</label>
                  <input
                    type="email" placeholder="tu@email.com"
                    value={form.email} onChange={e => set('email', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="contacto__field">
                <label>Mensaje</label>
                <textarea
                  placeholder="Cuéntame brevemente qué te trae por aquí…"
                  rows={4}
                  value={form.message} onChange={e => set('message', e.target.value)}
                  required
                />
              </div>
              {status === 'error' && (
                <p className="contacto__error">Algo ha salido mal. Puedes escribirme directamente a {email}</p>
              )}
              <button type="submit" className="btn btn--primary btn--large" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                {status !== 'sending' && <span className="btn__arrow">→</span>}
              </button>
            </form>
          )}

          <div className="contacto__email-block">
            <span className="contacto__email-label">O escríbeme directamente</span>
            <div className="contacto__email-row">
              <a href={`mailto:${email}`} className="contacto__email">{email}</a>
              <button className="contacto__copy" onClick={copyEmail} title="Copiar email">
                {copied ? '✓' : '⧉'}
              </button>
            </div>
          </div>

          <div className="contacto__socials">
            {d.instagram && (
              <a href={d.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
            )}
            {d.tiktok && (
              <a href={d.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            )}
            {d.linkedin && (
              <a href={d.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M12 10v7m0-5a3 3 0 0 1 6 0v5"/></svg>
              </a>
            )}
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
      <p>© {new Date().getFullYear()} Miriam Zamora · Psicóloga</p>
      <p className="footer__sub">Hecho con cuidado ✦</p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch(`${API}/content.php`)
      .then(r => r.json())
      .then(setContent)
      .catch(() => setContent({})); // fallback a contenido vacío
  }, []);

  // Mientras carga, mostramos el layout con contenido vacío (sin flash)
  const c = content || {};

  return (
    <div className="app">
      <Nav />
      <Hero     data={c.hero} />
      <QuienSoy data={c.about}   email={c.contact?.email} />
      <EnQueAyudo data={c.areas} />
      <ComoTrabajo data={c.process} />
      <Contacto data={c.contact} />
      <Footer />
    </div>
  );
}
