/* ==========================================================================
   TechNova Systems — site behaviour
   Mobile nav toggle, defensive table scrolling, active-link sync.
   Dependency-free. Loaded with `defer`.
   ========================================================================== */
(() => {
    'use strict';

    /* ----- Mobile navigation ----- */
    function initNav() {
        const toggle = document.querySelector('.nav-toggle');
        const nav = document.getElementById('primary-nav');
        if (!toggle || !nav) return;

        const setOpen = (open) => {
            nav.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
        };

        toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

        // Close after navigating (covers in-page anchors + hash changes) and on outside click
        nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('open')) return;
            if (!e.target.closest('.nav') && !e.target.closest('.nav-toggle')) setOpen(false);
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    }

    /* ----- Make every data table horizontally scrollable on small screens ----- */
    function wrapTables() {
        document.querySelectorAll('table').forEach((t) => {
            if (t.closest('.table-scroll') || t.closest('.log-container') || t.closest('.summary-table')) return;
            const wrap = document.createElement('div');
            wrap.className = 'table-scroll';
            t.parentNode.insertBefore(wrap, t);
            wrap.appendChild(t);
        });
    }

    /* ----- Sync active nav link with the current page (robustness) ----- */
    function syncActiveLink() {
        const nav = document.getElementById('primary-nav');
        if (!nav) return;
        if (nav.querySelector('a.active')) return; // already marked in markup
        const here = location.pathname.split('/').pop() || 'index.html';
        nav.querySelectorAll('a').forEach((a) => {
            const target = a.getAttribute('href').split('/').pop();
            if (target === here) a.classList.add('active');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { initNav(); wrapTables(); syncActiveLink(); });
    } else {
        initNav(); wrapTables(); syncActiveLink();
    }
})();
