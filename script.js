document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initCertificateModal();
});

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const body = document.body;
    const saved = localStorage.getItem('theme') || 'dark';
    const setThemeIcon = () => {
        const light = body.classList.contains('light-theme');
        toggle.innerHTML = light ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };

    if (saved === 'light') {
        body.classList.add('light-theme');
    }
    setThemeIcon();

    toggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
        setThemeIcon();
    });
}

function initMobileMenu() {
    const menu = document.getElementById('nav-menu');
    const button = document.getElementById('mobile-menu-toggle');
    if (!menu || !button) return;

    const icon = button.querySelector('i');
    const closeMenu = () => {
        menu.classList.remove('active');
        document.body.style.overflow = '';
        if (icon) icon.className = 'fas fa-bars';
    };

    button.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!menu.contains(target) && !button.contains(target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
}

function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    if (!links.length || !sections.length) return;

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            const menu = document.getElementById('nav-menu');
            if (!target) return;

            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
            if (menu) menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const activateOnScroll = () => {
        const offset = window.scrollY + 120;
        let current = '#header';

        sections.forEach((section) => {
            if (offset >= section.offsetTop) {
                current = `#${section.id}`;
            }
        });

        links.forEach((link) => {
            const active = link.getAttribute('href') === current;
            link.classList.toggle('active', active);
        });
    };

    window.addEventListener('scroll', activateOnScroll);
    activateOnScroll();
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.intro-grid, .section-title, .skill-group, .skills-cloud, .timeline-item, .exp-stack, .project-card, .education-card, .cert-card, .contact-content');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    elements.forEach((element) => {
        element.classList.add('loading');
        observer.observe(element);
    });
}

function initCertificateModal() {
    const modal = document.getElementById('cert-modal');
    const image = document.getElementById('cert-modal-image');
    const title = document.getElementById('cert-modal-title');
    const sourceLine = document.getElementById('cert-modal-source-line');
    const sourceLink = document.getElementById('cert-modal-source');
    const closeBtn = document.getElementById('cert-modal-close');
    const closeBackdrop = document.querySelector('[data-close-cert-modal]');

    if (!modal || !image || !title || !sourceLine || !sourceLink || !closeBtn || !closeBackdrop) {
        return;
    }

    const openModal = (card) => {
        const src = card.dataset.certImage;
        const certTitle = card.dataset.certTitle || 'Certificate';
        const source = card.dataset.certSource || '';

        image.src = src;
        image.alt = certTitle;
        title.textContent = certTitle;

        if (source) {
            sourceLine.classList.remove('no-source');
            sourceLink.href = source;
            sourceLink.textContent = source;
        } else {
            sourceLine.classList.add('no-source');
            sourceLink.href = '#';
            sourceLink.textContent = '';
        }

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.addEventListener('click', (event) => {
        const card = event.target.closest('.cert-card[data-cert-image]');
        if (!card) return;
        event.preventDefault();
        openModal(card);
    });

    closeBtn.addEventListener('click', closeModal);
    closeBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');
    if (!form || !message) return;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyKCv-36sYD4WW4MP3TCCuD6XFLLmopY_Sy5MdyNy-qCyuRi8ZVhIYCT-NJqRHK3tbpHQ/exec';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        if (!button) return;

        const originalLabel = button.textContent;
        button.disabled = true;
        button.textContent = 'Sending...';

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            });

            if (!response.ok) throw new Error('Submission failed');

            form.reset();
            showMessage('Message sent successfully. Thank you for reaching out.', 'success');
        } catch (error) {
            showMessage('Could not send message right now. Please try again.', 'error');
        } finally {
            button.disabled = false;
            button.textContent = originalLabel;
        }
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `message ${type}`;
        setTimeout(() => {
            message.textContent = '';
            message.className = '';
        }, 5000);
    }
}