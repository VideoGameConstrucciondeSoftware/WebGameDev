function loadComponent(containerId, componentPath, callback) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(`Error al cargar el componente ${componentPath}:`, error));
}


document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-btn");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("expanded");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const notificationBtn = document.getElementById("notification-btn");
    const notificationPanel = document.getElementById("notification-panel");
    const popup = document.getElementById("popup");
    const popupFrom = document.getElementById("popup-from");
    const popupMessage = document.getElementById("popup-message");
    const closeBtn = document.getElementById("close-btn");


    // Toggle notification panel
    notificationBtn.addEventListener("click", () => {
        notificationPanel.style.display =
            notificationPanel.style.display === "block" ? "none" : "block";
    });

    // Show popup on message click
    document.querySelectorAll(".message").forEach((message) => {
        message.addEventListener("click", () => {
            const from = message.getAttribute("data-from");
            const msg = message.getAttribute("id-message");

            popupFrom.textContent = from;
            popupMessage.textContent = msg;

            popup.style.display = "flex";
        });
    });

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    loadComponent('chatbot-container', './src/components/chatBot.html', function() {
        const script = document.createElement('script');
        script.src = '/src/js/chatBot.js';
        document.body.appendChild(script);
    });

});