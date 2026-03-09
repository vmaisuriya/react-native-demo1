document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.getElementById('page-title');
    const tooltips = document.querySelectorAll('.tooltip');

    // Sidebar Toggle Logic
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');

        // Toggle tooltips visibility based on collapsed state
        tooltips.forEach(t => {
            if (isCollapsed) {
                t.classList.remove('hidden');
                t.classList.add('opacity-0'); // Start invisible for hover effect
            } else {
                t.classList.add('hidden');
                t.classList.remove('opacity-0');
            }
        });

        // Handle Sidebar Text Visibility
        const texts = sidebar.querySelectorAll('.nav-text, .logo-text');
        texts.forEach(text => {
            if (isCollapsed) {
                text.classList.add('hidden');
            } else {
                text.classList.remove('hidden');
            }
        });
    });

    // Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all
            navItems.forEach(nav => {
                nav.classList.remove('active', 'bg-slate-700', 'text-white');
                nav.querySelector('i').classList.remove('text-brand-400');
                nav.querySelector('i').classList.add('text-gray-400');
            });

            // Add active class to clicked
            item.classList.add('active', 'bg-slate-700', 'text-white');
            item.querySelector('i').classList.remove('text-gray-400');
            item.querySelector('i').classList.add('text-brand-400');

            // Handle Content Switching (Iframe)
            const targetId = item.getAttribute('data-target');
            const workflowFrame = document.getElementById('workflow-frame');

            if (workflowFrame) {
                // Map target IDs to filenames
                let filename = '';
                switch (targetId) {
                    case 'builder':
                        filename = 'builder.html';
                        break;
                    case 'groover':
                        filename = 'groover.html';
                        break;
                    case 'packer':
                        filename = 'packer.html';
                        break;
                    case 'packer-2':
                        filename = 'packer-2.html';
                        break;
                    case 'bluezone':
                        filename = 'BlueZoneReplenishment.html';
                        break;
                    case 'bluezone-tv':
                        filename = 'bluezone-tv-dashboard.html';
                        break;
                    case 'builder-tv':
                        filename = 'builder-tv-dashboard.html';
                        break;
                    case 'groover-tv':
                        filename = 'groover-tv-dashboard.html';
                        break;
                    case 'packer-tv':
                        filename = 'packer-tv-dashboard.html';
                        break;
                    case 'ops-tv':
                        filename = 'operations-tv-dashboard.html';
                        break;
                    case 'ops-2-tv':
                        filename = 'operations-2-tv-dashboard.html';
                        break;
                    default:
                        // Default fallback
                        filename = 'about:blank';
                }

                if (filename) {
                    workflowFrame.src = filename;
                }

                // Update Title
                if (pageTitle) {
                    pageTitle.textContent = item.querySelector('.nav-text').textContent;
                }
            }
        });
    });

    // Initialize Tooltips state based on initial sidebar state (expanded)
    tooltips.forEach(t => t.classList.add('hidden'));
});
