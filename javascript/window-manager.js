// Window Manager - handles draggable windows and z-index stacking

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.nextZIndex = 100;
    this.container = document.getElementById('windows');
    this.draggedWindow = null;
    this.resizedWindow = null;
    this.dragOffset = { x: 0, y: 0 };
    this.resizeState = null;
    this.instanceCount = 0;

    // Bound handlers are required so add/removeEventListener use the same reference.
    this.onDragMove = this.drag.bind(this);
    this.onDragEnd = this.endDrag.bind(this);
    this.onResizeMove = this.resize.bind(this);
    this.onResizeEnd = this.endResize.bind(this);
  }

  emit(eventName, detail) {
    document.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  createWindow(id, title, content, options = {}) {
    const allowMultiple = options.allowMultiple !== false;
    const instanceId = allowMultiple ? `${id}-${++this.instanceCount}` : id;

    if (!allowMultiple && this.windows.has(instanceId)) {
      this.restoreWindow(instanceId);
      this.bringToFront(instanceId);
      return this.windows.get(instanceId).el;
    }

    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = `window-${instanceId}`;
    windowEl.dataset.windowId = instanceId;
    windowEl.dataset.windowBase = id;

    // Assign initial position with slight offset for stacking
    const offset = (this.windows.size % 5) * 30;
    windowEl.style.left = (100 + offset) + 'px';
    windowEl.style.top = (80 + offset) + 'px';
    windowEl.style.zIndex = this.nextZIndex++;

    // Build window HTML
    windowEl.innerHTML = `
      <div class="window-titlebar">
        <span class="window-title">${title}</span>
        <div class="window-controls">
          <button class="window-minimize" aria-label="Minimize">_</button>
          <button class="window-maximize" aria-label="Maximize">□</button>
          <button class="window-close" aria-label="Close">✕</button>
        </div>
      </div>
      <div class="window-content">
        ${content}
      </div>
      <div class="window-resize-handle window-resize-handle--n" data-resize="n" aria-hidden="true"></div>
      <div class="window-resize-handle window-resize-handle--e" data-resize="e" aria-hidden="true"></div>
      <div class="window-resize-handle window-resize-handle--s" data-resize="s" aria-hidden="true"></div>
      <div class="window-resize-handle window-resize-handle--w" data-resize="w" aria-hidden="true"></div>
      <div class="window-resize-handle window-resize-handle--ne" data-resize="ne" aria-hidden="true"></div>
      <div class="window-resize-handle window-resize-handle--nw" data-resize="nw" aria-hidden="true"></div>
      <div class="window-resize-handle window-resize-handle--se" data-resize="se" aria-hidden="true"></div>
      <div class="window-resize-handle window-resize-handle--sw" data-resize="sw" aria-hidden="true"></div>
    `;

    // Attach listeners
    const titlebar = windowEl.querySelector('.window-titlebar');
    const closeBtn = windowEl.querySelector('.window-close');
    const minimizeBtn = windowEl.querySelector('.window-minimize');
    const maximizeBtn = windowEl.querySelector('.window-maximize');
    const resizeHandles = windowEl.querySelectorAll('.window-resize-handle');

    titlebar.addEventListener('pointerdown', (e) => this.startDrag(e, windowEl));
    closeBtn.addEventListener('click', () => this.closeWindow(instanceId));
    minimizeBtn.addEventListener('click', () => this.minimizeWindow(instanceId));
    maximizeBtn.addEventListener('click', () => this.toggleMaximize(instanceId));
    resizeHandles.forEach((handle) => {
      handle.addEventListener('pointerdown', (e) => {
        this.startResize(e, windowEl, handle.dataset.resize);
      });
    });

    // Add to DOM
    this.container.appendChild(windowEl);
    this.windows.set(instanceId, {
      el: windowEl,
      id: instanceId,
      baseId: id,
      title,
      state: 'normal',
      previousRect: null
    });

    // Bring to front on click
    windowEl.addEventListener('pointerdown', () => this.bringToFront(instanceId));

    this.emit('wm:window-opened', {
      id: instanceId,
      baseId: id,
      title
    });

    return windowEl;
  }

  startDrag(e, windowEl) {
    // Don't drag if clicking close button
    if (e.target.closest('.window-controls')) return;
    const info = this.windows.get(windowEl.dataset.windowId);
    if (info && info.state === 'maximized') return;
    e.preventDefault();

    this.draggedWindow = windowEl;
    this.bringToFront(windowEl.dataset.windowId);

    const rect = windowEl.getBoundingClientRect();

    this.dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    document.addEventListener('pointermove', this.onDragMove);
    document.addEventListener('pointerup', this.onDragEnd);
  }

  drag(e) {
    if (!this.draggedWindow) return;

    const x = e.clientX - this.dragOffset.x;
    const y = e.clientY - this.dragOffset.y;

    // Keep at least part of the titlebar visible so windows are always recoverable.
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 36;
    const clampedX = Math.max(-this.draggedWindow.offsetWidth + 120, Math.min(x, maxX));
    const clampedY = Math.max(0, Math.min(y, maxY));

    this.draggedWindow.style.left = `${clampedX}px`;
    this.draggedWindow.style.top = `${clampedY}px`;
  }

  endDrag() {
    document.removeEventListener('pointermove', this.onDragMove);
    document.removeEventListener('pointerup', this.onDragEnd);
    this.draggedWindow = null;
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  startResize(e, windowEl, direction) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const info = this.windows.get(windowEl.dataset.windowId);
    if (!info || info.state === 'maximized') return;

    e.preventDefault();
    e.stopPropagation();

    this.resizedWindow = windowEl;
    this.bringToFront(windowEl.dataset.windowId);

    const rect = windowEl.getBoundingClientRect();
    windowEl.style.left = `${rect.left}px`;
    windowEl.style.top = `${rect.top}px`;
    windowEl.style.width = `${rect.width}px`;
    windowEl.style.height = `${rect.height}px`;

    this.resizeState = {
      direction,
      startLeft: rect.left,
      startTop: rect.top,
      startRight: rect.right,
      startBottom: rect.bottom
    };

    document.addEventListener('pointermove', this.onResizeMove);
    document.addEventListener('pointerup', this.onResizeEnd);
  }

  resize(e) {
    if (!this.resizedWindow || !this.resizeState) return;

    const minWidth = 360;
    const minHeight = 240;
    const viewportWidth = window.innerWidth;
    const viewportHeight = Math.max(200, window.innerHeight - 42);
    const { direction, startLeft, startTop, startRight, startBottom } = this.resizeState;

    let left = startLeft;
    let top = startTop;
    let right = startRight;
    let bottom = startBottom;

    if (direction.includes('e')) {
      right = this.clamp(e.clientX, left + minWidth, viewportWidth);
    }
    if (direction.includes('s')) {
      bottom = this.clamp(e.clientY, top + minHeight, viewportHeight);
    }
    if (direction.includes('w')) {
      left = this.clamp(e.clientX, 0, right - minWidth);
    }
    if (direction.includes('n')) {
      top = this.clamp(e.clientY, 0, bottom - minHeight);
    }

    this.resizedWindow.style.left = `${left}px`;
    this.resizedWindow.style.top = `${top}px`;
    this.resizedWindow.style.width = `${right - left}px`;
    this.resizedWindow.style.height = `${bottom - top}px`;
  }

  endResize() {
    document.removeEventListener('pointermove', this.onResizeMove);
    document.removeEventListener('pointerup', this.onResizeEnd);
    this.resizedWindow = null;
    this.resizeState = null;
  }

  bringToFront(windowId) {
    const info = this.windows.get(windowId);
    if (info) {
      const windowEl = info.el;
      windowEl.style.zIndex = this.nextZIndex++;
      this.emit('wm:window-focused', {
        id: windowId,
        title: info.title,
        state: info.state
      });
    }
  }

  minimizeWindow(windowId) {
    const info = this.windows.get(windowId);
    if (!info || info.state === 'minimized') return;
    info.state = 'minimized';
    info.el.classList.add('minimized');
    this.emit('wm:window-minimized', {
      id: windowId,
      title: info.title,
      state: info.state
    });
  }

  restoreWindow(windowId) {
    const info = this.windows.get(windowId);
    if (!info) return;

    if (info.state === 'minimized') {
      info.el.classList.remove('minimized');
      info.state = 'normal';
    }

    this.bringToFront(windowId);
    this.emit('wm:window-restored', {
      id: windowId,
      title: info.title,
      state: info.state
    });
  }

  toggleMaximize(windowId) {
    const info = this.windows.get(windowId);
    if (!info) return;

    if (info.state !== 'maximized') {
      info.previousRect = {
        left: info.el.style.left,
        top: info.el.style.top,
        width: info.el.style.width,
        height: info.el.style.height
      };
      info.state = 'maximized';
      info.el.classList.add('maximized');
      this.bringToFront(windowId);
      this.emit('wm:window-maximized', {
        id: windowId,
        title: info.title,
        state: info.state
      });
      return;
    }

    info.state = 'normal';
    info.el.classList.remove('maximized');
    if (info.previousRect) {
      info.el.style.left = info.previousRect.left;
      info.el.style.top = info.previousRect.top;
      info.el.style.width = info.previousRect.width;
      info.el.style.height = info.previousRect.height;
    }
    this.bringToFront(windowId);
    this.emit('wm:window-restored', {
      id: windowId,
      title: info.title,
      state: info.state
    });
  }

  closeWindow(windowId) {
    const info = this.windows.get(windowId);
    if (info) {
      const windowEl = info.el;
      if (this.draggedWindow === windowEl) {
        this.endDrag();
      }
      if (this.resizedWindow === windowEl) {
        this.endResize();
      }
      windowEl.style.animation = 'windowClose 0.2s ease-out forwards';
      setTimeout(() => {
        windowEl.remove();
        this.windows.delete(windowId);
        this.emit('wm:window-closed', {
          id: windowId,
          title: info.title
        });
      }, 200);
    }
  }

  closeAll() {
    [...this.windows.keys()].forEach((id) => {
      this.closeWindow(id);
    });
  }
}

// Create global window manager instance
const windowManager = new WindowManager();
