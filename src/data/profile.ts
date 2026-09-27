// All site content lives here. Entries marked TODO are placeholders
// until they are filled in from the LinkedIn profile.

export const profile = {
  name: 'Santhoshkumar D',
  role: 'Software Developer', // TODO: headline from LinkedIn
  tagline: 'I build fast, practical software — from desktop tools to web apps.', // TODO
  location: 'India', // TODO
  about: [
    // TODO: replace with LinkedIn "About" section
    'I am a software developer who enjoys turning messy problems into clean, usable tools.',
    'I work across the stack and care about developer experience, performance, and polish.',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/santhoshkumar-d-36b944322/',
    github: 'https://github.com/santhoshkumard15092000',
    email: 'santhoshkumardev22@gmail.com',
  },
}

export type Experience = {
  company: string
  title: string
  period: string
  points: string[]
}

// TODO: replace with LinkedIn "Experience" section
export const experience: Experience[] = [
  {
    company: 'Company Name',
    title: 'Software Developer',
    period: '2023 — Present',
    points: ['Describe your impact here.', 'Key technologies and achievements.'],
  },
]

// TODO: replace with LinkedIn "Education" section
export const education = [
  { school: 'University / College', degree: 'Degree, Field of study', period: '20XX — 20XX' },
]

// TODO: sync with LinkedIn "Skills" section
export const skills = [
  'Python', 'PySide6', 'C#', '.NET', 'TypeScript', 'React', 'Three.js',
  'SQL', 'REST APIs', 'Git', 'Azure DevOps', 'Docker', 'JSON', 'SaaS',
]

export type Project = {
  name: string
  description: string
  tags: string[]
  url?: string
}

export const projects: Project[] = [
  {
    name: 'Jsonify',
    description:
      'A free, offline desktop toolkit for JSON — view, edit, query, diff, validate, convert and mask data, plus a built-in API client. VS Code–style UI with eight themes.',
    tags: ['Python', 'PySide6', 'Desktop'],
    url: 'https://github.com/santhoshkumard15092000/Jsonify',
  },
  {
    name: 'Multi-Tenant SaaS', // TODO: confirm details
    description: 'A multi-tenant SaaS platform with tenant isolation and role-based access.',
    tags: ['.NET', 'SaaS'],
  },
  {
    name: 'MindX', // TODO: confirm details
    description: 'Project description goes here.',
    tags: ['TODO'],
  },
]
