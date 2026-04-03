// Portfolio data structure - all content for windows

const portfolioData = {
  about: {
    title: 'About Me',
    bio: 'I\'m Amine Hammami (RedLeZ), a CS student who likes clean tooling and fast feedback loops. I split time between compilers/DSL experiments (ANTLR), Minecraft mod tooling, and shipping small utilities with polish. I enjoy mentoring newcomers and collaborating on open source.',
    description: 'Always building with custom tools because I love making stuff with my own stuff.'
  },

  projects: [
    {
      id: 'algtpy',
      title: 'AlgTPy',
      hash: 'a9f12c4',
      description: 'Python translator for the Tunisian algorithm language using ANTLR4, built to make classroom algorithms executable and easier to validate.',
      impact: 'Turns pseudo-algorithm exercises into runnable Python output with readable parser errors.',
      tags: ['Python', 'ANTLR4', 'Education'],
      image: 'assets/AlgTPy.svg',
      link: 'https://github.com/RedLeZ/AlgTPy',
      builtWith: 'Custom ANTLR4 parser, no frameworks'
    },

    {
      id: 'dragonlauncher',
      title: 'DragonLauncher',
      hash: 'de31b7a',
      description: 'A Minecraft launcher built from scratch with custom patching to test if i can rebuild something like tlauncher or MultiMC from ground up.',
      impact: 'A fully functional Minecraft launcher that can patch and launch the game, demonstrating deep understanding of Java and Minecraft\'s internals.',
      tags: ['Java', 'Launcher'],
      image: 'assets/dragonlauncher.svg',
      link: 'https://github.com/RedLeZ/DragonLauncher',
      builtWith: 'Pure Java, custom GUI system'
    },
    {
      id: 'armaz',
      title: 'Armaz',
      hash: '4ac2d90',
      description: 'A Minecraft server I co-founded and helped run with friends, focused on community events and custom apocalyptic-themed gameplay.',
      impact: 'Co-created a minecraft server with Dead-Down Team, being manly in the backend and tools, and helped run a fun experience for Us and Our Community.',
      tags: ['Java', 'Community', 'Server Management'],
      image: 'assets/dragonlauncher.svg',
      link: 'https://armaz-mc.com',
      linkLabel: 'armaz-mc.com',
      builtWith: 'Custom server setup, plugins, and community operations'
    },
    {
      id: 'ezlanguage',
      title: 'EZ-Language',
      hash: '7ce0f55',
      description: 'EZ-Language is a tiny experimental language that bridges multi-language projects and reproducible Nix environments.',
      impact: 'Expirementing with compilers, linkers and DSLs, to see if i can build a language that can be used as a glue for multi-language projects, and fix works on my machine issues with nix.',
      tags: ['C++', 'ANTLR4', 'Nix', 'Experimental'],
      image: 'assets/EZ-Language.svg',
      link: 'https://github.com/RedLeZ/EZ-Language',
      builtWith: 'Custom compiler + ANTLR4 parser'
    },
    {
      id: 'redshell',
      title: 'RedShell',
      hash: '32bd9ef',
      description: 'A hackable Python shell with modular extensions and theming for fast experimentation.',
      impact: 'Understanding how shells work under the hood by building one from scratch. It\'s a playground for testing shell features and learning about command parsing and execution.',
      tags: ['Python', 'Shell'],
      image: 'assets/redshell-banner.svg',
      link: 'https://github.com/RedLeZ/RedShell',
      builtWith: 'Custom shell architecture, plugin system'
    },
    {
      id: 'instafox',
      title: 'InstaFox',
      hash: '5f2c8b1',
      description: 'A Firefox extention that lets you use all mobile Instagram features on desktop.',
      impact: 'Very useful for small amount of users, yet a fun project to build and learn about browser extensions and really neeeded by me.',
      tags: ['JavaScript', 'Automation', 'Firefox'],
      image: 'assets/redshell-banner.svg',
      link: 'https://github.com/RedLeZ/InstaFox',
      builtWith: 'JavaScript, Firefox WebExtensions'
    }
  ],

  skills: {
    advanced: ['Java', 'Python', 'ANTLR4'],
    intermediate: ['C++', 'JavaScript', 'Flutter', 'Dart', 'Docker', 'GitHub Actions', 'SQL', 'GDScript', 'Nix'],
    learning: ['Rust', 'Go', 'Kotlin', 'C', 'TypeScript']
  },

  skillDetails: {
    'Java': {
      used: ['DragonLauncher', 'Minecraft modding', 'Backend tools'],
      love: 'My First Language. My Favorite Write onece, run anywhere. The JVM ecosystem is vast an',
      level: 'Advanced'
    },
    'Python': {
      used: ['AlgTPy', 'RedShell'],
      love: 'Rapid prototyping with clean syntax. Perfect for DSLs, compilers, and scripting. The REPL-driven development loop is unbeatable.',
      level: 'Advanced'
    },
    'ANTLR4': {
      used: ['AlgTPy', 'EZ-Language'],
      love: 'Building real grammars and parsers feels like art. ANTLR lets you focus on language design instead of lexer/parser plumbing.',
      level: 'Advanced'
    },
    'C++': {
      used: ['EZ-Language'],
      love: 'Performance and control. Writing systems that scream fast, with (sometimes) predictable memory behavior.',
      level: 'Intermediate'
    },
    'JavaScript': {
      used: ['RedLeZ (this portfolio)'],
      love: 'Everywhere—web, desktop (Electron), backend. Rapid iteration, great tooling, and the ecosystem keeps evolving.',
      level: 'Intermediate'
    },
    'Docker': {
      used: ['Mostly deployments, reproducible environments'],
      love: 'Reproducibility. Ship code once, run anywhere. No more "it works on my machine" nightmares.',
      level: 'Intermediate'
    },
    'GitHub Actions': {
      used: ['CI/CD for open source repos'],
      love: 'Automation without leaving GitHub. Build → test → deploy, no extra vendor lock-in.',
      level: 'Intermediate'
    },
    'SQL': {
      used: ['Backend tooling, data exploration'],
      love: 'Elegant query language that forces you to think clearly about data relationships.',
      level: 'Intermediate'
    },
    'GDScript': {
      used: ['Game scripting exploration'],
      love: 'Designed for Godot. Simple enough to prototype fast, powerful enough to ship games.',
      level: 'Intermediate'
    },
    'Flutter': {
      used: ['Mobile prototyping'],
      love: 'Write once, deploy everywhere with hot reload. Reactive UI framework done right.',
      level: 'Intermediate'
    },
    'Dart': {
      used: ['Flutter projects'],
      love: 'Underrated language. Strong typing with inference, great for large codebases.',
      level: 'Intermediate'
    },
    'Nix': {
      used: ['Reproducible development environments'],
      love: 'Purely functional package management. Solves "works on my machine" with declarative configs.',
      level: 'Intermediate'
    },
    'Rust': {
      used: ['Learning/exploration'],
      love: 'The Better C++ -ThePrimeagen. Your Bad at it intill you get used to it. Memory safety without GC, and a powerful type system.',
      level: 'Learning'
    },
    'Go': {
      used: ['Learning/exploration, potential systems work'],
      love: 'Simplicity and speed. Concurrency primitives are elegant. Perfect for building fast tools.',
      level: 'Learning'
    },
    'Kotlin': {
      used: ['Learning/exploration, JVM interop'],
      love: 'a non-NullPointerException Java, extension functions, and modern syntax while keeping JVM power.',
      level: 'Learning'
    },
    'C': {
      used: ['Learning/exploration'],
      love: 'Fundamental. No magic, just you and the machine. Essential for understanding systems.',
      level: 'Learning'
    },
    'TypeScript': {
      used: ['The Only JavaScript I will Use From Now On'],
      love: 'a Javascript that actually tells you when you\'re doing something wrong, and makes it easier to manage larger codebases with types.',
      level: 'Learning'
    }
  },

  timeline: [
    { 
      year: '2007', 
      title: 'Where Curiosity Started', 
      desc: 'Born into a gamer family - screens and controllers everywhere. My dad\'s passion for games made me wonder how these magic boxes worked.'
    },
    { 
      year: '2011', 
      title: 'My First PC (Age 4)', 
      desc: 'Got my own computer and the internet opened up: games, tools, mysterious software, endless discovery. Minecraft arrived and never left.'
    },
    { 
      year: '2016–2017', 
      title: 'The Hacker Phase', 
      desc: 'Dove into cybersecurity curiosity and "how things work" groups like Anonymous.',
      points: [
        'Game hacking and mod menus',
        'Tools like GameGuardian',
        'Peeking into system internals'
      ],
      note: 'It wasn\'t about harm - I was obsessed with understanding the internals.'
    },
    { 
      year: '2018', 
      title: 'First Steps in Minecraft Modding', 
      desc: 'Shifted from breaking to building: custom launchers, editing files, tweaking game behavior. Most attempts failed - I quit, returned, failed again - but kept pushing.'
    },
    { 
      year: '2020', 
      title: 'Mentors Who Shaped Me', 
      desc: 'Stopped learning alone - friends mentored me for free and changed my path.',
      mentions: [
        { name: 'Niwer', url: 'https://github.com/Niwer1525', role: 'Java mentor, modding inspiration, long-term friend' },
        { name: 'Dead-Down team', url: 'https://armaz-mc.com/', role: 'My friends who made a Minecraft server with me' },
        { name: 'Miniquoi', url: 'https://github.com/Miniquoinquoin', role: 'HTML/CSS foundation' }
      ]
    },
    { 
      year: '2021–Today', 
      title: 'Volunteering, Growth, Confidence', 
      desc: 'Volunteering became a core chapter - helped me grow beyond keyboards.',
      points: [
        'Broke out of shyness and built real confidence',
        'Learned teamwork, leadership, and feeling valued',
        'Experienced burnout and learned to recover'
      ],
      note: 'People needed me for my skills, not just potential - it felt meaningful.'
    },
    { 
      year: '2023', 
      title: 'First Contributions', 
      desc: 'Published my first collaborative Minecraft mod with prorol and began shipping servers, tools, scripts, and small systems. Started feeling like a builder.',
      link: 'https://mcreator.net/comment/224901'
    },
    { 
      year: '2023–2026', 
      title: 'From Modding to Systems', 
      desc: 'Curiosity matured into systems work - interpreters, compilers, custom languages, system tools, backend development. I want to build things that help people the way mentors helped me.'
    }
  ],

  achievements: [
    { title: 'Open Source Impact', desc: 'Shipped ANTLR-based translator and multiple tooling repos.', tags: ['AlgTPy', 'RedShell'] },
    { title: 'Community & Volunteering', desc: 'Facilitated workshops, created educational content, collaborated with international teams.', tags: ['Youthpass', 'Workshops'], openApp: 'more' },
    { title: 'Learning & Exploration', desc: 'Exploring Rust/Go/Kotlin while iterating on DSLs and Minecraft tooling.', tags: ['Rust', 'Go', 'Kotlin'] }
  ],

  more: {
    title: 'More Than A Coder',
    intro: 'A glimpse into my volunteering and interests beyond pure software.',
    gallery: [
      {
        image: './assets/team.webp',
        alt: 'RedLeZ with the Precious food-ture international team in Stuttgart',
        caption: 'Precious food-ture - International team workshop (Stuttgart)'
      },
      {
        image: './assets/dance.webp',
        alt: 'Performance with the local team at the youth center in Menzel Bourguiba',
        caption: 'Performance with the local team at the youth center in Menzel Bourguiba'
      }
    ],
    entries: [
      {
        title: '"Precious food-ture" - Germany',
        meta: ['Germany - Stuttgart', '2025-Present'],
        description: 'Exploring food sharing initiatives and sustainability practices in Stuttgart.',
        bullets: [
          'Workshops and community engagement',
          'Making Flyers For food sharing platforms & places',
          'Working in an international team (Still Love you Guys)'
        ],
        badges: [
          { label: 'Youthpass', url: './assets/youthpass.pdf', download: true },
          { label: 'See More..', url: 'https://www.instagram.com/p/DPO00dbjDqb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
        ]
      },
      {
        title: 'Environment And Health Club & Les Amis des Jeunes Association',
        meta: ['Local Meetups', '2022–2025'],
        description: 'Engaged in local meetups focused on environmental and health topics.',
        bullets: [
          'Data collection and analysis for environmental impact & health (Violence, addiction, Terrain analysis, etc..)',
          'Managing Teams and Leading Small Projects & Research',
          'Participating in / Hosting a lot of event'
        ],
        badges: [
          { label: 'Health and Environment Club Facebook page', url: 'https://www.facebook.com/profile.php?id=100090077213197' },
          { label: 'Les Amis des Jeunes Association Facebook page', url: 'https://www.facebook.com/profile.php?id=61577055327043' }
        ]
      }
    ]
  },

  games: [
    {
      id: 'mr-mine',
      title: 'Mr.Mine',
      embedUrl: 'https://mrmine.com/game/',
      siteUrl: 'https://mrmine.com/',
      developer: 'Playsaurus',
      developerUrl: 'https://playsaurus.com',
      creditSuffix: '- an idle game development studio.',
      allow: "autoplay; payment; fullscreen; microphone; clipboard-read; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-write 'self' https://mrmine.com"
    }
  ],

  contact: {
    email: 'Dead-Down.RedLeZ@proton.me',
    linkedin: 'https://www.linkedin.com/in/redlez/',
    github: 'https://github.com/RedLeZ'
  }
};
