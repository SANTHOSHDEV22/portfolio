// All site content lives here (sourced from the LinkedIn profile).

export const profile = {
  name: 'Santhoshkumar D',
  firstName: 'Santhosh',
  monogram: 'SD',
  role: 'Full Stack Developer',
  tagline:
    'I build scalable web and AI-powered applications with Python, Django REST Framework, .NET Core and React — from database to interface.',
  location: 'Chennai, India',
  resumeUrl: '', // Add /resume.pdf to public/ and set this to show the "Download CV" button
  about: {
    title: ['Complex ideas.', 'Real-world products.'],
    body: 'I am a full stack developer with hands-on experience building scalable web and AI-powered applications. My core strengths are full-stack architecture, REST API development with Django REST Framework and ASP.NET Core, database design, and efficient, user-friendly interfaces.',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/santhoshkumar-d-36b944322/',
    github: 'https://github.com/santhoshkumard15092000',
    email: 'santhoshkumardev22@gmail.com',
  },
}

export const companies = ['NJS InfoTech', 'Johnson Electric', 'Quantanics TechServ']

export const stats = [
  { value: '3', label: 'Companies' },
  { value: '4', label: 'Featured projects' },
  { value: '20+', label: 'Technologies' },
]

export type Service = {
  title: string
  body: string
  icon: 'web' | 'api' | 'python' | 'database' | 'factory'
  tint: 'amber' | 'violet' | 'blue' | 'teal'
}

export const services: Service[] = [
  {
    icon: 'python',
    tint: 'amber',
    title: 'Python & Django REST',
    body: 'Secure, well-structured REST backends with Python, Django and Django REST Framework.',
  },
  {
    icon: 'api',
    tint: 'violet',
    title: '.NET Core Web APIs',
    body: 'High-performance APIs and enterprise apps with C#, ASP.NET Core Web API and JWT auth.',
  },
  {
    icon: 'web',
    tint: 'blue',
    title: 'Frontend Development',
    body: 'Responsive, user-friendly interfaces with React, JavaScript, jQuery and Bootstrap.',
  },
  {
    icon: 'database',
    tint: 'teal',
    title: 'Database Design',
    body: 'Relational schemas, queries and CRUD operations, tuned for SQL Server and MySQL.',
  },
]

// Short label shown on the tile, full name underneath, and a brand-ish colour.
export const tech = [
  { short: 'Py', name: 'Python', color: '#3776ab' },
  { short: 'Dj', name: 'Django', color: '#0c4b33' },
  { short: 'DRF', name: 'Django REST', color: '#a30000' },
  { short: 'C#', name: 'C#', color: '#68217a' },
  { short: '.N', name: '.NET Core', color: '#512bd4' },
  { short: 'API', name: 'ASP.NET Web API', color: '#5c2d91' },
  { short: 'Re', name: 'React', color: '#149eca' },
  { short: 'JS', name: 'JavaScript', color: '#c9a800' },
  { short: 'jQ', name: 'jQuery', color: '#0769ad' },
  { short: 'Bs', name: 'Bootstrap', color: '#7952b3' },
  { short: 'No', name: 'Node.js', color: '#3c873a' },
  { short: 'SQL', name: 'SQL Server', color: '#cc2927' },
  { short: 'My', name: 'MySQL', color: '#00758f' },
  { short: 'JWT', name: 'JWT Auth', color: '#d63aff' },
  { short: 'Git', name: 'Git', color: '#f05032' },
  { short: 'Bb', name: 'Bitbucket', color: '#2684ff' },
]

export type Job = {
  company: string
  title: string
  period: string
  location?: string
  current?: boolean
  highlight?: string
  body: string
  points?: string[]
  tags?: string[]
}

export const experience: Job[] = [
  {
    company: 'NJS InfoTech',
    title: 'Full Stack Engineer',
    period: 'Jul 2026 — Present',
    location: 'Chennai',
    current: true,
    body: 'Developing enterprise web applications, RESTful APIs and responsive frontend interfaces.',
    points: [
      'Build and maintain business applications on ASP.NET Framework and ASP.NET Core Web API with C#',
      'Design database logic and CRUD operations on MySQL and SQL Server',
      'Integrate APIs and implement application health checks',
      'Debug and maintain scalable applications, versioned with Git and Bitbucket',
    ],
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'MySQL', 'jQuery', 'DataTables'],
  },
  {
    company: 'Johnson Electric',
    title: 'IT Support Specialist',
    period: 'Sep 2025 — Mar 2026',
    location: 'Chennai',
    highlight: 'MES Support Team',
    body: 'Worked in the MES (Manufacturing Execution System) support team, supporting the systems that run and track shop-floor production and link it with enterprise IT.',
    tags: ['MES', 'Manufacturing IT', 'Application Support'],
  },
  {
    company: 'Quantanics TechServ Pvt Ltd',
    title: 'Web Developer',
    period: 'Jul 2022 — Oct 2022',
    body: 'Built and maintained web pages and features as a web developer.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
]

export const education = [
  { school: 'Rajalakshmi Engineering College', detail: 'Engineering', period: '2023' },
  { school: 'K.L.N. Memorial Polytechnic College', detail: 'Diploma, Computer Engineering', period: '2020 — 2023' },
]

export const certifications = ['SQL Practice: Intermediate Queries']

export type Project = {
  name: string
  category: string
  description: string
  tags: string[]
  art: 'json' | 'saas' | 'ai' | 'learn'
  url?: string
}

export const projects: Project[] = [
  {
    name: 'Multi-Tenant SaaS',
    category: 'Platform',
    description: 'Multi-tenant SaaS platform with secure JWT authentication and tenant-isolated data.',
    tags: ['.NET Core', 'React', 'SQL Server', 'JWT'],
    art: 'saas',
  },
  {
    name: 'AI Chatbot System',
    category: 'AI Application',
    description: 'AI-powered chatbot system that turns natural-language questions into helpful answers.',
    tags: ['Python', 'Django REST', 'AI'],
    art: 'ai',
  },
  {
    name: 'Adaptive Learning Platform',
    category: 'EdTech',
    description: 'Personalised learning platform that adapts content to each user’s performance.',
    tags: ['Full Stack', 'Database Design'],
    art: 'learn',
  },
  {
    name: 'Jsonify',
    category: 'Desktop App',
    description: 'Offline JSON toolkit — view, edit, query, diff, validate, convert and mask, plus a built-in API client.',
    tags: ['Python', 'PySide6'],
    art: 'json',
    url: 'https://github.com/santhoshkumard15092000/Jsonify',
  },
]

export const process = [
  { title: 'Discover', body: 'Understand the users, the data and the business goal.', icon: 'search' },
  { title: 'Design', body: 'Plan the architecture, database schema and API contracts.', icon: 'layers' },
  { title: 'Build', body: 'Develop clean backends with Django/DRF or .NET and polished UIs.', icon: 'api' },
  { title: 'Test', body: 'Verify every endpoint and flow, fix edge cases, add health checks.', icon: 'check' },
  { title: 'Deploy', body: 'Ship, monitor and keep improving with version control.', icon: 'rocket' },
] as const

// Only real quotes belong here — the section is hidden while this is empty.
// Example: { quote: '…', name: 'Full Name', title: 'Role, Company' }
export const testimonials: { quote: string; name: string; title: string }[] = []
