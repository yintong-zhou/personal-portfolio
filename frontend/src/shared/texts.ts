// Every fixed interface text and the site copy. Copy comes verbatim from PROFILE.md.
export const texts = {
  owner: { name: 'Yintong Zhou', role: 'Fullstack .NET Software Developer', location: 'Milan' },
  nav: { projects: 'Projects', about: 'About', skip: 'Skip to content' },
  home: {
    title: 'I build enterprise web apps & services in .NET',
    subtitle:
      'Thousands of people use them every day. I write the C# and ASP.NET backend, the SQL data layer and the JavaScript front end, then connect it all to external services.',
    seeProjects: 'See projects',
    readCv: 'Read my CV',
    scrollHint: 'Drag to turn it · Scroll to dive in',
    stackTitle: 'The stack, and what it connects to',
    stack: {
      frontEnd: { label: 'Frontend', detail: 'HTML, CSS, Bootstrap, JavaScript, jQuery' },
      backend: { label: 'Backend', detail: 'C#, ASP.NET MVC, Web API' },
      data: { label: 'Data', items: ['Oracle', 'SQL Server', 'PostgreSQL'] },
      services: { label: 'External services', items: ['External APIs'] },
      summary:
        'The frontend calls the C# backend, which reads Oracle, SQL Server and PostgreSQL and connects to external APIs.',
    },
    previewTitle: 'Projects',
    previewAll: 'See all projects',
  },
  closing: {
    line: "I'm based in Milan.",
    action: 'Write to me',
  },
  projects: {
    title: 'Projects',
    empty: 'No projects published yet.',
    newTab: '(opens in a new tab)',
  },
  about: {
    title: 'About',
    heading: 'Fullstack .NET software developer',
    paragraphs: [
      "I'm a fullstack developer based in Milan. I've been building and maintaining enterprise web applications for 8+ years on the Microsoft .NET stack.",
      'My background is in systems, networking and cybersecurity: Windows Server, VMware, VoIP and a CompTIA Security+ certification. Day to day I write the backend and connect enterprise apps to external APIs.',
      'I also build with AI tools, mainly Claude Code and Codex, with skills and agents. As a volunteer at ICPN, an association that brings together a community connected to China and Italy: I run its website and its technical work.',
    ],
    facts: {
      basedInLabel: 'Based in',
      basedIn: 'Milan',
    },
    cvLink: 'View my CV',
  },
  cv: {
    experience: 'Experience',
    skills: 'Skills',
    current: 'Current',
    present: 'Present',
    download: 'Download CV (PDF)',
    sheet: {
      title: 'Curriculum vitae',
      close: 'Close',
      copyEmail: (email: string) => `Copy email address ${email}`,
      copied: 'Copied',
      headings: {
        summary: 'Professional summary',
        skills: 'Skills',
        experience: 'Professional experience',
        volunteer: 'Volunteer experience',
        education: 'Education',
        certifications: 'Certifications',
        languages: 'Languages',
      },
    },
    empty: 'Nothing published yet.',
  },
  footer: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    trademarks: 'Product names and logos are trademarks of their owners.',
  },
  notFound: { title: 'Page not found', back: 'Back to home' },
  errors: { load: 'Could not load this content. Try again later.' },
} as const
