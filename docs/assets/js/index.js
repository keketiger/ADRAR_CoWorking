const categories = [
    {
        title: 'Accueil', icon: 'fas fa-home',
        page: 'home'
    },
    {
        title: 'Github', icon: 'fa-brands fa-github',
        subcategories: [
            {title: 'Commandes Git', page: 'github/git_commands'},
        ]
    },
    {
        title: 'Linux', icon: 'fa-brands fa-linux',
        subcategories: [
            {title: 'Commandes Debian 12', page: 'linux/debian12_commands'},
        ]
    },
    {
        title: 'Windows', icon: 'fa-brands fa-windows',
        subcategories: [
            {title: "Création d'un Serveur", page: 'windows/server_setup'},
            {title: "Création d'un Client", page: 'windows/client_setup'},
            {title: "Création d'un Active Directory", page: 'windows/active_directory'},
        ]
    }
];

function generateSideBar() {
    const sidebar = document.querySelector('.sidebar .menu');
    sidebar.innerHTML = categories.map((category, index) => `
        <li>
            <button class="menu-btn" onclick="handleMenuClick(this, '${category.page}', ${!!category.subcategories}, 'submenu${index}')"
                ${category.page === 'home' ? 'data-active\="true"' : ''}>
                <i class="${category.icon}"></i> ${category.title}
            </button>
            ${category.subcategories ? `
                <ul id="submenu${index}" class="submenu" style="display: none;">
                    ${category.subcategories.map(subcategory => `
                        <li><button onclick="loadPage('${subcategory.page}')">${subcategory.title}</button></li>
                    `).join('')}
                </ul>` : ''}
        </li>
    `).join('');
}

function handleMenuClick(button, page, hasSubmenu, submenuId) {
    document.querySelectorAll('.menu-btn').forEach(btn => btn.removeAttribute('data-active'));
    button.setAttribute('data-active', 'true');
    if (hasSubmenu) {
        toggleSubmenu(submenuId);
    } else {
        loadPage(page);
    }
}

function toggleSubmenu(submenuId) {
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.display = submenu.id === submenuId ?
            (submenu.style.display === 'block' ? 'none' : 'block') : 'none';
    });
}

function hideAllSubmenus() {
    document.querySelectorAll('.submenu').forEach(submenu => submenu.style.display = 'none');
}

const loadedScripts = new Set();
const renderCache = new Map();

function renderPage(page) {
    const pageContent = window['render']();
    renderCache.set(page, pageContent);
    const content = document.getElementById('content');
    content.innerHTML = pageContent;
    content.className = 'fade-in';
}

function loadPage(page) {
    if (page === 'home') hideAllSubmenus();

    const content = document.getElementById('content');
    content.className = 'fade-out';
    content.innerHTML = "<p>Chargement...</p>";

    if (renderCache.has(page)) {
        content.innerHTML = renderCache.get(page);
        content.className = 'fade-in';
        return;
    }

    const scriptSrc = `pages/${page}.js`;

    if (loadedScripts.has(scriptSrc)) {
        renderPage(page);
    } else {
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.onload = () => renderPage(page);
        document.body.appendChild(script);
        loadedScripts.add(scriptSrc);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateSideBar();
    loadPage('home');
});