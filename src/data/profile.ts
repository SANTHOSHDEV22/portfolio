// All site content lives here (sourced from the LinkedIn profile).

export const profile = {
  name: 'Santhoshkumar D',
  firstName: 'Santhosh',
  monogram: 'SD',
  role: 'Full Stack Developer',
  eyebrow: 'I architect. I code. I ship.',
  // Headline is split so the middle part renders in italic copper.
  headline: { before: 'Software engineered', accent: 'to scale', after: 'and endure.' },
  intro:
    "I'm Santhoshkumar, a full stack engineer building scalable web and AI-powered applications with .NET Core, C#, React and SQL Server — with a deep focus on",
  introStrong: 'results.',
  location: 'Chennai, India',
  resumeUrl: '', // Add /resume.pdf to public/ and set this to show the download button
  about: {
    title: ['Complex ideas.', 'Real-world products.'],
    body: 'I build scalable web and AI-powered applications using modern frontend frameworks and robust backend technologies. My core strengths are full-stack architecture, API development, database design and creating efficient, user-friendly interfaces.',
    points: ['Full-stack architecture', 'API development', 'Database design', 'User-friendly interfaces'],
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/santhoshkumar-d-36b944322/',
    github: 'https://github.com/santhoshkumard15092000',
    email: 'santhoshkumardev22@gmail.com',
  },
}

export const stats = [
  { value: '3', suffix: '', label: 'Companies' },
  { value: '4', suffix: '', label: 'Featured projects' },
  { value: '15', suffix: '+', label: 'Technologies' },
  { value: '1', suffix: '', label: 'Certification' },
]

export type Service = { title: string; body: string; icon: 'web' | 'api' | 'database' | 'factory' }

export const services: Service[] = [
  {
    icon: 'web',
    title: 'Web Applications',
    body: 'Responsive, user-friendly frontends with React, JavaScript, jQuery, Bootstrap and DataTables.',
  },
  {
    icon: 'api',
    title: 'Backend & APIs',
    body: 'Secure, high-performance REST APIs with ASP.NET Core Web API, C#, Node.js and JWT authentication.',
  },
  {
    icon: 'database',
    title: 'Database Design',
    body: 'Relational schemas, queries and CRUD operations, tuned for SQL Server and MySQL.',
  },
  {
    icon: 'factory',
    title: 'MES & Enterprise Support',
    body: 'Hands-on support for Manufacturing Execution Systems — the software that connects the shop floor to enterprise IT.',
  },
]

export const tech = [
  'C#', '.NET Core', 'ASP.NET Web API', '.NET Framework', 'React', 'JavaScript', 'jQuery',
  'HTML5', 'CSS3', 'Bootstrap', 'Node.js', 'Express.js', 'Django', 'SQL Server', 'MySQL',
  'REST APIs', 'JWT', 'AJAX', 'DataTables', 'Git', 'Bitbucket',
]

export const expertise = [
  { area: 'Backend', level: 90, items: 'C# · .NET Core · Web API · Node.js' },
  { area: 'Frontend', level: 85, items: 'React · JavaScript · jQuery · Bootstrap' },
  { area: 'Databases', level: 85, items: 'SQL Server · MySQL · Schema design' },
  { area: 'Architecture', level: 80, items: 'REST · JWT · SaaS · Multi-tenancy' },
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
    tags: ['AI', 'Full Stack', 'REST APIs'],
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

// Only real quotes belong here — the section is hidden while this is empty.
// Example: { quote: '…', name: 'Full Name', title: 'Role, Company' }
export const testimonials: { quote: string; name: string; title: string }[] = []
