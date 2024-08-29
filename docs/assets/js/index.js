const loadedScripts = new Set();
const renderCache = new Map();

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
    },
    {
        title: 'Cisco Packet Tracer', icon: 'fa-solid fa-network-wired',
        subcategories: [
            {title: "Configurer un routeur", page: 'cisco_packet/config_router'},
            {title: "Configurer un switch", page: 'cisco_packet/config_switch'},
            {title: "Mise en place du SSH", page: 'cisco_packet/setup_ssh'},
            {title: "Mise en place des ACL", page: 'cisco_packet/setup_acl'}
        ]
    }
];

const generateSideBar = () => {
    const sidebar = document.querySelector('.sidebar .menu');
    sidebar.innerHTML = categories.map((category, index) => `
        <li>
            <button class="menu-btn" onclick="handleMenuClick(this, '${category.page}', ${!!category.subcategories}, 'submenu${index}')"
                ${category.page === 'home' ? 'data-active="true"' : ''}>
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

const toggleSubmenu = (submenuId) => {
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.display = submenu.id === submenuId ?
            (submenu.style.display === 'block' ? 'none' : 'block') : 'none';
    });
}

const handleMenuClick = (button, page, hasSubmenu, submenuId) => {
    document.querySelectorAll('.menu-btn').forEach(btn => btn.removeAttribute('data-active'));
    button.setAttribute('data-active', 'true');
    if (hasSubmenu) {
        toggleSubmenu(submenuId);
    } else {
        loadPage(page);
    }
}

const hideAllSubmenus = () => document.querySelectorAll('.submenu').forEach(submenu => submenu.style.display = 'none');

const loadScript = (scriptSrc, onload, onerror) => {
    if (loadedScripts.has(scriptSrc)) return onload();

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.onload = onload;
    script.onerror = onerror;
    document.body.appendChild(script);
    loadedScripts.add(scriptSrc);
}

const renderPage = (page, content) => {
    const pageContent = window['render']();
    renderCache.set(page, pageContent);
    content.innerHTML = pageContent;
    content.className = 'fade-in';
};

const loadErrorPage = content => loadScript('pages/error.js', () => renderPage('error', content));

const loadPage = (page) => {
    const content = document.getElementById('content');

    if (page === 'home') hideAllSubmenus();

    content.className = 'fade-out';
    content.innerHTML = "<p>Chargement...</p>";

    if (renderCache.has(page)) {
        content.innerHTML = renderCache.get(page);
        content.className = 'fade-in';
    } else {
        loadScript(`pages/${page}.js`,
            () => renderPage(page, content),
            () => loadErrorPage(content)
        );
    }
};

document.addEventListener('DOMContentLoaded', () => {
    generateSideBar();
    loadPage('home');
});