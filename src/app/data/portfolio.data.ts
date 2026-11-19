// All portfolio content lives here — edit this file to update the site.

export const PROFILE = {
  name: 'Sami Ibrahim',
  firstName: 'Sami',
  lastName: 'Ibrahim',
  title: 'Software Engineer',
  headline:
    'Software Engineer | ASP.NET Core | ASP.NET MVC | Web API | Angular | API Integration | AI Integration | AI Agents | EF Core | SQL Server | PostgreSQL | Machine Learning',
  location: 'Karachi, Pakistan',
  phone: '+92 313 2334173',
  email: 'samiibrahim570@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sami-ibrahim-b90951313/',
  cv: 'Sami-Ibrahim-CV.pdf',
  roles: ['Software Engineer', 'ASP.NET Core Engineer', 'Angular Specialist', 'AI Integration Developer', 'AI Agents Builder', 'ERP Architect'],
  summary:
    'Results-driven Software Engineer with 3+ years of experience designing and developing enterprise-level ERP, healthcare and AI-powered business systems. Expert in ASP.NET Core, ASP.NET MVC & Web API on the backend and Angular on the frontend — with hands-on AI integration, AI agents, API integration, EF Core, SQL Server, PostgreSQL and machine learning fundamentals.',
};

export const STATS = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 8, suffix: '+', label: 'Systems Delivered' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 5, suffix: '', label: 'Business Domains' },
];

export const STRENGTHS = [
  { icon: 'bulb', title: 'Problem Solver', text: 'Strong analytical skills to break down complex problems into clean solutions.' },
  { icon: 'heart', title: 'Domain Depth', text: 'Deep understanding of complex business and healthcare workflows.' },
  { icon: 'layers', title: 'Clean Code', text: 'Scalable, maintainable code following clean architecture principles.' },
  { icon: 'message', title: 'Communication', text: 'Bridges technical and non-technical stakeholders with clarity.' },
];

export interface SkillGroup { icon: string; title: string; skills: { name: string; level: number }[]; }

export const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: 'code', title: 'Frontend',
    skills: [
      { name: 'Angular', level: 95 }, { name: 'TypeScript', level: 92 }, { name: 'RxJS', level: 86 },
      { name: 'HTML5 / CSS3', level: 92 }, { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    icon: 'server', title: 'Backend',
    skills: [
      { name: 'ASP.NET Core Web API', level: 93 }, { name: 'ASP.NET MVC', level: 90 }, { name: 'C#', level: 91 },
      { name: 'Entity Framework Core', level: 88 }, { name: 'RESTful API Design & Integration', level: 93 },
      { name: 'JWT & Role-Based Auth', level: 90 },
    ],
  },
  {
    icon: 'database', title: 'Database',
    skills: [
      { name: 'SQL Server', level: 92 }, { name: 'PostgreSQL', level: 84 }, { name: 'Query Optimization', level: 87 },
      { name: 'Database Design', level: 89 },
    ],
  },
  {
    icon: 'sparkle', title: 'AI & ML',
    skills: [
      { name: 'AI Integration (LLM APIs)', level: 88 }, { name: 'AI Agents & Tool Calling', level: 85 },
      { name: 'Prompt Engineering', level: 87 }, { name: 'AI Data Import / Extraction', level: 84 },
      { name: 'Machine Learning Fundamentals', level: 75 },
    ],
  },
  {
    icon: 'tool', title: 'Domain & Practices',
    skills: [
      { name: 'ERP Development', level: 93 }, { name: 'Healthcare (EMR / DSS / LAB)', level: 88 },
      { name: 'Business Process Analysis', level: 86 }, { name: 'QA, Debugging & Performance', level: 87 },
    ],
  },
];

export const TECH_MARQUEE = [
  'ASP.NET Core', 'ASP.NET MVC', 'Web API', 'C#', 'Angular', 'TypeScript', 'RxJS', 'EF Core', 'SQL Server',
  'PostgreSQL', 'AI Integration', 'AI Agents', 'Machine Learning', 'API Integration', 'JWT', 'Tailwind CSS',
  'Clean Architecture', 'Git',
];

