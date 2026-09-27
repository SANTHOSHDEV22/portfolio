import { lazy, Suspense, useId } from 'react'
import Reveal from './components/Reveal'
import Icon from './components/Icons'
import ProjectArt from './components/ProjectArt'
import {
  profile,
  stats,
  services,
  tech,
  expertise,
  projects,
  testimonials,
  experience,
  education,
  certifications,
} from './data/profile'

const Scene = lazy(() => import('./components/Scene'))
const Portrait = lazy(() => import('./components/Portrait'))
const SkillsSphere = lazy(() => import('./components/SkillsSphere'))
const ContactOrb = lazy(() => import('./components/ContactOrb'))

const nav = [
  ['home', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['services', 'Services'],
  ['work', 'Work'],
  ['expertise', 'Expertise'],
  ...(testimonials.length ? [['testimonials', 'Testimonials']] : []),
  ['contact', 'Contact'],
]

const statIcons = ['briefcase', 'layers', 'cpu', 'award'] as const

function Monogram() {
  return <span className="monogram">{profile.monogram}</span>
}

// Circular text badge like a wax seal, rotating slowly.
function Badge({ text }: { text: string }) {
  const id = useId()
  return (
    <svg className="badge" viewBox="0 0 120 120" aria-hidden>
      <defs>
        <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <circle cx="60" cy="60" r="56" />
      <text>
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" className="badge-mono">
        {profile.monogram}
      </text>
    </svg>
  )
}

function SectionHead({ label, title, center }: { label: string; title: React.ReactNode; center?: boolean }) {
  return (
    <Reveal>
      <div className={center ? 'section-head center' : 'section-head'}>
        <p className="label">{label}</p>
        <h2>{title}</h2>
      </div>
    </Reveal>
  )
}

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <header className="nav">
        <a href="#home" className="brand">
          <Monogram />
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
        <a className="btn-outline small" href="#contact">
          Let's talk <Icon name="arrowUpRight" size={14} />
        </a>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-glow" aria-hidden />
          <div className="hero-portrait">
            <Suspense fallback={<div className="portrait" />}>
              <Portrait />
            </Suspense>
            <span className="signature" aria-hidden>
              {profile.firstName}
            </span>
          </div>
          <Badge text="FULL STACK • SOFTWARE ENGINEER • " />

          <div className="hero-copy">
            <Reveal>
              <p className="label">{profile.eyebrow}</p>
              <h1>
                {profile.headline.before} <em>{profile.headline.accent}</em> {profile.headline.after}
              </h1>
              <p className="lead">
                {profile.intro} <strong>{profile.introStrong}</strong>
              </p>
              <div className="cta">
                <a className="btn" href="#work">
                  View my work <Icon name="arrow" size={16} />
                </a>
                {profile.resumeUrl && (
                  <a className="btn-text" href={profile.resumeUrl} download>
                    Download resume <Icon name="download" size={16} />
                  </a>
                )}
                <a className="btn-text" href={profile.links.github} target="_blank" rel="noreferrer">
                  GitHub <Icon name="arrowUpRight" size={16} />
                </a>
              </div>
              <div className="socials">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Icon name="linkedin" size={15} />
                </a>
                <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Icon name="github" size={15} />
                </a>
                <a href={`mailto:${profile.links.email}`} aria-label="Email">
                  <Icon name="mail" size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          <a className="scroll-down" href="#about">
            <span className="mouse" />
            Scroll
            <br />
            down
          </a>
        </section>

        {/* STATS */}
        <section className="stats-wrap">
          <Reveal>
            <div className="stats panel">
              {stats.map((s, i) => (
                <div className="stat" key={s.label}>
                  <span className="stat-icon">
                    <Icon name={statIcons[i % statIcons.length]} size={20} />
                  </span>
                  <div>
                    <p className="stat-value">
                      {s.value}
                      <sup>{s.suffix}</sup>
                    </p>
                    <p className="stat-label">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ABOUT */}
        <section id="about" className="split">
          <div>
            <SectionHead
              label="About me"
              title={
                <>
                  {profile.about.title[0]}
                  <br />
                  {profile.about.title[1]}
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="body">{profile.about.body}</p>
              <ul className="checks">
                {profile.about.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={14} /> {p}
                  </li>
                ))}
              </ul>
              <a className="btn-outline" href="#experience">
                More about me <Icon name="arrow" size={16} />
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="editor panel">
              <div className="editor-bar">
                <i />
                <i />
                <i />
                <span>engineer.ts</span>
              </div>
              <pre>
                <span className="t-c">{'// who I am, in code'}</span>
                {'\n'}
                <span className="t-k">const</span> engineer = {'{'}
                {'\n  '}name: <span className="t-s">'{profile.name}'</span>,
                {'\n  '}role: <span className="t-s">'{profile.role}'</span>,
                {'\n  '}stack: [<span className="t-s">'.NET Core'</span>, <span className="t-s">'React'</span>,{' '}
                <span className="t-s">'SQL Server'</span>],
                {'\n  '}loves: <span className="t-s">'scalable systems'</span>,
                {'\n  '}available: <span className="t-n">true</span>,
                {'\n'}
                {'}'}
                <span className="caret" />
              </pre>
              <div className="location">
                <Icon name="pin" size={16} />
                <span>
                  <small>Based in</small>
                  {profile.location}
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <SectionHead
            label="Experience"
            title={
              <>
                Where I've <em>built.</em>
              </>
            }
          />
          <ol className="xp">
            {experience.map((x, i) => (
              <Reveal key={x.company} delay={i * 0.08}>
                <li className={x.current ? 'xp-item current' : 'xp-item'}>
                  <div className="xp-meta">
                    <span className="xp-period">{x.period}</span>
                    {x.location && (
                      <span className="muted">
                        <Icon name="pin" size={12} /> {x.location}
                      </span>
                    )}
                    {x.current && <span className="xp-now">Current</span>}
                  </div>
                  <div className="xp-card panel">
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
                    <p className="xp-body">{x.body}</p>
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
        </section>

        {/* SERVICES */}
        <section id="services">
          <SectionHead
            center
            label="Services"
            title={
              <>
                What I can help you <em>build.</em>
              </>
            }
          />
          <div className="services">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="service panel">
                  <span className="service-icon">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TECH STRIP */}
        <section className="tech-wrap">
          <Reveal>
            <div className="tech panel">
              <p className="label">Technologies & tools</p>
              <div className="marquee">
                <div className="marquee-track">
                  {[...tech, ...tech].map((t, i) => (
                    <span key={i}>
                      <i /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* WORK */}
        <section id="work">
          <div className="row-head">
            <SectionHead
              label="Featured work"
              title={
                <>
                  Selected <em>projects.</em>
                </>
              }
            />
            <a className="btn-text" href={profile.links.github} target="_blank" rel="noreferrer">
              View all projects <Icon name="arrow" size={16} />
            </a>
          </div>
          <div className="work">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <a
                  className="project panel"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={(ev) => {
                    const r = ev.currentTarget.getBoundingClientRect()
                    const x = (ev.clientX - r.left) / r.width - 0.5
                    const y = (ev.clientY - r.top) / r.height - 0.5
                    ev.currentTarget.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
                  }}
                  onMouseLeave={(ev) => (ev.currentTarget.style.transform = '')}
                >
                  <div className="project-cover">
                    <span className="chip">{p.category}</span>
                    <ProjectArt kind={p.art} />
                  </div>
                  <div className="project-body">
                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                      <div className="tags">
                        {p.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <Icon name="arrow" size={18} className="project-arrow" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="split">
          <div>
            <SectionHead
              label="Expertise"
              title={
                <>
                  Full stack, <em>end to end.</em>
                </>
              }
            />
            <div className="bars">
              {expertise.map((e, i) => (
                <Reveal key={e.area} delay={i * 0.08}>
                  <div className="bar">
                    <div className="bar-head">
                      <span>{e.area}</span>
                      <span className="muted">{e.items}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${e.level}%` }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="timeline">
              <p className="label">Education</p>
              {education.map((ed) => (
                <Reveal key={ed.school}>
                  <div className="job">
                    <div className="bar-head">
                      <strong>{ed.school}</strong>
                      <span className="muted">{ed.period}</span>
                    </div>
                    <p className="muted">{ed.detail}</p>
                  </div>
                </Reveal>
              ))}
              <p className="label">Certifications</p>
              {certifications.map((c) => (
                <Reveal key={c}>
                  <div className="job">
                    <p>
                      <Icon name="award" size={14} className="accent" /> {c}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15}>
            <div className="sphere panel">
              <Suspense fallback={null}>
                <SkillsSphere skills={tech} />
              </Suspense>
              <p className="sphere-hint">Move your mouse to spin</p>
            </div>
          </Reveal>
        </section>

        {/* TESTIMONIALS (only when real quotes exist) */}
        {testimonials.length > 0 && (
          <section id="testimonials">
            <SectionHead label="Kind words" title="What people say." />
            {testimonials.map((t) => (
              <Reveal key={t.name}>
                <figure className="quote panel">
                  <Icon name="quote" size={28} className="accent" />
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <small>{t.title}</small>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="contact-wrap">
          <div className="contact panel">
            <Reveal>
              <div className="contact-copy">
                <p className="label">Let's build something</p>
                <h2 className="display">
                  <em>Extraordinary.</em>
                </h2>
                <p className="body">Have a project in mind or a role to fill? I'd love to hear from you.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="contact-list">
                <li>
                  <Icon name="mail" size={16} />
                  <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
                </li>
                <li>
                  <Icon name="linkedin" size={16} />
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn profile
                  </a>
                </li>
                <li>
                  <Icon name="pin" size={16} />
                  <span>{profile.location}</span>
                </li>
              </ul>
              <a className="btn" href={`mailto:${profile.links.email}`}>
                Send message <Icon name="arrow" size={16} />
              </a>
            </Reveal>
            <Suspense fallback={<div className="contact-orb" />}>
              <ContactOrb />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <Monogram />
          <div>
            <strong>{profile.name}</strong>
            <small>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </small>
          </div>
        </div>
        <div className="footer-col">
          <p className="label">Navigation</p>
          {nav.slice(0, 4).map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="footer-col">
          <p className="label">Follow</p>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${profile.links.email}`}>Email</a>
        </div>
        <Badge text="SOFTWARE • ENGINEER • BUILDER • " />
      </footer>
    </>
  )
}
