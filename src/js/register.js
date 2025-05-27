
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const gamerName = document.getElementById("gameName").value;
    const password = document.getElementById("password").value;
    const termsAccepted = document.getElementById("terms").checked;

    if (!termsAccepted) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    const userData = {
        nombre: firstName,
        apellido: lastName,
        gamerName: gamerName,
        email: email,
        password: password
    };

    fetch(`${API_BASE_URL}/api/usuarios/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Registration failed");
        }
    })
    .then(data => {
        Swal.fire({
            icon:'success',
            title: 'Registration successful',
            text: 'You can now log in.'
        }).then(() => {
            window.location.href = "Login.html"; // Redirect to login page
        });
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Register failed',
            text: error.message
        });
    });
});

//Comment