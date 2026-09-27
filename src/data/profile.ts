// All site content lives here. Entries marked TODO are placeholders
// until they are filled in from the LinkedIn profile.

export const profile = {
  name: 'Santhoshkumar D',
  firstName: 'Santhosh',
  monogram: 'SD',
  role: 'Full Stack Developer',
  eyebrow: 'I architect. I code. I ship.',
  // Headline is split so the middle part renders in italic copper.
  headline: { before: 'Software engineered', accent: 'to scale', after: 'and endure.' },
  intro:
    "I'm Santhoshkumar, a software engineer and full stack developer building reliable web, desktop and cloud applications with clean architecture and a deep focus on",
  introStrong: 'results.',
  location: 'India', // TODO: city from LinkedIn
  resumeUrl: '', // TODO: add /resume.pdf to public/ and set this
  about: {
    title: ['Clean architecture.', 'Reliable code.'],
    body: 'I design and build end-to-end software — from database schema and APIs to polished user interfaces — for teams that care about quality, performance and maintainability.', // TODO: LinkedIn About
    points: ['End-to-end ownership', 'Performance focused', 'Clean, testable code', 'Results-driven delivery'],
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/santhoshkumar-d-36b944322/',
    github: 'https://github.com/santhoshkumard15092000',
    email: 'santhoshkumardev22@gmail.com',
  },
}

// TODO: confirm numbers
export const stats = [
  { value: '2', suffix: '+', label: 'Years experience' },
  { value: '15', suffix: '+', label: 'Projects shipped' },
  { value: '20', suffix: '+', label: 'Technologies' },
  { value: '500', suffix: '+', label: 'Commits a year' },
]

export type Service = { title: string; body: string; icon: 'web' | 'api' | 'desktop' | 'cloud' }

export const services: Service[] = [
  { icon: 'web', title: 'Web Applications', body: 'Fast, responsive and accessible web apps with React, TypeScript and modern tooling.' },
  { icon: 'api', title: 'Backend & APIs', body: 'Secure, well-documented REST APIs and services in .NET, Python and Node.js.' },
  { icon: 'desktop', title: 'Desktop Software', body: 'Native-feeling cross-platform desktop tools with Python/PySide6 and C#.' },
  { icon: 'cloud', title: 'Cloud & DevOps', body: 'CI/CD pipelines, containerised deployments and multi-tenant SaaS architecture.' },
]

// TODO: sync with LinkedIn "Skills" section
export const tech = [
  'C#', '.NET', 'Python', 'PySide6', 'TypeScript', 'React', 'Node.js', 'Three.js',
  'SQL Server', 'PostgreSQL', 'Docker', 'Azure DevOps', 'Git', 'REST', 'Tailwind CSS',
]

export const expertise = [
  { area: 'Backend', level: 90, items: 'C# · .NET · Python · REST · SQL' },
  { area: 'Frontend', level: 85, items: 'React · TypeScript · Three.js · CSS' },
  { area: 'Desktop', level: 88, items: 'PySide6 · Qt · WPF' },
  { area: 'DevOps', level: 75, items: 'Azure DevOps · Docker · CI/CD' },
]

export type Project = {
  name: string
  category: string
  description: string
  tags: string[]
  art: 'json' | 'saas' | 'ai'
  url?: string
}

export const projects: Project[] = [
  {
    name: 'Jsonify',
    category: 'Desktop App',
    description: 'Offline JSON toolkit — view, edit, query, diff, validate, convert and mask, plus a built-in API client.',
    tags: ['Python', 'PySide6'],
    art: 'json',
    url: 'https://github.com/santhoshkumard15092000/Jsonify',
  },
  {
    name: 'Multi-Tenant SaaS', // TODO: confirm details
    category: 'Platform',
    description: 'Multi-tenant SaaS platform with tenant isolation, role-based access and usage analytics.',
    tags: ['.NET', 'SQL'],
    art: 'saas',
  },
]

// Only real quotes belong here — the section is hidden while this is empty.
// Example: { quote: '…', name: 'Full Name', title: 'Role, Company' }
export const testimonials: { quote: string; name: string; title: string }[] = []

// TODO: LinkedIn "Experience" and "Education"
export const experience = [
  { company: 'Company Name', title: 'Software Engineer', period: '2023 — Present', body: 'Describe your impact here.' },
]
