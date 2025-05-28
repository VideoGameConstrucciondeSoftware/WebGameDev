const apiUrl = `${API_BASE_URL}/api/faq`;

document.addEventListener('DOMContentLoaded', function () {
    const faqContainer = document.getElementById('faq-container');
    const searchInput = document.querySelector('.faq-search');
    let faqs = [];

    function fetchFaqs() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los FAQs');
                }
                return response.json();
            })
            .then(data => {
                faqs = data;
                renderFaqs(faqs);
            })
            .catch(error => {
                faqContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
            });
    }

    function renderFaqs(faqList) {
        faqContainer.innerHTML = '';
        if (!faqList.length) {
            faqContainer.innerHTML = '<p>No se encontraron FAQs.</p>';
            return;
        }
        faqList.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <h4 class="faq-pregunta" style="cursor:pointer;">${faq.pregunta} <span style="font-size:0.8em;">▼</span></h4>
                <div class="faq-respuesta" style="display:none;">${faq.respuesta}</div>
            `;
            faqItem.querySelector('.faq-pregunta').addEventListener('click', function () {
                const respuesta = faqItem.querySelector('.faq-respuesta');
                respuesta.style.display = respuesta.style.display === 'none' ? 'block' : 'none';
            });
            faqContainer.appendChild(faqItem);
        });
    }

    function searchFaqs() {
        const searchValue = searchInput.value.trim().toLowerCase();
        if (!searchValue) {
            renderFaqs(faqs);
            return;
        }
        const filtered = faqs.filter(faq => faq.pregunta && faq.pregunta.toLowerCase().includes(searchValue));
        renderFaqs(filtered);
    }

    searchInput.addEventListener('input', searchFaqs);

    fetchFaqs();
});