export const EXPERIENCE = [
  {
    role: '.NET Developer',
    company: 'Child Life Foundation',
    period: 'Aug 2026 — Present',
    type: 'On-Site · Karachi',
    current: true,
    points: [
      'Developing and maintaining core healthcare systems including EMR (Electronic Medical Records), DSS (Decision Support System) and LAB (Laboratory Information System) modules.',
      'Building secure, scalable backend services and APIs using ASP.NET Core and C#.',
      'Collaborating with clinical and technical stakeholders to translate healthcare workflows into system requirements.',
      'Working with SQL Server for data modeling, reporting and performance optimization.',
    ],
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'EMR', 'DSS', 'LAB'],
  },
  {
    role: 'Senior Angular Developer / Full Stack Developer',
    company: 'Persistent Solutions',
    period: 'Until Jul 2026',
    type: 'On-Site · Karachi',
    current: false,
    points: [
      'Designed and developed enterprise ERP modules using Angular and ASP.NET Core.',
      'Built scalable RESTful APIs following clean architecture principles.',
      'Implemented secure authentication using JWT and role-based access control.',
      'Developed sales, inventory, SKU-wise and financial reporting systems.',
      'Worked with SQL Server and PostgreSQL for complex reporting and optimization.',
      'Led frontend development, mentored junior developers and partnered with QA & business teams for stable releases.',
    ],
    tags: ['Angular', 'TypeScript', 'RxJS', 'ASP.NET Core', 'PostgreSQL', 'JWT'],
  },
];

export interface Project {
  icon: string; featured: boolean; variant?: 'ai' | 'emr';
  title: string; org: string; text: string; features: string[]; tags: string[];
  link?: string; window?: string; badge?: string;
}

export const PROJECTS: Project[] = [
  {
    icon: 'sparkle', featured: true, variant: 'ai',
    title: 'BizFlow — AI-Powered Business ERP',
    org: 'AI Project · Live',
    badge: 'AI Powered',
    link: 'http://biz-flow.runasp.net/dashboard',
    window: 'biz-flow / dashboard',
    text: 'Multi-company, multi-branch business management system (running live for a fish feed mill) with an AI Business Assistant you can ask about sales, stock and ledgers in plain language, plus AI-driven Excel import that maps messy sheets straight into masters and transactions.',
    features: ['AI Business Assistant', 'AI Import from Excel', 'Sales, Purchase & Returns', 'Production / Pisai', 'Ledger & Stock Ledger', 'Vouchers & Gate Pass', 'Multi-Company & Branches', 'Roles & Permissions'],
    tags: ['ASP.NET Core', 'Angular', 'AI Agents', 'LLM Integration', 'EF Core', 'SQL Server'],
  },
  {
    icon: 'heart', featured: true, variant: 'emr', window: 'clf-emr / dashboard', badge: 'Healthcare',
    title: 'EMR, DSS & LAB Systems',
    org: 'Child Life Foundation',
    text: 'Healthcare platform powering electronic medical records, clinical decision support and laboratory information management for real patient care delivery.',
    features: ['Electronic Medical Records', 'Decision Support', 'Lab Information System', 'Clinical Reporting'],
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'Healthcare'],
  },
  {
    icon: 'factory', featured: false,
    title: 'ERP / Flour Management System',
    org: 'Enterprise ERP',
    text: 'Complete sales, inventory, finance and reporting solution with SKU-wise tracking, supplier management and real-time dashboards.',
    features: ['Sales & Inventory', 'SKU-wise Reporting', 'Financial Statements', 'Role-Based Access'],
    tags: ['Angular', 'ASP.NET Core', 'SQL Server'],
  },
  {
    icon: 'user', featured: false,
    title: 'Doctor Management System',
    org: 'Healthcare',
    text: 'Appointment scheduling, patient records, prescriptions and detailed medical reporting in a single streamlined platform.',
    features: ['Appointments', 'Patient Records', 'Prescriptions', 'Reporting'],
    tags: ['Angular', 'C#', 'PostgreSQL'],
  },
  {
    icon: 'building', featured: false,
    title: 'Construction Management System',
    org: 'Project Operations',
    text: 'End-to-end project tracking with finance, contractor workflows, material procurement and milestone progress.',
    features: ['Project Tracking', 'Contractor Workflows', 'Finance Module', 'Materials'],
    tags: ['Angular', 'EF Core', 'SQL Server'],
  },
  {
    icon: 'wallet', featured: false,
    title: 'Finance & Accounting Systems',
    org: 'Accounting',
    text: 'General ledgers, vouchers, invoices and complete financial statements with secure, audited workflows.',
    features: ['General Ledger', 'Vouchers', 'Invoices', 'Financial Statements'],
    tags: ['Angular', 'ASP.NET Core', 'JWT'],
  },
];

export const EDUCATION = [
  { degree: 'BS Computer Science (BSCS)', school: 'ILMA University, Karachi', period: 'Expected 2027', note: '4th semester completed — studying full-time alongside professional work.' },
  { degree: 'Intermediate', school: 'Ziauddin University', period: '2021 — 2023', note: 'Higher secondary education.' },
  { degree: 'Matriculation', school: 'Ziauddin University', period: '2019 — 2021', note: 'Secondary school certificate.' },
];
