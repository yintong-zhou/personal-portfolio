// Content of the CV preview, from the owner's ATS CV (2026-11-16).
// Public data only: no phone number, no town other than Milan, no GitHub link (owner's choice).
// ponytail: static copy of the CV; it moves to the API with the phase 4 seed.

export interface CvEntry {
  title: string
  org: string
  date: string
  bullets?: string[]
}

export const cvContent = {
  role: 'Software Developer - Fullstack .NET (C#, ASP.NET MVC)',
  linkedinLabel: 'linkedin.com/in/yintong-zhou',
  summary:
    'Fullstack Software Developer with 8+ years of experience building and maintaining enterprise web applications on the Microsoft .NET stack. Day-to-day stack: C#, ASP.NET MVC, ASP.NET Web API, Entity Framework, Oracle PL/SQL and SQL Server, plus HTML, CSS, JavaScript, jQuery and Bootstrap on the frontend. Built REST API integrations with Salesforce, ServiceNow and Google APIs.',
  skills: [
    { label: 'Languages', value: 'C#, SQL, PL/SQL, JavaScript, HTML, CSS' },
    {
      label: 'Backend',
      value:
        '.NET Framework 4.x, ASP.NET MVC, ASP.NET Web API, REST API, ASP.NET WebForms, Entity Framework, LINQ, console applications and background services',
    },
    { label: 'Frontend', value: 'HTML, CSS, JavaScript, jQuery, Bootstrap' },
    { label: 'Integrations', value: 'Salesforce Data360, Salesforce API, ServiceNow API, Google API' },
    { label: 'AI-assisted development', value: 'Claude Code, OpenAI Codex, skills, AI agents' },
    {
      label: 'Databases',
      value: 'Oracle (PL/SQL: stored procedures, functions, packages), Microsoft SQL Server, PostgreSQL',
    },
    { label: 'Tools', value: 'Visual Studio, Git, GitHub, Azure DevOps, IIS' },
    { label: 'Authentication', value: 'Single Sign-On (SSO), ADFS, WS-Federation, Active Directory' },
    { label: 'Systems and infrastructure', value: 'Windows Server (2008-2019), VMware, VoIP (Redbox)' },
    {
      label: 'Networking and security',
      value: 'network protocols, routing and switching, Wireshark, information security',
    },
  ],
  experience: [
    {
      title: 'Software Developer',
      org: 'Sirti S.p.A., Milan, Italy',
      date: '05/2023 - Present',
      bullets: [
        'Support and maintain the company web apps, keeping them running correctly for the business.',
        'Company-wide Single Sign-On with ADFS (WS-Federation), taken from proof of concept to production across 10+ intranet and extranet web apps used daily by thousands of employees and partners. Solved cookie persistence and invalidation in-house, with no need for Microsoft consulting.',
        'RESTful APIs in C# and ASP.NET that send company data to Salesforce Data360 when called by a scheduler: about 1,500-2,000 requests per day.',
        'Digitalized transport documents (DDT) with a mobile-friendly web app that replaced manual printing, signing and scanning: warehouses and couriers view, sign, email and archive documents.',
        "Job-change automation for the HR department, which manages all internal employees: requests opened in ServiceNow reach Oracle through the API, and the web app prepares the process by generating a document with the employee's data and the company training completed for the new role.",
        'Ported 38 company web apps: moved them from x86 to x64 on IIS and, for some applications, migrated from VB.NET to ASP.NET C# or from WebForms to ASP.NET MVC.',
        'Frontend development for an internal application that manages anomalies for customers and partners, used by about 1,100 people, including Service Work Order features for field operations through the Salesforce API (Field Service Management).',
      ],
    },
    {
      title: 'Software Developer / IT Technician',
      org: 'ML Sistemi, Monza, Italy',
      date: '04/2018 - 05/2023',
      bullets: [
        'Backend development in C# .NET with ASP.NET MVC and WebForms, integrated with SQL Server and PostgreSQL databases.',
        'Developed background services and console applications in C#.',
        'Installed, configured and managed Windows Server environments (2008-2019) for Redbox VoIP recording systems.',
        'Managed VMware infrastructure.',
      ],
    },
    {
      title: 'Software Developer Intern',
      org: 'ML Sistemi, Monza, Italy',
      date: '09/2017 - 04/2018',
      bullets: [
        'C# .NET development on enterprise backend applications, network analysis with Wireshark and Redbox VoIP systems.',
      ],
    },
  ] satisfies CvEntry[],
  volunteer: [
    {
      title: 'IT Manager',
      org: 'ICPN (non-profit organization), Milan, Italy',
      date: '03/2019 - Present',
      bullets: [
        'Manage the icpn.it website and the technical tasks of the association, which brings together a community of people connected to China and Italy.',
        'Build all projects with Claude Code and Codex, using advanced skills and AI agents for code development.',
      ],
    },
  ] satisfies CvEntry[],
  education: [
    {
      title: 'Professional specialization course in Cyber Security',
      org: 'Volta Institute, Computer Science Specialization',
      date: '2022',
      bullets: ['Information security, with CompTIA and EC-Council tracks.'],
    },
    { title: 'Cisco CCNA Routing & Switching course', org: 'Volta Institute', date: '2022' },
    { title: 'Diploma in Business Information Systems (SIA)', org: 'IIS Enrico De Nicola', date: '2017' },
  ] satisfies CvEntry[],
  certifications: ['CompTIA Security+ (2022)', 'EC-Council Ethical Hacking Associate (2022)'],
  languages: ['Italian: Native', 'English: B2, professional working proficiency', 'Mandarin Chinese: C1 speaking, B1 writing'],
}
