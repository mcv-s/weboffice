/*
 * =========================================================
 * menu_bar.js
 *
 * Handles the document editor's application/menu bar:
 *
 * - Ribbon tab switching
 * - Formatting
 * - Font family
 * - Font size
 * - Undo / Redo
 * - Cut / Copy / Paste
 * - Insert commands
 * - Drawing commands
 * - Layout commands
 * - References
 * - Review
 * - View / Zoom
 *
 * Does NOT contain sidebar logic.
 * =========================================================
 */

(function () {

    /*
     * =========================================================
     * Ribbon tabs
     * =========================================================
     */

    function initializeRibbonTabs() {

        const tabs =
            document.querySelectorAll(".ribbon-tab");

        const sections = {
            home:
                document.querySelectorAll(".home-section"),

            insert:
                document.querySelectorAll(".insert-section"),

            draw:
                document.querySelectorAll(".draw-section"),

            layout:
                document.querySelectorAll(".layout-section"),

            references:
                document.querySelectorAll(".references-section"),

            review:
                document.querySelectorAll(".review-section"),

            view:
                document.querySelectorAll(".view-section")
        };

        tabs.forEach(tab => {

            tab.addEventListener("click", () => {

                const selectedTab =
                    tab.dataset.tab;

                tabs.forEach(item => {
                    item.classList.remove("active");
                });

                tab.classList.add("active");

                Object.keys(sections).forEach(
                    sectionName => {

                        sections[sectionName]
                            .forEach(section => {

                                section.style.display =
                                    sectionName === selectedTab
                                        ? ""
                                        : "none";

                            });

                    }
                );

            });

        });

    }


    /*
     * =========================================================
     * Document formatting
     * =========================================================
     */

    window.format = function (command, value = null) {

        const documentElement =
            document.getElementById("document");

        if (!documentElement) {
            return;
        }

        documentElement.focus();

        document.execCommand(
            command,
            false,
            value
        );

        updateWordCount();

    };


    /*
     * =========================================================
     * Font family
     * =========================================================
     */

    function initializeFontFamily() {

        const fontFamily =
            document.getElementById("fontFamily");

        if (!fontFamily) {
            return;
        }

        fontFamily.addEventListener(
            "change",
            () => {

                format(
                    "fontName",
                    fontFamily.value
                );

            }
        );

    }


    /*
     * =========================================================
     * Font size
     * =========================================================
     */

    function initializeFontSize() {

        const fontSize =
            document.getElementById("fontSize");

        if (!fontSize) {
            return;
        }

        fontSize.addEventListener(
            "change",
            () => {

                format(
                    "fontSize",
                    fontSize.value
                );

            }
        );

    }


    /*
     * =========================================================
     * Word count
     * =========================================================
     */

    function updateWordCount() {

        const documentElement =
            document.getElementById("document");

        const wordCount =
            document.getElementById("wordCount");

        if (!documentElement || !wordCount) {
            return;
        }

        const text =
            documentElement.innerText
                .trim();

        if (!text) {

            wordCount.textContent =
                "0 words";

            return;
        }

        const words =
            text.split(/\s+/).filter(Boolean);

        wordCount.textContent =
            `${words.length} words`;

    }


    /*
     * =========================================================
     * Undo / Redo
     * =========================================================
     */

    function initializeUndoRedo() {

        const undoTop =
            document.getElementById("undoTop");

        const redoTop =
            document.getElementById("redoTop");

        if (undoTop) {

            undoTop.addEventListener(
                "click",
                () => format("undo")
            );

        }

        if (redoTop) {

            redoTop.addEventListener(
                "click",
                () => format("redo")
            );

        }

    }


    /*
     * =========================================================
     * Save
     * =========================================================
     */

    function initializeSave() {

        const saveButton =
            document.getElementById("saveButton");

        if (!saveButton) {
            return;
        }

        saveButton.addEventListener(
            "click",
            () => {

                if (
                    typeof window.saveDocument ===
                    "function"
                ) {

                    window.saveDocument();

                }

            }
        );

    }


    /*
     * =========================================================
     * Cut / Copy / Paste
     * =========================================================
     */

    function initializeClipboard() {

        const buttons =
            document.querySelectorAll(
                ".ribbon-button"
            );

        /*
         * Clipboard buttons already use
         * inline onclick handlers in the
         * original HTML.
         *
         * Nothing else is needed here.
         */

    }


    /*
     * =========================================================
     * Document input
     * =========================================================
     */

    function initializeDocument() {

        const documentElement =
            document.getElementById("document");

        if (!documentElement) {
            return;
        }

        documentElement.addEventListener(
            "input",
            updateWordCount
        );

        updateWordCount();

    }


    /*
     * =========================================================
     * Initialization
     * =========================================================
     */

    function initializeMenuBar() {

        initializeRibbonTabs();

        initializeFontFamily();

        initializeFontSize();

        initializeUndoRedo();

        initializeSave();

        initializeClipboard();

        initializeDocument();

    }


    /*
     * =========================================================
     * Public API
     * =========================================================
     */

    window.MenuBar = {

        initialize:
            initializeMenuBar,

        updateWordCount:
            updateWordCount

    };


    /*
     * =========================================================
     * Initialize after DOM is ready
     * =========================================================
     */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeMenuBar
        );

    } else {

        initializeMenuBar();

    }

})();