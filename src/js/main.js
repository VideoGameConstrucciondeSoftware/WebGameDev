// Función para cargar un componente HTML en un contenedor
function loadComponent(containerId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Error al cargar el componente ${componentPath}:`, error));
}

// Cargar el componente header.html
loadComponent('header-container', './src/components/header.html');
loadComponent('home-container', './src/home.html');
loadComponent('aboutUs-container', './src/about.html');
loadComponent('ourTeam-container', './src/OurTeam.html');
loadComponent('Technologies-container', './src/Tecnologies.html');
loadComponent('contactUs-container', './src/contacts.html');
loadComponent('footer-container', './src/components/footer.html');
loadComponent('GamePage-container', './src/components/GamePageBar.html');
