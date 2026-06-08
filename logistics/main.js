/* ═══════════════════════════════════════════════════
   KOG LOGISTICAL SUPPORT — Cinematic JS Engine
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─── State ──────────────────────────────────────── */
let scrollY       = 0;
let targetScrollY = 0;
let ticking       = false;
let mouseX        = window.innerWidth  / 2;
let mouseY        = window.innerHeight / 2;
let cursorX       = mouseX;
let cursorY       = mouseY;
let ringX         = mouseX;
let ringY         = mouseY;

/* ─── DOM refs ───────────────────────────────────── */
const nav           = document.getElementById('nav');
const heroScene     = document.getElementById('heroScene');
const heroContent   = document.getElementById('heroContent');
const layerSky      = document.getElementById('layerSky');
const layerHorizon  = document.getElementById('layerHorizon');
const layerRoad     = document.getElementById('layerRoad');
const layerDash     = document.getElementById('layerDash');
const roadCenter    = document.getElementById('roadCenter');
const speedLines    = document.getElementById('speedLines');
const servicesTrack = document.getElementById('servicesTrack');
const servicesProgress = document.getElementById('servicesProgress');
const cursor        = document.getElementById('cursor');
const cursorRing    = document.getElementById('cursorRing');
const titleLine1    = document.getElementById('titleLine1');
const titleLine2    = document.getElementById('titleLine2');

/* ─── Utilities ──────────────────────────────────── */
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp  = (a, b, t) => a + (b - a) * t;
const norm  = (v, min, max) => clamp((v - min) / (max - min), 0, 1);

/* ═══════════════════════════════════════════════════
   CURSOR
   ═══════════════════════════════════════════════════ */
document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX = lerp(cursorX, mouseX, 0.55);
    cursorY = lerp(cursorY, mouseY, 0.55);
    ringX   = lerp(ringX,   mouseX, 0.15);
    ringY   = lerp(ringY,   mouseY, 0.15);

    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top  = cursorY + 'px';
    }
    if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top  = ringY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

/* ═══════════════════════════════════════════════════
   SCROLL ENGINE
   ═══════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
}, { passive: true });

function onScroll() {
    ticking = false;
    const vh = window.innerHeight;

    /* Nav */
    if (nav) {
        nav.classList.toggle('scrolled', scrollY > 60);
    }

    /* ── Hero parallax + POV ── */
    const heroProgress = clamp(scrollY / vh, 0, 1);

    if (heroScene) {
        /* Subtle POV tilt as you scroll — road rises toward you */
        const tiltX = heroProgress * 6;
        heroScene.style.transform = `perspective(1200px) rotateX(${tiltX}deg)`;
        heroScene.style.transformOrigin = '50% 58%';
    }

    if (layerSky) {
        /* Sky drifts up slower than scroll */
        layerSky.style.transform = `translateY(${heroProgress * -8}%)`;
    }

    if (layerHorizon) {
        layerHorizon.style.transform = `translateY(${heroProgress * -12}%)`;
        layerHorizon.style.opacity   = (1 - heroProgress * 0.5).toString();
    }

    if (layerRoad) {
        /* Road rushes toward you — scale + translate */
        const roadScale = 1 + heroProgress * 0.15;
        layerRoad.style.transform = `scaleY(${roadScale}) translateY(${heroProgress * -5}%)`;
        layerRoad.style.transformOrigin = '50% 100%';
    }

    if (roadCenter) {
        /* Road markings animate at scroll speed — feel of motion */
        roadCenter.style.animationPlayState = scrollY > 10 ? 'running' : 'paused';
        const dashOffset = (scrollY * 0.8) % 56;
        roadCenter.style.backgroundPositionY = `-${dashOffset}px`;
    }

    if (layerDash) {
        /* Dashboard rises slightly on scroll */
        layerDash.style.transform = `translateY(${heroProgress * 6}%)`;
    }

    if (speedLines) {
        /* Speed lines fade in as you scroll */
        speedLines.style.opacity = clamp(heroProgress * 3, 0, 0.5).toString();
        speedLines.querySelectorAll('.sl').forEach((sl, i) => {
            const offset = Math.sin(scrollY * 0.05 + i) * 4;
            sl.style.transform = `translateY(${offset}px)`;
        });
    }

    if (heroContent) {
        /* Hero text fades and rises on scroll */
        const fadeStart = 0.15;
        const fadeEnd   = 0.6;
        const p = norm(heroProgress, fadeStart, fadeEnd);
        heroContent.style.opacity    = (1 - p).toString();
        heroContent.style.transform  = `translateY(${p * -60}px)`;
    }

    /* ── Services horizontal scroll ── */
    if (servicesTrack) {
        const section   = document.getElementById('services');
        const rect      = section.getBoundingClientRect();
        const stickyH   = window.innerHeight;
        const totalH    = section.offsetHeight - stickyH;
        const traveled  = clamp(-rect.top, 0, totalH);
        const progress  = traveled / totalH;

        const trackW    = servicesTrack.scrollWidth - servicesTrack.parentElement.offsetWidth + (window.innerWidth * 0.1);
        const translateX = -(progress * trackW);
        servicesTrack.style.transform = `translateX(${translateX}px)`;

        if (servicesProgress) {
            servicesProgress.style.width = (progress * 100) + '%';
        }
    }

    /* ── Stats counter trigger ── */
    triggerCounters();

    /* ── Scroll reveals ── */
    triggerReveals();
}

