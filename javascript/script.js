// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Active link on scroll
const links = [...document.querySelectorAll('#site-nav a')].filter(a => a.getAttribute('href')?.startsWith('#'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScroll() {
  const y = window.scrollY + 80;
  let activeId = '';
  for (const sec of sections) {
    if (sec.offsetTop <= y) activeId = '#' + sec.id;
  }
  for (const a of links) {
    if (a.getAttribute('href') === activeId) a.classList.add('active');
    else a.classList.remove('active');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  onScroll();

  // Volunteering slider
  const track = document.querySelector('.vol-track');
  const slides = track ? Array.from(track.querySelectorAll('.vol-slide')) : [];
  const prev = document.querySelector('.vol-nav.prev');
  const next = document.querySelector('.vol-nav.next');
  let idx = 0;
  function updateSlide(newIdx) {
    if (!track || !slides.length) return;
    idx = (newIdx + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
  }
  if (prev && next && slides.length) {
    prev.addEventListener('click', () => updateSlide(idx - 1));
    next.addEventListener('click', () => updateSlide(idx + 1));
  }

  // Interactive Skills
  const skillData = {
    "Java": {
      icon: "devicon-java-plain",
      level: "Advanced",
      description: "Java is my primary language for building enterprise applications, Minecraft mods, and backend systems. I've used it extensively for DragonLauncher and various mod projects.",
      experience: ["Built DragonLauncher from scratch", "Developed multiple Minecraft mods and server tools", "Created backend systems and utilities", "Mentored by Niwer in Java and modding"],
      features: ["Object-oriented programming", "Platform independence (Write Once, Run Anywhere)", "Strong memory management with garbage collection", "Rich ecosystem for game development"]
    },
    "Python": {
      icon: "devicon-python-plain",
      level: "Advanced",
      description: "Python is my go-to for scripting, language tooling, and rapid prototyping. I use it heavily with ANTLR4 for building translators and DSLs.",
      experience: ["Built AlgTPy translator for Tunisian algorithm language", "Created RedShell with modular extensions", "Automated workflows and scripts", "Developed language tools with ANTLR4"],
      features: ["Clean, readable syntax", "Extensive standard library", "Excellent for rapid prototyping", "Strong ANTLR4 integration"]
    },
    "ANTLR4": {
      icon: "custom",
      img: "./assets/antlr.svg",
      level: "Advanced",
      description: "ANTLR4 is my specialty for building language tools, translators, and DSLs. I've used it extensively in AlgTPy and EZ-Language projects.",
      experience: ["Built AlgTPy Python translator", "Created EZ-Language DSL for multi-language projects", "Developed custom grammars and parsers", "Implemented language tooling and analysis"],
      features: ["Powerful parser generator", "Supports multiple target languages", "Visitor and listener patterns", "Excellent for custom languages"]
    },
    "C++": {
      icon: "devicon-cplusplus-plain",
      level: "Intermediate",
      description: "C++ for performance-critical components and system-level programming. Used in EZ-Language and game-adjacent projects.",
      experience: ["Developed EZ-Language with ANTLR4", "Built performance-critical utilities", "Implemented algorithms and data structures", "Explored game development"],
      features: ["High performance and control", "Object-oriented and generic programming", "Direct memory manipulation", "Standard Template Library"]
    },
    "JavaScript": {
      icon: "devicon-javascript-plain",
      level: "Intermediate",
      description: "JavaScript for web development and interactive interfaces. Used for building dynamic UIs and web-based tools.",
      experience: ["Built interactive portfolio website", "Created dynamic web interfaces", "Developed browser-based tools", "Implemented real-time features"],
      features: ["Client-side scripting", "Event-driven programming", "First-class functions", "Prototype-based objects",]
    },
    "Flutter": {
      icon: "devicon-flutter-plain",
      level: "Intermediate",
      description: "Flutter for cross-platform mobile development with a single codebase. Used for building production mobile apps.",
      experience: ["Developed cross-platform mobile apps", "Created custom widgets and animations", "Integrated Firebase backend services", "Built responsive UIs"],
      features: ["Single codebase for multiple platforms", "Hot reload for rapid development", "Rich widget library", "Excellent performance"]
    },
    "Dart": {
      icon: "devicon-dart-plain",
      level: "Intermediate",
      description: "Dart as the language behind Flutter development, also used for backend and CLI tools.",
      experience: ["Built mobile apps with Flutter", "Created command-line utilities", "Developed cross-platform applications", "Explored server-side Dart"],
      features: ["AOT compilation to native code", "JIT compilation for development", "Strong type system", "Isolates for concurrency"]
    },
    "Docker": {
      icon: "devicon-docker-plain",
      level: "Intermediate",
      description: "Docker for containerizing applications and managing development environments.",
      experience: ["Containerized web applications", "Set up development environments", "Created custom Docker images", "Managed deployment workflows"],
      features: ["Lightweight containers", "Consistent environments", "Easy scaling and deployment", "Large ecosystem of images"]
    },
    "GitHub Actions": {
      icon: "devicon-github-original",
      level: "Intermediate",
      description: "GitHub Actions for CI/CD automation and workflow management across my projects.",
      experience: ["Set up automated testing pipelines", "Created deployment workflows", "Implemented code quality checks", "Built release automation"],
      features: ["Native GitHub integration", "YAML-based workflows", "Extensive action marketplace", "Matrix builds support"]
    },
    "SQL": {
      icon: "devicon-mysql-plain",
      level: "Intermediate",
      description: "SQL for database design, querying, and management in various applications.",
      experience: ["Designed database schemas", "Wrote complex queries for reporting", "Implemented migrations", "Optimized query performance"],
      features: ["Declarative data manipulation", "ACID compliance", "Powerful join operations", "Cross-database standard"]
    },
    "GDScript": {
      icon: "devicon-godot-plain",
      level: "Intermediate",
      description: "GDScript for game development with Godot Engine, exploring game mechanics and prototypes.",
      experience: ["Developed 2D/3D game prototypes", "Created custom game mechanics", "Built UI systems", "Implemented animations"],
      features: ["Python-like syntax", "Tight Godot integration", "Built-in vector types", "Optional static typing"]
    },
    "Rust": {
      icon: "devicon-rust-plain",
      level: "Locked",
      description: "Rust is on my learning roadmap for system programming and performance-critical tools. Interested in memory safety and WebAssembly.",
      experience: ["Currently learning - exploring fundamentals", "Planning to build system utilities", "Interested in WebAssembly"],
      features: ["Memory safety without GC", "Zero-cost abstractions", "Fearless concurrency", "Growing ecosystem"]
    },
    "Go": {
      icon: "devicon-go-plain",
      level: "Locked",
      description: "Go is next for building web services, APIs, and concurrent applications with clean, simple code.",
      experience: ["Currently learning - studying basics", "Planning to build web services", "Interested in concurrent patterns"],
      features: ["Simple, clean syntax", "Built-in concurrency", "Fast compilation", "Excellent standard library"]
    },
    "Kotlin": {
      icon: "devicon-kotlin-plain",
      level: "Locked",
      description: "Kotlin for Android development and backend services, leveraging Java interoperability.",
      experience: ["Currently learning - exploring features", "Planning Android applications", "Interested in backend with Ktor"],
      features: ["Full Java interoperability", "Null safety(No NullPointerExceptions)", "Concise syntax", "Coroutines for async"]
    },
    "C": {
      icon: "devicon-c-plain",
      level: "Locked",
      description: "C for low-level programming, system utilities, and understanding computer architecture deeply.",
      experience: ["Currently learning - understanding fundamentals", "Planning system-level tools", "Interested in adding it to EZ-Language codebase"],
      features: ["Low-level memory access", "Minimal runtime", "OS and embedded systems", "Foundation for other languages"]
    },
    "TypeScript": {
      icon: "devicon-typescript-plain",
      level: "Locked",
      description: "TypeScript for type-safe web development, adding static typing to JavaScript projects.",
      experience: ["Currently learning - studying type system", "Planning type-safe React apps", "Interested in Node.js backend"],
      features: ["Static typing", "JavaScript compatibility", "Better IDE support", "Gradual adoption"]
    }
  };

  const skillCircles = document.querySelectorAll('.skill-circle');
  const defaultMessage = document.getElementById('default-message');
  const skillDetailsContent = document.getElementById('skill-details-content');
  const detailsIcon = document.getElementById('details-icon');
  const detailsTitle = document.getElementById('details-title');
  const detailsLevel = document.getElementById('details-level');
  const skillDescription = document.getElementById('skill-description');
  const skillExperience = document.getElementById('skill-experience');
  const skillFeatures = document.getElementById('skill-features');

  function updateSkillDetails(skill) {
    const data = skillData[skill];
    if (!data) return;
    
    if (data.icon === "custom" && data.img) {
      detailsIcon.innerHTML = `<img src="${data.img}" alt="${skill}">`;
    } else {
      detailsIcon.innerHTML = `<i class="${data.icon}"></i>`;
    }
    
    detailsTitle.textContent = skill;
    detailsLevel.textContent = data.level;
    detailsLevel.className = 'details-level';
    if (data.level === 'Advanced') detailsLevel.classList.add('level-advanced');
    else if (data.level === 'Intermediate') detailsLevel.classList.add('level-intermediate');
    else detailsLevel.classList.add('level-locked');
    
    skillDescription.textContent = data.description;
    
    skillExperience.innerHTML = '';
    data.experience.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      skillExperience.appendChild(li);
    });
    
    skillFeatures.innerHTML = '';
    data.features.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      skillFeatures.appendChild(li);
    });
    
    defaultMessage.style.display = 'none';
    skillDetailsContent.style.display = 'block';
    
    skillCircles.forEach(circle => {
      circle.classList.remove('active');
      if (circle.getAttribute('data-skill') === skill) {
        circle.classList.add('active');
      }
    });
  }

  skillCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      const skill = circle.getAttribute('data-skill');
      updateSkillDetails(skill);
    });
  });

  updateSkillDetails('Java');
});
