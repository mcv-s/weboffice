/* =========================================================
   sidebar.js
   Reusable application sidebar.

   Handles:
   - Open / close
   - Animation
   - Overlay
   - Click-outside-to-close
   - Escape-to-close
   - Theme
   ========================================================= */

(function () {
    let initialized = false;

    function elements() {
        return {
            sidebar: document.getElementById("appSidebar"),
            overlay: document.getElementById("sidebarOverlay"),
            closeButton: document.getElementById("sidebarClose"),
            themeToggle: document.getElementById("themeToggle")
        };
    }

    function open() {
        const { sidebar, overlay } = elements();

        if (!sidebar) return;

        sidebar.classList.remove("open");
        overlay?.classList.remove("visible");
        overlay?.setAttribute("aria-hidden", "true");

        void sidebar.offsetWidth;

        requestAnimationFrame(() => {
            sidebar.classList.add("open");

            if (overlay) {
                overlay.classList.add("visible");
                overlay.setAttribute("aria-hidden", "false");
            }
        });
    }

    function close() {
        const { sidebar, overlay } = elements();

        sidebar?.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("visible");
            overlay.setAttribute("aria-hidden", "true");
        }
    }

    function toggle() {
        const sidebar = document.getElementById("appSidebar");

        if (sidebar?.classList.contains("open")) {
            close();
        } else {
            open();
        }
    }

    function initialize() {
        if (initialized) return;

        const { sidebar, overlay, closeButton, themeToggle } = elements();

        if (!sidebar) {
            console.error("Sidebar: #appSidebar not found.");
            return;
        }

        closeButton?.addEventListener("click", close);
        overlay?.addEventListener("click", close);
        themeToggle?.addEventListener("click", toggleTheme);

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") close();
        });

        initialized = true;
    }

    function getCurrentTheme() {
        const theme = document.documentElement.dataset.theme;

        if (theme === "light" || theme === "dark") {
            return theme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function setTheme(theme) {
        if (theme !== "light" && theme !== "dark") return;

        document.documentElement.dataset.theme = theme;

        localStorage.setItem(
            "markdown-editor-theme",
            theme
        );
    }

    function toggleTheme() {
        setTheme(
            getCurrentTheme() === "dark"
                ? "light"
                : "dark"
        );
    }

    function loadTheme() {
        const saved = localStorage.getItem(
            "markdown-editor-theme"
        );

        if (saved === "light" || saved === "dark") {
            setTheme(saved);
            return;
        }

        setTheme(
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        );
    }

    loadTheme();

    window.Sidebar = {
        initialize,
        open,
        close,
        toggle,
        toggleTheme,
        getTheme: getCurrentTheme,
        setTheme
    };
})();