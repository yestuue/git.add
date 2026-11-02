/**
 * =========================================================
 * ALEX ADELEKE - COS 106 PORTFOLIO JAVASCRIPT ENGINE
 * Pure Vanilla JavaScript (ES6+) · DOM & Array State Logic
 * Fulfills Requirements 4 (Task Planner) & 5 (Validation)
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. INTERACTIVE PARTICLE CANVAS BACKGROUND
  // =========================================================
  const initCanvas = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 35 : 70;
    const maxDistance = 110;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles within proximity
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  };

  initCanvas();

  // =========================================================
  // 2. MOBILE NAVIGATION DRAWER & SMOOTH SCROLLING
  // =========================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  const toggleMobileMenu = (forceState) => {
    const isExpanded = forceState !== undefined ? forceState : mobileToggle.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;

    mobileToggle.setAttribute('aria-expanded', String(newState));
    mobileDrawer.hidden = !newState;

    if (newState) {
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  // Close drawer on link click or outside click
  document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
      toggleMobileMenu(true);
    }
  });

  // Active Link Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScrollSpy = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScrollSpy, { passive: true });

  // =========================================================
  // 3. SAMPLE PROJECTS FILTERING & PREVIEW MODAL
  // =========================================================
  const projectDatabase = {
    'miva-portal': {
      title: 'MIVA Academic Management Portal',
      subtitle: 'Course Registration, GPA Tracker & Student Dashboard',
      description: 'A responsive academic management platform designed for university students to track credit units, compute cumulative GPA, manage course schedules, and view semester progress reports.',
      liveUrl: 'https://miva-academic-portal.edu.ng/demo',
      githubUrl: 'https://github.com/miva-student/academic-management-portal',
      features: [
        'Real-time semester GPA computation algorithm',
        'Persistent course registration with LocalStorage',
        'W3C-compliant semantic HTML5 table structure',
        'Mobile-friendly responsive CSS Grid layout'
      ]
    },
    'nexus-topology': {
      title: 'Nexus 3D Academic Topology Field',
      subtitle: 'WebGL Three.js Curriculum Knowledge Constellation',
      description: 'An interactive 3D WebGL data visualization that maps university course prerequisites, student research nodes, and computer science learning graphs in real-time with ambient physics.',
      liveUrl: 'https://nexus-topology.web.app',
      githubUrl: 'https://github.com/miva-student/nexus-3d-topology',
      features: [
        'Interactive particle constellation with 120+ animated nodes',
        'Dynamic depth of field & additive blending lines',
        'Hardware-accelerated 60 FPS WebGL rendering',
        'Touch-optimized rotational inertia for mobile'
      ]
    },
    'study-optimizer': {
      title: 'Campus Study Schedule & Task Optimizer',
      subtitle: 'Intelligent Academic Task Engine & Calendar Sync',
      description: 'An interactive web app with DOM manipulation and array-based task management. Allows students to organize assignments by course code, set countdown timers, and track deadlines.',
      liveUrl: 'https://campus-task-optimizer.vercel.app',
      githubUrl: 'https://github.com/miva-student/study-task-optimizer',
      features: [
        'Strict JavaScript form validation before submission',
        'Array methods (filter, map, reduce) for task states',
        'Instant audio and visual feedback upon completion',
        'Custom status tags (High, Medium, Low Priority)'
      ]
    }
  };

  // Category Filtering logic
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterVal = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Modal Dialog Logic
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalGithubLink = document.getElementById('modal-github-link');

  const openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalDesc.textContent = data.description;
    modalLiveLink.href = data.liveUrl;
    modalGithubLink.href = data.githubUrl;

    modalFeaturesList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeaturesList.appendChild(li);
    });

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeProjectModal();
    }
  });

  // =========================================================
  // 4. ACADEMIC TASK PLANNER (Interactive JS Requirement 4)
  // =========================================================
  const STORAGE_KEY = 'miva_academic_planner_tasks';

  const defaultTasks = [
    {
      id: 'task-1',
      title: 'Complete COS 106 Term Project Web Platform & Defense',
      courseCode: 'COS 106',
      dueDate: '2026-11-20',
      priority: 'High',
      completed: true,
      createdAt: '2026-11-01',
    },
    {
      id: 'task-2',
      title: 'Review MTH 101 Calculus Problem Sets & Differential Equations',
      courseCode: 'MTH 101',
      dueDate: '2026-11-24',
      priority: 'High',
      completed: false,
      createdAt: '2026-11-01',
    },
    {
      id: 'task-3',
      title: 'Submit GST 101 Essay on Communication in Digital Age',
      courseCode: 'GST 101',
      dueDate: '2026-11-28',
      priority: 'Medium',
      completed: false,
      createdAt: '2026-11-02',
    },
    {
      id: 'task-4',
      title: 'Conduct PHY 101 Virtual Physics Experiment Report',
      courseCode: 'PHY 101',
      dueDate: '2026-12-02',
      priority: 'Low',
      completed: false,
      createdAt: '2026-11-02',
    },
  ];

  // Load from LocalStorage or use defaults
  let tasks = [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    tasks = saved ? JSON.parse(saved) : defaultTasks;
  } catch {
    tasks = defaultTasks;
  }

  let activeTaskFilter = 'all';

  // DOM Elements
  const addTaskForm = document.getElementById('add-task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskCourseSelect = document.getElementById('task-course');
  const taskPrioritySelect = document.getElementById('task-priority');
  const taskDueDateInput = document.getElementById('task-due-date');
  const plannerErrorAlert = document.getElementById('planner-form-error');
  const plannerErrorMsg = document.getElementById('planner-error-msg');
  const tasksListContainer = document.getElementById('tasks-list');

  // Metrics Elements
  const metricTotal = document.getElementById('metric-total');
  const metricCompleted = document.getElementById('metric-completed');
  const metricPending = document.getElementById('metric-pending');
  const metricProgress = document.getElementById('metric-progress');
  const countAll = document.getElementById('count-all');
  const countPending = document.getElementById('count-pending');
  const countCompleted = document.getElementById('count-completed');

  const saveTasks = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  };

  const renderTasks = () => {
    // 1. Compute Analytics
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    metricTotal.textContent = total;
    metricCompleted.textContent = completed;
    metricPending.textContent = pending;
    metricProgress.textContent = `${progress}%`;

    countAll.textContent = total;
    countPending.textContent = pending;
    countCompleted.textContent = completed;

    // 2. Filter tasks
    const filtered = tasks.filter(t => {
      if (activeTaskFilter === 'pending') return !t.completed;
      if (activeTaskFilter === 'completed') return t.completed;
      return true;
    });

    tasksListContainer.innerHTML = '';

    if (filtered.length === 0) {
      tasksListContainer.innerHTML = `
        <div class="empty-state">
          <h4>No tasks in this category</h4>
          <p class="text-xs">Add a new academic milestone above to begin tracking.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(task => {
      const item = document.createElement('div');
      item.className = `task-item ${task.completed ? 'completed' : ''}`;
      item.setAttribute('data-id', task.id);

      item.innerHTML = `
        <button type="button" class="task-check-btn" aria-label="${task.completed ? 'Mark as pending' : 'Mark as completed'}">
          <svg viewBox="0 0 24 24" fill="${task.completed ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" class="icon-svg">
            <circle cx="12" cy="12" r="10"></circle>
            ${task.completed ? '<polyline points="16 9 10 15 7 12"></polyline>' : ''}
          </svg>
        </button>

        <div class="task-content">
          <p class="task-title-text">${task.title}</p>
          <div class="task-meta">
            <span class="task-course-badge">${task.courseCode}</span>
            <span>Due: ${task.dueDate}</span>
            <span class="task-priority-badge">${task.priority}</span>
          </div>
        </div>

        <button type="button" class="task-delete-btn" aria-label="Delete task">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg-sm">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      `;

      // Checkbox click
      item.querySelector('.task-check-btn').addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      // Delete click
      item.querySelector('.task-delete-btn').addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      tasksListContainer.appendChild(item);
    });
  };

  // Add Task Form Submit
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      plannerErrorAlert.hidden = true;

      const title = taskTitleInput.value.trim();
      const course = taskCourseSelect.value;
      const priority = taskPrioritySelect.value;
      const dueDate = taskDueDateInput.value;

      if (!title) {
        plannerErrorMsg.textContent = 'Please enter a descriptive task title.';
        plannerErrorAlert.hidden = false;
        taskTitleInput.focus();
        return;
      }

      if (!dueDate) {
        plannerErrorMsg.textContent = 'Please select a valid deadline date.';
        plannerErrorAlert.hidden = false;
        taskDueDateInput.focus();
        return;
      }

      const newTask = {
        id: 'task-' + Date.now(),
        title,
        courseCode: course,
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0],
      };

      // Array manipulation: unshift to front
      tasks.unshift(newTask);
      saveTasks();
      renderTasks();

      // Reset form
      taskTitleInput.value = '';
      taskDueDateInput.value = '';
    });
  }

  // Filter Task tabs
  document.querySelectorAll('.task-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.task-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTaskFilter = btn.getAttribute('data-task-filter');
      renderTasks();
    });
  });

  // Initial Task Render
  renderTasks();

  // =========================================================
  // 5. VALIDATED CONTACT FORM (Requirement 5)
  // =========================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');
  const successAlert = document.getElementById('contact-success-alert');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorPhone = document.getElementById('error-phone');
  const errorMessage = document.getElementById('error-message');

  const setError = (input, errorEl, msg) => {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = msg;
    errorEl.hidden = false;
  };

  const clearError = (input, errorEl) => {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.hidden = true;
  };

  // Field Validation Rules
  const validateName = () => {
    const val = nameInput.value.trim();
    if (!val) {
      setError(nameInput, errorName, 'Full Name is required.');
      return false;
    }
    if (val.length < 2) {
      setError(nameInput, errorName, 'Full Name must contain at least 2 characters.');
      return false;
    }
    clearError(nameInput, errorName);
    return true;
  };

  const validateEmail = () => {
    const val = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setError(emailInput, errorEmail, 'Email address is required.');
      return false;
    }
    if (!regex.test(val)) {
      setError(emailInput, errorEmail, 'Please provide a valid email format (e.g., student@miva.edu.ng).');
      return false;
    }
    clearError(emailInput, errorEmail);
    return true;
  };

  const validatePhone = () => {
    const val = phoneInput.value.trim();
    const digitsOnlyRegex = /^\+?[0-9\s\-()]{7,16}$/;
    if (!val) {
      setError(phoneInput, errorPhone, 'Phone number is required.');
      return false;
    }
    if (!digitsOnlyRegex.test(val)) {
      setError(phoneInput, errorPhone, 'Phone number must contain only numeric digits and valid phone symbols.');
      return false;
    }
    clearError(phoneInput, errorPhone);
    return true;
  };

  const validateMessage = () => {
    const val = messageInput.value.trim();
    if (!val) {
      setError(messageInput, errorMessage, 'Message content cannot be blank.');
      return false;
    }
    if (val.length < 10) {
      setError(messageInput, errorMessage, 'Message must be at least 10 characters long.');
      return false;
    }
    clearError(messageInput, errorMessage);
    return true;
  };

  // Real-time validation listeners
  nameInput.addEventListener('input', () => { if (nameInput.classList.contains('is-invalid')) validateName(); });
  emailInput.addEventListener('input', () => { if (emailInput.classList.contains('is-invalid')) validateEmail(); });
  phoneInput.addEventListener('input', () => { if (phoneInput.classList.contains('is-invalid')) validatePhone(); });
  messageInput.addEventListener('input', () => { if (messageInput.classList.contains('is-invalid')) validateMessage(); });

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  messageInput.addEventListener('blur', validateMessage);

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        successAlert.hidden = false;
        contactForm.reset();

        // Scroll success alert into view smoothly
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          successAlert.hidden = true;
        }, 8000);
      }
    });
  }

});
