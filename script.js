// Dark Mode Toggle
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeIcon();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark.toString());
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// Language Switcher
function initLanguage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['de', 'en', 'fr', 'sq'].includes(savedLang)) {
        setLanguage(savedLang);
    } else {
        // Auto-detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        if (['de', 'en', 'fr', 'sq'].includes(langCode)) {
            setLanguage(langCode);
        } else {
            setLanguage('de'); // Default to German
        }
    }
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    // Update active button
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    // Translate page
    if (typeof translatePage === 'function') {
        translatePage();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initLanguage();
    
    // Translate page on load
    if (typeof translatePage === 'function') {
        translatePage();
    }
    
    // Add event listeners
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Language buttons
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });
});
