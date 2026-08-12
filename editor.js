/* =========================================================
   editor.js
   Document Editor page logic.
   ========================================================= */

let sidebarLoaded = false;
let sidebarLoading = null;

const sidebarContainer = document.getElementById("sidebarContainer");
const hamburgerButton = document.getElementById("hamburgerButton");

async function loadSidebar() {
    if (sidebarLoaded) return;
    if (sidebarLoading) return sidebarLoading;

    sidebarLoading = (async () => {
        try {
            const response = await fetch("sidebar/sidebar.html");

            if (!response.ok) {
                throw new Error(
                    `Failed to load sidebar.html: ${response.status}`
                );
            }

            sidebarContainer.innerHTML = await response.text();
            sidebarLoaded = true;

            if (window.Sidebar) {
                window.Sidebar.initialize();
            }

            const sidebarSave = document.getElementById("sidebarSave");

            if (sidebarSave) {
                sidebarSave.addEventListener("click", () => {
                    saveDocument();
                    window.Sidebar.close();
                });
            }
        } catch (error) {
            console.error("Could not load sidebar:", error);
        } finally {
            sidebarLoading = null;
        }
    })();

    return sidebarLoading;
}

hamburgerButton.addEventListener("click", async () => {
    await loadSidebar();
    window.Sidebar?.open();
});