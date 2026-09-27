import { lazy, Suspense } from 'react'
import Reveal from './components/Reveal'
import { profile, experience, education, skills, projects } from './data/profile'

const Scene = lazy(() => import('./components/Scene'))
const SkillsSphere = lazy(() => import('./components/SkillsSphere'))

const nav = ['about', 'experience', 'skills', 'projects', 'contact']

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="scene" />}>
        <Scene />
      </Suspense>

      <header className="nav">
        <a href="#top" className="logo">
          {profile.name.split(' ')[0]}
          <span>.</span>
        </a>
        <nav>
          {nav.map((id) => (
            <a key={id} href={`#${id}`}>
              {id}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <Reveal>
            <p className="eyebrow">Hi, I'm</p>
            <h1>{profile.name}</h1>
            <h2 className="gradient">{profile.role}</h2>
            <p className="lead">{profile.tagline}</p>
            <div className="cta">
              <a className="btn primary" href="#projects">
                View my work
              </a>
              <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </Reveal>
          <div className="scroll-hint">scroll</div>
        </section>

        <section id="about">
          <Reveal>
            <h3 className="section-title">
              <span>01</span> About
            </h3>
            <div className="card glass">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="muted">📍 {profile.location}</p>
            </div>
          </Reveal>
        </section>

        <section id="experience">
          <Reveal>
            <h3 className="section-title">
              <span>02</span> Experience
            </h3>
          </Reveal>
          <div className="timeline">
            {experience.map((e, i) => (
              <Reveal key={e.company + e.title} delay={i * 0.1}>
                <div className="card glass timeline-item">
                  <div className="row">
                    <h4>{e.title}</h4>
                    <span className="muted">{e.period}</span>
                  </div>
                  <p className="accent">{e.company}</p>
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            {education.map((ed) => (
              <Reveal key={ed.school}>
                <div className="card glass timeline-item">
                  <div className="row">
                    <h4>{ed.degree}</h4>
                    <span className="muted">{ed.period}</span>
                  </div>
                  <p className="accent">{ed.school}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills">
          <Reveal>
            <h3 className="section-title">
              <span>03</span> Skills
            </h3>
            <Suspense fallback={<div className="skills-canvas" />}>
              <SkillsSphere skills={skills} />
            </Suspense>
          </Reveal>
        </section>

        <section id="projects">
          <Reveal>
            <h3 className="section-title">
              <span>04</span> Projects
            </h3>
          </Reveal>
          <div className="grid">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <a
                  className="card glass project"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={(ev) => {
                    const r = ev.currentTarget.getBoundingClientRect()
                    const x = (ev.clientX - r.left) / r.width - 0.5
                    const y = (ev.clientY - r.top) / r.height - 0.5
                    ev.currentTarget.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
                  }}
                  onMouseLeave={(ev) => (ev.currentTarget.style.transform = '')}
                >
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
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

        <section id="contact">
          <Reveal>
            <h3 className="section-title">
              <span>05</span> Contact
            </h3>
            <div className="card glass contact">
              <p className="lead">Open to new opportunities and collaborations.</p>
              <a className="btn primary" href={`mailto:${profile.links.email}`}>
                Say hello
              </a>
              <div className="socials">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer>
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  )
}
