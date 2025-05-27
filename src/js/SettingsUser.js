import { API_BASE_URL } from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".profile-form");
  const profilePicInput = document.getElementById("profile-pic-input");
  const profileImg = document.getElementById("profile-img");
  const gamerNameInput = document.getElementById("gamername");
  const passwordInput = document.getElementById("current-password");
  const togglePasswordBtn = document.getElementById("toggle-password");


  let base64Image = "";

  // Cargar datos actuales del usuario
  async function cargarDatosUsuario() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/api/settingsUser/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("No se pudieron cargar los datos.");
      const data = await response.json();
      if (data.gamerName) gamerNameInput.value = data.gamerName;
      // No mostrar la contraseña por seguridad, pero puedes dejar el campo vacío
      if (data.imagen) {
        profileImg.src = `data:image/jpeg;base64,${data.imagen}`;
        base64Image = data.imagen;
      }
    } catch (error) {
      console.error(error);
    }
  }

  cargarDatosUsuario();

  // Convertir imagen a base64 cuando se selecciona
  profilePicInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      base64Image = await toBase64(file);
      profileImg.src = URL.createObjectURL(file); // Mostrar imagen cargada
    }
  });

  // Mostrar/ocultar contraseña
  togglePasswordBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordBtn.textContent = "🙈";
    } else {
      passwordInput.type = "password";
      togglePasswordBtn.textContent = "👁️";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const gamerName = document.getElementById("gamername").value;
    const password = document.getElementById("current-password").value;
    const token = localStorage.getItem("token"); // JWT guardado

    const data = {
      GamerName: gamerName || null,
      Password: password || null,
      Image: base64Image || null
    };
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(`${API_BASE_URL}/api/settingsUser/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Error al actualizar el perfil");

      const result = await response.text();
      alert(result); // Mostrar mensaje del backend
    } catch (error) {
      alert(error.message);
    }
  });
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
}
