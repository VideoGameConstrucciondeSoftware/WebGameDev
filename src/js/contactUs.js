function showToast(message, type = 'success') {
    let toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100); // Fade in
    setTimeout(() => {
        toast.classList.remove('show'); // Fade out
        setTimeout(() => document.body.removeChild(toast), 400);
    }, 3000);
}


async function enviarContacto(contacto) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/contacto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            const data = await response.json();
            showToast(data.message, 'success'); // Mensaje de éxito
        } else {
            const error = await response.json();
            showToast('Error: ' + (error.message || 'No se pudo enviar el mensaje.'), 'error');
        }
    } catch (err) {
        showToast('Error de red: ' + err.message, 'error');
    }
}

function conectarFormularioContacto() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const contacto = {
                FirstName: document.getElementById('first-name').value,
                LastName: document.getElementById('last-name').value,
                correo: document.getElementById('email').value,
                company: document.getElementById('company').value,
                country: document.getElementById('country').value,
                mensaje: document.getElementById('mensaje').value
            };

            localStorage.setItem('contacto', JSON.stringify(contacto));
            enviarContacto(contacto);
        });
    }
}