/* ═══════════════════════════════════════════════════
   WORD REVEAL — Statement section
   ═══════════════════════════════════════════════════ */
function initWordReveals() {
    const words = document.querySelectorAll('.reveal-word');
    if (!words.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const allWords = entry.target.parentElement.querySelectorAll('.reveal-word');
                allWords.forEach((w, i) => {
                    setTimeout(() => w.classList.add('visible'), i * 80);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(words[0]);
}

/* ═══════════════════════════════════════════════════
   SCROLL REVEALS
   ═══════════════════════════════════════════════════ */
function triggerReveals() {
    const elements = document.querySelectorAll('.reveal-up:not(.visible), .reveal-fade:not(.visible)');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
            el.classList.add('visible');
        }
    });
}

/* ═══════════════════════════════════════════════════
   STAT COUNTERS
   ═══════════════════════════════════════════════════ */
let countersTriggered = false;

function triggerCounters() {
    if (countersTriggered) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        countersTriggered = true;
        animateCounters();
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target   = parseInt(counter.dataset.target, 10);
        const duration = 1800;
        const start    = performance.now();

        function step(now) {
            const elapsed  = now - start;
            const progress = clamp(elapsed / duration, 0, 1);
            /* Ease out expo */
            const eased = 1 - Math.pow(1 - progress, 4);
            const value = Math.round(eased * target);
            counter.textContent = value.toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    });
}

/* ═══════════════════════════════════════════════════
   HERO ROAD MARKING ANIMATION
   CSS handles the dash animation — JS supplements
   with scroll-synced speed
   ═══════════════════════════════════════════════════ */
function animateRoadMarkings() {
    const markings = document.querySelectorAll('.road-marking');
    let offset = 0;
    let lastTime = 0;

    function step(timestamp) {
        const delta = timestamp - lastTime;
        lastTime = timestamp;

        /* Speed based on page scroll velocity — animated even at rest */
        const baseSpeed = 0.5;
        const scrollSpeed = Math.abs(scrollY - (window._lastScrollY || 0)) * 0.3;
        window._lastScrollY = scrollY;
        offset += (baseSpeed + scrollSpeed) * (delta / 16);

        markings.forEach((m, i) => {
            const speed = i === 0 ? 1 : 0.7;
            m.style.backgroundPositionY = -(offset * speed) % 56 + 'px';
        });

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════════════
   SUBTLE MOUSE PARALLAX ON HERO
   ═══════════════════════════════════════════════════ */
function heroMouseParallax() {
    document.addEventListener('mousemove', e => {
        if (scrollY > window.innerHeight * 0.5) return;

        const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;

        if (layerSky) {
            layerSky.style.transform = `translate(${cx * -6}px, ${cy * -4}px)`;
        }
        if (layerHorizon) {
            layerHorizon.style.transform = `translate(${cx * -10}px, ${cy * -6}px)`;
        }
        if (titleLine1) {
            titleLine1.style.transform = `translate(${cx * 3}px, ${cy * 2}px)`;
        }
        if (titleLine2) {
            titleLine2.style.transform = `translate(${cx * -3}px, ${cy * -2}px)`;
        }
    });
}

/* ═══════════════════════════════════════════════════
   FORM SUBMIT
   ═══════════════════════════════════════════════════ */
function initForm() {
    const form = document.getElementById('ctaForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn  = form.querySelector('.btn-submit');
        const span = btn.querySelector('span');
        span.textContent = 'SENDING...';
        btn.disabled = true;

        try {
            const data = new FormData(form);
            const resp = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (resp.ok) {
                span.textContent = 'REQUEST SENT';
                btn.style.background = 'var(--teal-lt)';
                form.reset();
                setTimeout(() => {
                    span.textContent = 'SUBMIT REQUEST';
                    btn.disabled = false;
                    btn.style.background = '';
                }, 4000);
            } else {
                throw new Error('Server error');
            }
        } catch {
            span.textContent = 'TRY AGAIN';
            btn.disabled = false;
        }
    });
}

/* ═══════════════════════════════════════════════════
   INTERSECTION: Why items stagger
   ═══════════════════════════════════════════════════ */
function initWhyItems() {
    const items = document.querySelectorAll('.why-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0, 10);
                setTimeout(() => entry.target.classList.add('visible'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
}

/* ═══════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
   ═══════════════════════════════════════════════════ */
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ═══════════════════════════════════════════════════
   SERVICE CARD hover depth effect
   ═══════════════════════════════════════════════════ */
function initCardTilt() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
            const cy   = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `translateY(-4px) rotateX(${-cy * 6}deg) rotateY(${cx * 6}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ═══════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    initWordReveals();
    initForm();
    initWhyItems();
    initSmoothAnchors();
    initCardTilt();
    animateRoadMarkings();
    heroMouseParallax();
    triggerReveals();
    onScroll();
});

window.addEventListener('resize', () => {
    onScroll();
}, { passive: true });
