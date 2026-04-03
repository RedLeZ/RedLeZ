// Main initialization script for Desktop Portfolio OS

(function () {
  const state = {
    selectedIconId: null,
    startMenuOpen: false,
    trayMenuOpen: false,
    taskbarButtons: new Map()
  };
  const pressedKeys = new Set();

  const apps = [
    {
      id: 'about',
      title: 'About Me',
      desktopLabel: 'About',
      icon: './assets/about.png',
      allowMultiple: false,
      render: () => {
        return `
          <section class="window-section">
            <h2>${portfolioData.about.title}</h2>
            <p>${portfolioData.about.bio}</p>
            <p class="window-quote">"${portfolioData.about.description}"</p>
          </section>
        `;
      }
    },
    {
      id: 'skills',
      title: 'Skills',
      desktopLabel: 'Skills',
      icon: './assets/skills.png',
      allowMultiple: false,
      render: () => {
        return `
          <section class="window-section">
            <h2>Skills Matrix</h2>
            <p class="skills-hint">Click on any skill to learn more</p>
            <div class="window-skill-block">
              <h3>Advanced</h3>
              <div class="window-tag-row">${portfolioData.skills.advanced.map((skill) => `<button class="skill-tag tag" data-skill="${skill}">${skill}</button>`).join('')}</div>
            </div>
            <div class="window-skill-block">
              <h3>Intermediate</h3>
              <div class="window-tag-row">${portfolioData.skills.intermediate.map((skill) => `<button class="skill-tag tag" data-skill="${skill}">${skill}</button>`).join('')}</div>
            </div>
            <div class="window-skill-block">
              <h3>Learning</h3>
              <div class="window-tag-row">${portfolioData.skills.learning.map((skill) => `<button class="skill-tag tag" data-skill="${skill}">${skill}</button>`).join('')}</div>
            </div>
            <div id="skill-details" class="skill-details"></div>
          </section>
        `;
      }
    },
    {
      id: 'contact',
      title: 'Contact',
      desktopLabel: 'Contact',
      icon: './assets/contact.png',
      allowMultiple: false,
      render: () => {
        return `
          <section class="window-section">
            <h2>Contact</h2>
            <p class="window-intro">Reach out for collaboration, tooling ideas, or open source projects.</p>
            <div class="window-links">
              <a href="mailto:${portfolioData.contact.email}">Email: ${portfolioData.contact.email}</a>
              <a href="${portfolioData.contact.github}" target="_blank" rel="noopener">GitHub</a>
              <a href="${portfolioData.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </section>
        `;
      }
    },
    {
      id: 'projects',
      title: 'Projects',
      desktopLabel: 'Projects',
      icon: './assets/projects.png',
      allowMultiple: false,
      render: () => {
        const projectsHTML = portfolioData.projects.map((project) => `
          <div class="project-card">
            <h3>${project.title}</h3>
            <p class="project-impact">${project.impact}</p>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" rel="noopener" class="project-link">${project.linkLabel || 'View on GitHub ->'}</a>
          </div>
        `).join('');
        return `
          <section class="window-section">
            <h2>Featured Projects</h2>
            <div class="projects-grid">
              ${projectsHTML}
            </div>
          </section>
        `;
      }
    },
    {
      id: 'timeline',
      title: 'My Journey',
      desktopLabel: 'Timeline',
      icon: './assets/Timeline.png',
      allowMultiple: false,
      render: () => {
        const timelineHTML = portfolioData.timeline.map((event) => {
          let pointsHTML = '';
          if (event.points && event.points.length > 0) {
            pointsHTML = `<ul class="timeline-points">${event.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
          }

          let mentionsHTML = '';
          if (event.mentions && event.mentions.length > 0) {
            mentionsHTML = `<ul class="timeline-mentions">${event.mentions.map(m => `<li><a href="${m.url}" target="_blank" rel="noopener">${m.name}</a> - ${m.role}</li>`).join('')}</ul>`;
          }

          let noteHTML = '';
          if (event.note) {
            noteHTML = `<p class="timeline-note"><em>${event.note}</em></p>`;
          }

          let linkHTML = '';
          if (event.link) {
            linkHTML = `<p><a href="${event.link}" target="_blank" rel="noopener">See the ${event.year} contribution</a></p>`;
          }

          return `
            <div class="timeline-event">
              <div class="timeline-year">${event.year}</div>
              <div class="timeline-body">
                <h3>${event.title}</h3>
                <p>${event.desc}</p>
                ${pointsHTML}
                ${mentionsHTML}
                ${noteHTML}
                ${linkHTML}
              </div>
            </div>
          `;
        }).join('');
        return `
          <section class="window-section">
            <h2>My Journey</h2>
            <p class="section-intro">Story-style timeline of how curiosity, modding, and volunteering shaped me.</p>
            <div class="timeline-table">
              ${timelineHTML}
            </div>
          </section>
        `;
      }
    },
    {
      id: 'achievements',
      title: 'Achievements',
      desktopLabel: 'Achievements',
      icon: './assets/Achievements.png',
      allowMultiple: false,
      render: () => {
        const achievementsHTML = portfolioData.achievements.map((achievement) => `
          <div class="achievement-card${achievement.openApp ? ' achievement-card-actionable' : ''}"${achievement.openApp ? ` data-open-app="${achievement.openApp}"` : ''}${achievement.openApp ? ' role="button" tabindex="0"' : ''}>
            <h3>${achievement.title}</h3>
            <p>${achievement.desc}</p>
            <div class="achievement-tags">
              ${achievement.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            ${achievement.openApp ? `<p class="achievement-cta">Open ${achievement.title} details</p>` : ''}
          </div>
        `).join('');
        return `
          <section class="window-section">
            <h2>Achievements & Highlights</h2>
            <div class="achievements-grid">
              ${achievementsHTML}
            </div>
          </section>
        `;
      }
    },
    {
      id: 'more',
      title: 'More Than A Coder',
      desktopLabel: 'More',
      icon: './assets/about.png',
      showInLauncher: false,
      allowMultiple: false,
      render: () => {
        const moreData = portfolioData.more || {};
        const gallery = Array.isArray(moreData.gallery) ? moreData.gallery : [];
        const entries = Array.isArray(moreData.entries) ? moreData.entries : [];

        const slidesHTML = gallery.map((slide, index) => `
          <figure class="vol-slide${index === 0 ? ' active' : ''}">
            <img src="${slide.image}" alt="${slide.alt}" loading="lazy" />
            <figcaption>${slide.caption}</figcaption>
          </figure>
        `).join('');

        const cardsHTML = entries.map((entry) => `
          <article class="card">
            <h3>${entry.title}</h3>
            <ul class="meta">
              ${entry.meta.map((item) => `<li>${item}</li>`).join('')}
            </ul>
            <p>${entry.description}</p>
            <ul class="bullets">
              ${entry.bullets.map((point) => `<li>${point}</li>`).join('')}
            </ul>
            <div class="badges">
              ${entry.badges.map((badge) => `<a class="badge cred" href="${badge.url}" target="_blank" rel="noopener"${badge.download ? ' download' : ''}>${badge.label}</a>`).join('')}
            </div>
          </article>
        `).join('');

        return `
          <section class="window-section more-coder-window">
            <h2>${moreData.title || 'More Than A Coder'}</h2>
            <p class="section-intro">${moreData.intro || ''}</p>

            <div class="vol-box">
              <h3 class="subhead">Volunteering</h3>

              <div class="vol-gallery" aria-label="Volunteering photo gallery">
                <button class="vol-nav prev" data-vol-prev type="button" aria-label="Previous photo">◀</button>
                <div class="vol-viewport">
                  <div class="vol-track" data-vol-track>
                    ${slidesHTML}
                  </div>
                </div>
                <button class="vol-nav next" data-vol-next type="button" aria-label="Next photo">▶</button>
              </div>

              <div class="grid xp">
                ${cardsHTML}
              </div>
            </div>
          </section>
        `;
      }
    },
    {
      id: 'games',
      title: 'Game Menu',
      desktopLabel: 'Games',
      icon: './assets/play.png',
      allowMultiple: false,
      render: () => {
        const games = Array.isArray(portfolioData.games) ? portfolioData.games : [];
        const gameItems = games.map((game, index) => `
          <button type="button" class="game-list-item${index === 0 ? ' active' : ''}" data-game-id="${game.id}">
            ${game.title}
          </button>
        `).join('');

        const selectedGame = games[0] || null;
        if (!selectedGame) {
          return `
            <section class="window-section game-hub">
              <h2>Game Menu</h2>
              <p>No games configured yet. Add entries in data.js under portfolioData.games.</p>
            </section>
          `;
        }

        const gameAllow = selectedGame.allow || "autoplay; payment; fullscreen; microphone; clipboard-read; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-write";
        return `
          <section class="window-section game-hub">
            <h2>Game Menu</h2>
            <p>Pick a game from the list to play directly in Portfolio OS.</p>
            <div class="game-layout">
              <aside class="game-list" id="game-list">
                ${gameItems}
              </aside>
              <div class="game-frame-wrap">
                <iframe
                  id="game-frame"
                  src="${selectedGame.embedUrl}"
                  title="${selectedGame.title}"
                  scrolling="no"
                  allow="${gameAllow}"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  msallowfullscreen="true"
                  allowfullscreen
                  loading="eager"
                ></iframe>
              </div>
            </div>
            <p class="game-credit" id="game-credit">
              <a href="${selectedGame.siteUrl}" target="_blank" rel="noopener" id="game-site-link">${selectedGame.title}</a>
              is developed by
              <a href="${selectedGame.developerUrl}" target="_blank" rel="noopener" id="game-dev-link">${selectedGame.developer}</a>
              <span id="game-credit-suffix">${selectedGame.creditSuffix ? ` ${selectedGame.creditSuffix}` : ''}</span>
            </p>
          </section>
        `;
      }
    }
  ];

  function isMobileMode() {
    return window.matchMedia('(max-width: 780px)').matches;
  }

  function getAppById(appId) {
    return apps.find((app) => app.id === appId);
  }

  function launchApp(appId) {
    const app = getAppById(appId);
    if (!app) return;

    if (isMobileMode()) {
      openMobilePanel(app);
      return;
    }

    windowManager.createWindow(app.id, app.title, app.render(), {
      allowMultiple: app.allowMultiple
    });
  }

  function openGamesFromShortcut() {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.matches('input, textarea, select') || activeEl.isContentEditable)) {
      return;
    }
    launchApp('games');
  }

  function renderDesktopIcons() {
    const container = document.getElementById('desktop-icons');
    const template = document.getElementById('desktop-icon-template');
    if (!container || !template) return;

    container.innerHTML = '';
    apps.filter((app) => app.showInLauncher !== false).forEach((app) => {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.appId = app.id;
      node.setAttribute('aria-label', `Open ${app.title}`);
      node.querySelector('.desktop-icon-glyph').innerHTML = `<img src="${app.icon}" alt="" class="app-icon app-icon-desktop" loading="lazy" decoding="async" />`;
      node.querySelector('.desktop-icon-label').textContent = app.desktopLabel;

      node.addEventListener('click', () => {
        selectIcon(app.id);
      });

      node.addEventListener('dblclick', () => {
        launchApp(app.id);
      });

      node.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          launchApp(app.id);
        }
      });

      container.appendChild(node);
    });
  }

  function selectIcon(appId) {
    state.selectedIconId = appId;
    document.querySelectorAll('.desktop-icon').forEach((icon) => {
      icon.classList.toggle('selected', icon.dataset.appId === appId);
    });
  }

  function renderStartMenu() {
    const container = document.getElementById('start-menu-apps');
    if (!container) return;
    container.innerHTML = '';

    apps.filter((app) => app.showInLauncher !== false).forEach((app) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'start-menu-item';
      button.dataset.appId = app.id;
      button.innerHTML = `<img src="${app.icon}" alt="" class="app-icon app-icon-start" loading="lazy" decoding="async" /><span>${app.title}</span>`;
      button.addEventListener('click', () => {
        launchApp(app.id);
        setStartMenu(false);
      });
      container.appendChild(button);
    });
  }

  function setStartMenu(open) {
    const menu = document.getElementById('start-menu');
    const button = document.getElementById('start-button');
    if (!menu || !button) return;

    state.startMenuOpen = open;
    menu.hidden = !open;
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.classList.toggle('active', open);
  }

  function setTrayMenu(open) {
    const menu = document.getElementById('tray-menu');
    const button = document.getElementById('tray-menu-button');
    if (!menu || !button) return;

    state.trayMenuOpen = open;
    menu.hidden = !open;
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.classList.toggle('active', open);
  }

  function renderTaskbarButton(info) {
    const container = document.getElementById('taskbar-windows');
    const template = document.getElementById('taskbar-button-template');
    if (!container || !template || state.taskbarButtons.has(info.id)) return;

    const button = template.content.firstElementChild.cloneNode(true);
    const app = getAppById(info.baseId);
    button.dataset.windowId = info.id;
    button.setAttribute('aria-label', info.title);
    button.title = info.title;

    if (app && app.icon) {
      button.innerHTML = `<img src="${app.icon}" alt="" class="app-icon app-icon-taskbar" loading="lazy" decoding="async" />`;
    } else {
      button.textContent = info.title;
    }

    button.addEventListener('click', () => {
      const isActive = button.classList.contains('active');
      const isMinimized = button.classList.contains('minimized');

      if (isMinimized) {
        windowManager.restoreWindow(info.id);
        return;
      }

      if (isActive) {
        windowManager.minimizeWindow(info.id);
        return;
      }

      windowManager.restoreWindow(info.id);
    });

    state.taskbarButtons.set(info.id, button);
    container.appendChild(button);
  }

  function removeTaskbarButton(windowId) {
    const button = state.taskbarButtons.get(windowId);
    if (!button) return;
    button.remove();
    state.taskbarButtons.delete(windowId);
  }

  function setTaskbarActive(windowId) {
    state.taskbarButtons.forEach((button, id) => {
      button.classList.toggle('active', id === windowId);
    });
  }

  function setTaskbarMinimized(windowId, minimized) {
    const button = state.taskbarButtons.get(windowId);
    if (!button) return;
    button.classList.toggle('minimized', minimized);
    if (minimized) {
      button.classList.remove('active');
    }
  }

  function openMobilePanel(app) {
    const panel = document.getElementById('mobile-panel');
    const title = document.getElementById('mobile-panel-title');
    const context = document.getElementById('mobile-panel-context');
    const body = document.getElementById('mobile-panel-body');
    if (!panel || !title || !body) return;

    title.textContent = app.title;
    if (context) {
      context.textContent = `Home / ${app.title}`;
    }
    body.innerHTML = app.render();
    panel.hidden = false;

    if (app.id === 'games') {
      setupGameMenuInteraction();
    }

    if (app.id === 'achievements') {
      setupAchievementInteraction();
    }

    if (app.id === 'more') {
      setupMoreCoderInteraction();
    }
  }

  function closeMobilePanel() {
    const panel = document.getElementById('mobile-panel');
    const title = document.getElementById('mobile-panel-title');
    const context = document.getElementById('mobile-panel-context');
    const body = document.getElementById('mobile-panel-body');
    if (!panel) return;

    panel.hidden = true;
    if (title) {
      title.textContent = '';
    }
    if (context) {
      context.textContent = 'Home';
    }
    if (body) {
      body.innerHTML = '';
    }
  }

  function renderMobileLauncher() {
    const container = document.getElementById('mobile-launcher');
    if (!container) {
      console.warn('mobile-launcher container not found');
      return;
    }
    
    container.innerHTML = '';

    if (!apps || apps.length === 0) {
      console.warn('apps array not available or empty');
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.6; color: var(--on-surface);">No apps configured</p>';
      return;
    }

    const visibleApps = apps.filter((app) => app.showInLauncher !== false);
    
    if (visibleApps.length === 0) {
      console.warn('no visible apps to display');
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.6; color: var(--on-surface);">No apps available</p>';
      return;
    }

    visibleApps.forEach((app) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'mobile-launcher-item';
      button.setAttribute('aria-label', `Open ${app.title}`);
      
      const iconImg = document.createElement('img');
      iconImg.src = app.icon;
      iconImg.alt = '';
      iconImg.className = 'app-icon app-icon-mobile';
      iconImg.loading = 'lazy';
      iconImg.decoding = 'async';
      
      const label = document.createElement('span');
      label.textContent = app.title;
      
      button.appendChild(iconImg);
      button.appendChild(label);
      button.addEventListener('click', () => launchApp(app.id));
      
      container.appendChild(button);
    });
  }

  function setupSkillInteraction() {
    setTimeout(() => {
      const skillTags = document.querySelectorAll('.skill-tag');
      const detailsContainer = document.getElementById('skill-details');
      if (!skillTags || !detailsContainer) return;

      skillTags.forEach((tag) => {
        tag.addEventListener('click', (event) => {
          event.preventDefault();
          const skillName = tag.dataset.skill;
          const skillInfo = portfolioData.skillDetails[skillName];

          if (!skillInfo) return;

          // Toggle selection
          const isSelected = tag.classList.contains('selected');
          skillTags.forEach((t) => t.classList.remove('selected'));

          if (!isSelected) {
            tag.classList.add('selected');
            detailsContainer.innerHTML = `
              <div class="skill-info">
                <div class="skill-header">
                  <h3>${skillName}</h3>
                  <span class="skill-level">${skillInfo.level}</span>
                </div>
                <div class="skill-content">
                  <div class="skill-used">
                    <h4>Used In</h4>
                    <ul>
                      ${skillInfo.used.map((project) => `<li>${project}</li>`).join('')}
                    </ul>
                  </div>
                  <div class="skill-love">
                    <h4>Why I Love It</h4>
                    <p>${skillInfo.love}</p>
                  </div>
                </div>
              </div>
            `;
            detailsContainer.style.display = 'block';
          } else {
            detailsContainer.innerHTML = '';
            detailsContainer.style.display = 'none';
          }
        });
      });
    }, 0);
  }

  function setupAchievementInteraction() {
    const actionableCards = document.querySelectorAll('.achievement-card[data-open-app]');
    actionableCards.forEach((card) => {
      if (card.dataset.achievementBound === 'true') return;

      const openTargetApp = () => {
        const appId = card.dataset.openApp;
        if (!appId) return;
        launchApp(appId);
      };

      card.addEventListener('click', openTargetApp);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openTargetApp();
        }
      });

      card.dataset.achievementBound = 'true';
    });
  }

  function setupMoreCoderInteraction() {
    const containers = document.querySelectorAll('.more-coder-window');

    containers.forEach((container) => {
      if (container.dataset.moreBound === 'true') return;

      const track = container.querySelector('[data-vol-track]');
      const prevBtn = container.querySelector('[data-vol-prev]');
      const nextBtn = container.querySelector('[data-vol-next]');
      const slides = container.querySelectorAll('.vol-slide');

      if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

      let currentIndex = 0;

      const updateSlider = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.forEach((slide, index) => {
          slide.classList.toggle('active', index === currentIndex);
        });
      };

      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      });

      container.dataset.moreBound = 'true';
      updateSlider();
    });
  }

  function setupGameMenuInteraction() {
    const games = Array.isArray(portfolioData.games) ? portfolioData.games : [];
    if (games.length === 0) return;

    const hubs = document.querySelectorAll('.game-hub');
    hubs.forEach((hub) => {
      if (hub.dataset.gameBound === 'true') return;

      const frame = hub.querySelector('#game-frame');
      const siteLink = hub.querySelector('#game-site-link');
      const devLink = hub.querySelector('#game-dev-link');
      const creditSuffix = hub.querySelector('#game-credit-suffix');
      const list = hub.querySelector('#game-list');

      if (!frame || !siteLink || !devLink || !creditSuffix || !list) return;

      const updateGameView = (gameId) => {
        const selectedGame = games.find((game) => game.id === gameId) || games[0];
        const gameAllow = selectedGame.allow || 'autoplay; payment; fullscreen; microphone; clipboard-read; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-write';

        frame.src = selectedGame.embedUrl;
        frame.title = selectedGame.title;
        frame.setAttribute('allow', gameAllow);

        siteLink.href = selectedGame.siteUrl;
        siteLink.textContent = selectedGame.title;
        devLink.href = selectedGame.developerUrl;
        devLink.textContent = selectedGame.developer;
        creditSuffix.textContent = selectedGame.creditSuffix ? ` ${selectedGame.creditSuffix}` : '';

        list.querySelectorAll('.game-list-item').forEach((item) => {
          item.classList.toggle('active', item.dataset.gameId === selectedGame.id);
        });
      };

      list.addEventListener('click', (event) => {
        const button = event.target.closest('.game-list-item');
        if (!button) return;
        updateGameView(button.dataset.gameId);
      });

      hub.dataset.gameBound = 'true';
      updateGameView(games[0].id);
    });
  }

  function setupResponsiveShellSync() {
    const mobileBreakpoint = window.matchMedia('(max-width: 780px)');

    const syncShellState = () => {
      setStartMenu(false);
      setTrayMenu(false);
      if (!mobileBreakpoint.matches) {
        closeMobilePanel();
      }
    };

    if (typeof mobileBreakpoint.addEventListener === 'function') {
      mobileBreakpoint.addEventListener('change', syncShellState);
    } else {
      mobileBreakpoint.addListener(syncShellState);
    }
  }

  function mountGlobalEvents() {
    const startButton = document.getElementById('start-button');
    const trayMenuButton = document.getElementById('tray-menu-button');
    const desktop = document.getElementById('desktop-shell');
    const mobileBack = document.getElementById('mobile-panel-back');
    const mobileClose = document.getElementById('mobile-panel-close');

    if (startButton) {
      startButton.addEventListener('click', (event) => {
        event.stopPropagation();
        setTrayMenu(false);
        setStartMenu(!state.startMenuOpen);
      });
    }

    if (trayMenuButton) {
      trayMenuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        setStartMenu(false);
        setTrayMenu(!state.trayMenuOpen);
      });
    }

    if (desktop) {
      desktop.addEventListener('click', (event) => {
        if (!event.target.closest('.desktop-icon')) {
          selectIcon(null);
        }
        if (!event.target.closest('#start-menu') && !event.target.closest('#start-button')) {
          setStartMenu(false);
        }
        if (!event.target.closest('#tray-menu') && !event.target.closest('#tray-menu-button')) {
          setTrayMenu(false);
        }
      });
    }

    if (mobileBack) {
      mobileBack.addEventListener('click', closeMobilePanel);
    }

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobilePanel);
    }

    document.addEventListener('keydown', (event) => {
      pressedKeys.add(event.key.toLowerCase());

      if (pressedKeys.has('shift') && pressedKeys.has('f') && pressedKeys.has('g')) {
        event.preventDefault();
        setStartMenu(false);
        setTrayMenu(false);
        openGamesFromShortcut();
      }

      if (event.key === 'Escape') {
        setStartMenu(false);
        setTrayMenu(false);
        closeMobilePanel();
      }
    });

    document.addEventListener('keyup', (event) => {
      pressedKeys.delete(event.key.toLowerCase());
    });

    document.addEventListener('wm:window-opened', (event) => {
      renderTaskbarButton(event.detail);
      setTaskbarMinimized(event.detail.id, false);
      setTaskbarActive(event.detail.id);

      // Setup skill interaction for Skills window
      if (event.detail.baseId === 'skills') {
        setupSkillInteraction();
      }

      if (event.detail.baseId === 'achievements') {
        setupAchievementInteraction();
      }

      if (event.detail.baseId === 'more') {
        setupMoreCoderInteraction();
      }

      if (event.detail.baseId === 'games') {
        setupGameMenuInteraction();
      }
    });

    document.addEventListener('wm:window-focused', (event) => {
      setTaskbarActive(event.detail.id);
      setTaskbarMinimized(event.detail.id, false);
    });

    document.addEventListener('wm:window-minimized', (event) => {
      setTaskbarMinimized(event.detail.id, true);
    });

    document.addEventListener('wm:window-restored', (event) => {
      setTaskbarMinimized(event.detail.id, false);
      setTaskbarActive(event.detail.id);
    });

    document.addEventListener('wm:window-closed', (event) => {
      removeTaskbarButton(event.detail.id);
    });
  }

  function updateClock() {
    const timeEl = document.getElementById('tray-time');
    const dateEl = document.getElementById('tray-date');
    if (!timeEl || !dateEl) return;

    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dateEl.textContent = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  function runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const body = document.body;

    const bootDurationMs = 1850;
    const fadeDurationMs = 500;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (bootScreen) {
          bootScreen.classList.add('is-hidden');
        }

        body.classList.remove('booting');
        body.classList.add('boot-complete');

        setTimeout(() => {
          if (bootScreen) {
            bootScreen.remove();
          }
          resolve();
        }, fadeDurationMs);
      }, bootDurationMs);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    runBootSequence().then(() => {
      renderDesktopIcons();
      renderStartMenu();
      renderMobileLauncher();
      mountGlobalEvents();
      setupResponsiveShellSync();

      updateClock();
      setInterval(updateClock, 1000);
    });
  });
})();
