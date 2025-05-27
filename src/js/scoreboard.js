import { API_BASE_URL } from './config.js';

async function cargarScoreboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/scoreboard`);
        const data = await response.json();
        const podiumIds = [
            { div: ".podium-member2", idx: 0 }, // 1er lugar
            { div: ".podium-member1", idx: 1 }, // 2do lugar
            { div: ".podium-member3", idx: 2 }  // 3er lugar
        ];

        podiumIds.forEach((p, i) => {
            const member = data[p.idx];
            if (member && member.imagen) {
                const podiumDiv = document.querySelector(p.div);
                if (podiumDiv) {
                    const img = podiumDiv.querySelector("img");
                    img.src = `data:image/jpeg;base64,${member.imagen}`;
                    img.alt = member.nombre;
                    // Cambiar el nombre, puntos y agregar badge de posición
                    const nameDiv = podiumDiv.querySelector("div");
                    if (nameDiv) {
                        let positionText = "";
                        if (i === 0) positionText = "🥇 1er Lugar";
                        else if (i === 1) positionText = "🥈 2do Lugar";
                        else if (i === 2) positionText = "🥉 3er Lugar";
                        nameDiv.innerHTML = `
                            <strong>${member.nombre}</strong><br>
                            <small>${member.puntos} pts</small>
                            <div class="podium-badge">${positionText}</div>
                        `;
                    }
                }
            }
        });

        // Generar la tabla
        let html = `
            <table class="scoreboard-table">
                <thead>
                    <tr>
                        <th>Top</th>
                        <th>Nombre</th>
                        <th>Puntos</th>
                        <th>Nivel Máximo</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(item => {
            html += `
                <tr>
                    <td>${item.top}</td>
                    <td>${item.nombre}</td>
                    <td>${item.puntos}</td>
                    <td>${item.nivelMaximo}</td>
                    <td>${item.fecha}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        document.getElementById('scoreboard').innerHTML = html;
    } catch (error) {
        document.getElementById('scoreboard').innerHTML = 'Error al cargar el scoreboard.';
        console.error(error);
    }
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarScoreboard);