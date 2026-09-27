import { lazy, Suspense, useState, type FormEvent, type ReactNode } from 'react'
import Reveal from './components/Reveal'
import Icon, { type IconName } from './components/Icons'
import ProjectArt from './components/ProjectArt'
import {
  profile,
  companies,
  stats,
  services,
  tech,
  experience,
  education,
  certifications,
  projects,
  process,
  testimonials,
} from './data/profile'

const Portrait = lazy(() => import('./components/Portrait'))
const GlassBlob = lazy(() => import('./components/GlassBlob'))

const nav = [
  ['home', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['services', 'Services'],
  ['work', 'Work'],
  ['process', 'Process'],
  ...(testimonials.length ? [['testimonials', 'Testimonials']] : []),
  ['contact', 'Contact'],
]

function Head({ label, title, action }: { label: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="head">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  // No backend: compose an email in the visitor's mail app.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `${f.get('project') || 'Project enquiry'} — ${f.get('name')}`
    const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}`
    window.location.href = `mailto:${profile.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <form className="form glass" onSubmit={onSubmit}>
      <input name="name" placeholder="Your name" required autoComplete="name" />
      <input name="email" type="email" placeholder="Your email" required autoComplete="email" />
      <select name="project" defaultValue="" className="full">
        <option value="" disabled>
          Your project
        </option>
        <option>Django / DRF backend</option>
        <option>.NET Core Web API</option>
        <option>Full stack web application</option>
        <option>Job opportunity</option>
        <option>Something else</option>
      </select>
      <textarea name="message" placeholder="Your message" rows={5} required className="full" />
      <button className="btn dark full-sm" type="submit">
        {sent ? 'Opening your mail app…' : 'Send message'} <Icon name="send" size={15} />
      </button>
    </form>
  )
}

export default function App() {
  return (
    <>
      <div className="bg" aria-hidden>
        <i className="bg-a" />
        <i className="bg-b" />
        <i className="bg-c" />
      </div>

      <header className="nav glass">
        <a href="#home" className="brand">
          <span className="logo">{profile.monogram}</span>
          <span>
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </a>
        <nav>
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn light small" href="#contact">
          Let's talk <Icon name="arrowUpRight" size={14} />
        </a>
      </header>

      <main className="shell">
        {/* HERO */}
        <section id="home" className="hero glass">
          <Reveal>
            <div className="hero-copy">
              <p className="eyebrow">Hello, I'm</p>
              <h1>{profile.name}</h1>
              <p className="role">{profile.role}</p>
              <p className="lead">{profile.tagline}</p>
              <div className="cta">
                <a className="btn dark" href="#work">
                  View my work <Icon name="arrowUpRight" size={15} />
                </a>
                {profile.resumeUrl ? (
                  <a className="btn light" href={profile.resumeUrl} download>
                    Download CV <Icon name="download" size={15} />
                  </a>
                ) : (
                  <a className="btn light" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn <Icon name="linkedin" size={14} />
                  </a>
                )}
              </div>
              <div className="trusted">
                <p>Experience at</p>
                <div>
                  {companies.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="hero-visual">
              <div className="frame glass" />
              <div className="portrait-clip">
                <Suspense fallback={<div className="portrait" />}>
                  <Portrait />
                </Suspense>
              </div>
              <div className="float-card glass stat-card">
                <strong>3</strong>
                <span>Companies</span>
              </div>
              <div className="float-card glass stack-card">
                <span className="muted">Backend stack</span>
                <strong>Python · Django · DRF</strong>
                <strong>.NET Core · C#</strong>
                <svg viewBox="0 0 120 30" className="spark" aria-hidden>
                  <path d="M2 26 L20 20 L36 22 L54 13 L72 15 L90 7 L118 3" />
                </svg>
              </div>
              <span className="orb glass">
                <Icon name="sparkle" size={20} />
              </span>
            </div>
          </Reveal>
        </section>

        {/* ABOUT */}
        <section id="about" className="about glass">
          <Reveal>
            <div>
              <p className="eyebrow">About me</p>
              <h2>
                {profile.about.title[0]}
                <br />
                {profile.about.title[1]}
              </h2>
              <div className="stats glass">
                {stats.map((s, i) => (
                  <div key={s.label}>
                    <Icon name={(['briefcase', 'layers', 'cpu'] as const)[i]} size={16} />
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="body">{profile.about.body}</p>
              <p className="body muted small-gap">
                <Icon name="pin" size={14} /> Based in {profile.location}
              </p>
              <a className="btn light" href="#experience">
                My experience <Icon name="arrowUpRight" size={14} />
              </a>
            </div>
          </Reveal>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="block glass">
          <Head label="Experience" title="Where I've Worked" />
          <ol className="xp">
            {experience.map((x, i) => (
              <Reveal key={x.company} delay={i * 0.08}>
                <li className={x.current ? 'xp-item current' : 'xp-item'}>
                  <div className="xp-meta">
                    <span className="xp-period">{x.period}</span>
                    {x.location && <span className="muted">{x.location}</span>}
                    {x.current && <span className="pill">Current</span>}
                  </div>
                  <div className="xp-card glass">
                    <div className="xp-head">
                      <div>
                        <h3>{x.title}</h3>
                        <p className="accent">{x.company}</p>
                      </div>
                      {x.highlight && (
                        <span className="xp-highlight">
                          <Icon name="factory" size={14} /> {x.highlight}
                        </span>
                      )}
                    </div>
                    <p className="muted">{x.body}</p>
                    {x.points && (
                      <ul className="xp-points">
                        {x.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    )}
                    {x.tags && (
                      <div className="tags">
                        {x.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="edu">
            {education.map((ed) => (
              <div key={ed.school} className="edu-item glass">
                <Icon name="layers" size={16} />
                <div>
                  <strong>{ed.school}</strong>
                  <span className="muted">
                    {ed.detail} · {ed.period}
                  </span>
                </div>
              </div>
            ))}
            {certifications.map((c) => (
              <div key={c} className="edu-item glass">
                <Icon name="award" size={16} />
                <div>
                  <strong>{c}</strong>
                  <span className="muted">Certification</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="block glass services-block">
          <Suspense fallback={null}>
            <GlassBlob shape="bubble" className="blob blob-services" />
          </Suspense>
          <Head label="What I do" title="Services I Offer" />
          <div className="services">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="service glass">
                  <span className={`tile tint-${s.tint}`}>
                    <Icon name={s.icon} size={20} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <span className="corner">
                    <Icon name="arrowUpRight" size={13} />
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TECH */}
        <section className="block glass">
          <Head label="Tools & skills" title="Technologies I Use" />
          <div className="tech">
            {tech.map((t, i) => (
              <Reveal key={t.name} delay={(i % 8) * 0.04}>
                <div className="tech-item">
                  <span className="tech-tile glass" style={{ color: t.color }}>
                    {t.short}
                  </span>
                  <span>{t.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="block glass">
          <Head
            label="Featured projects"
            title="Selected Work"
            action={
              <a className="btn light small" href={profile.links.github} target="_blank" rel="noreferrer">
                View all projects <Icon name="arrowUpRight" size={13} />
              </a>
            }
          />
          <div className="work">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <a className="project" href={p.url} target="_blank" rel="noreferrer">
                  <div className="project-cover">
                    <ProjectArt kind={p.art} />
                  </div>
                  <div className="project-body glass">
                    <div>
                      <h3>{p.name}</h3>
                      <p className="muted">{p.category}</p>
                    </div>
                    <span className="corner">
                      <Icon name="arrowUpRight" size={13} />
                    </span>
                  </div>
                  <p className="project-desc">{p.description}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="block glass">
          <Head label="My process" title="How I Build Software" />
          <div className="process">
            {process.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="step glass">
                  <div className="step-top">
                    <span className="tile tint-violet small">
                      <Icon name={s.icon as IconName} size={15} />
                    </span>
                    <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS (only when real quotes exist) */}
        {testimonials.length > 0 && (
          <section id="testimonials" className="block glass">
            <Head label="Testimonials" title="What People Say" />
            <div className="quotes">
              {testimonials.map((t) => (
                <figure key={t.name} className="quote glass">
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span className="muted">{t.title}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="contact glass">
          <div className="contact-copy">
            <p className="eyebrow">Let's connect</p>
            <h2>
              Have a project in mind?
              <br />
              Let's build something amazing together.
            </h2>
            <ul>
              <li>
                <span className="tile small">
                  <Icon name="mail" size={15} />
                </span>
                <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
              </li>
              <li>
                <span className="tile small">
                  <Icon name="linkedin" size={14} />
                </span>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn profile
                </a>
              </li>
              <li>
                <span className="tile small">
                  <Icon name="pin" size={15} />
                </span>
                <span>{profile.location}</span>
              </li>
            </ul>
          </div>
          <ContactForm />
          <Suspense fallback={null}>
            <GlassBlob shape="swirl" className="blob blob-contact" />
          </Suspense>
        </section>
      </main>

      <footer className="footer">
        <span className="logo">{profile.monogram}</span>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${profile.links.email}`}>Email</a>
        </div>
      </footer>
    </>
  )
}
