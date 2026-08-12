/*
 * =========================================================
 * sidebar.js
 *
 * Reusable application sidebar.
 *
 * Handles:
 *   - Open / close
 *   - Smooth opening animation
 *   - Dark page overlay
 *   - Click-outside-to-close
 *   - Escape-to-close
 *   - Theme toggle
 *
 * Does NOT contain editor-specific logic.
 * =========================================================
 */

(function () {

    function initializeSidebar() {

        const sidebar =
            document.getElementById("appSidebar");

        const overlay =
            document.getElementById("sidebarOverlay");

        const hamburger =
            document.getElementById("hamburgerButton");

        const closeButton =
            document.getElementById("sidebarClose");

        const themeToggle =
            document.getElementById("themeToggle");


        /*
         * =====================================================
         * Validation
         * =====================================================
         */

        if (!sidebar) {

            console.error(
                "Sidebar: #appSidebar not found."
            );

            return;

        }


        /*
         * =====================================================
         * Sidebar
         * =====================================================
         */

        function openSidebar() {

            /*
             * Make sure the sidebar begins in its closed state.
             */
            sidebar.classList.remove("open");


            /*
             * Make sure the overlay begins hidden.
             */
            if (overlay) {

                overlay.classList.remove("visible");

                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            /*
             * Force the browser to render the closed
             * state before opening.
             *
             * This guarantees the animation also works
             * on the very first opening.
             */
            void sidebar.offsetWidth;


            /*
             * Open on the next animation frame.
             */
            requestAnimationFrame(() => {

                sidebar.classList.add("open");


                /*
                 * Darken the rest of the page.
                 */
                if (overlay) {

                    overlay.classList.add("visible");

                    overlay.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }

            });

        }


        function closeSidebar() {

            sidebar.classList.remove("open");


            /*
             * Remove the dark page overlay.
             */
            if (overlay) {

                overlay.classList.remove("visible");

                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

        }


        function toggleSidebar() {

            if (
                sidebar.classList.contains("open")
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }


        /*
         * =====================================================
         * Hamburger
         * =====================================================
         */

        if (hamburger) {

            hamburger.addEventListener(
                "click",
                toggleSidebar
            );

        }


        /*
         * =====================================================
         * Close button
         * =====================================================
         */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeSidebar
            );

        }


        /*
         * =====================================================
         * Click outside sidebar
         * =====================================================
         *
         * The overlay covers the rest of the page.
         * Clicking it closes the sidebar.
         */

        if (overlay) {

            overlay.addEventListener(
                "click",
                closeSidebar
            );

        }


        /*
         * =====================================================
         * Escape
         * =====================================================
         */

        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    closeSidebar();

                }

            }
        );


        /*
         * =====================================================
         * Theme
         * =====================================================
         */

        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                toggleTheme
            );

        }

    }


    /*
     * =========================================================
     * Theme functions
     * =========================================================
     */

    function getCurrentTheme() {

        const current =
            document.documentElement.dataset.theme;

        if (
            current === "light" ||
            current === "dark"
        ) {

            return current;

        }


        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light";

    }


    function setTheme(theme) {

        if (
            theme !== "light" &&
            theme !== "dark"
        ) {

            return;

        }


        document.documentElement.dataset.theme =
            theme;


        localStorage.setItem(
            "markdown-editor-theme",
            theme
        );

    }


    function toggleTheme() {

        const current =
            getCurrentTheme();

        const next =
            current === "dark"
                ? "light"
                : "dark";

        setTheme(next);

    }


    /*
     * =========================================================
     * Load saved theme
     * =========================================================
     */

    const savedTheme =
        localStorage.getItem(
            "markdown-editor-theme"
        );


    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {

        document.documentElement.dataset.theme =
            savedTheme;

    } else {

        const systemDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;


        document.documentElement.dataset.theme =
            systemDark
                ? "dark"
                : "light";

    }


    /*
     * =========================================================
     * Public API
     * =========================================================
     */

    window.Sidebar = {

        initialize: initializeSidebar,


        open: function () {

            const sidebar =
                document.getElementById("appSidebar");

            const overlay =
                document.getElementById("sidebarOverlay");


            if (!sidebar) {
                return;
            }


            sidebar.classList.remove("open");


            if (overlay) {

                overlay.classList.remove("visible");

                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            /*
             * Force initial closed render.
             */
            void sidebar.offsetWidth;


            requestAnimationFrame(() => {

                sidebar.classList.add("open");

                if (overlay) {

                    overlay.classList.add("visible");

                    overlay.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }

            });

        },


        close: function () {

            const sidebar =
                document.getElementById("appSidebar");

            const overlay =
                document.getElementById("sidebarOverlay");


            if (sidebar) {

                sidebar.classList.remove("open");

            }


            if (overlay) {

                overlay.classList.remove("visible");

                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

        },


        toggleTheme: toggleTheme,

        getTheme: getCurrentTheme,

        setTheme: setTheme

    };

})();