const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotPanel = document.getElementById('chatbot-panel');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

chatbotBtn.addEventListener('click', () => {
    chatbotPanel.style.display = chatbotPanel.style.display === 'flex' ? 'none' : 'flex';
});

closeChatbot.addEventListener('click', () => {
    chatbotPanel.style.display = 'none';
});

chatbotForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userMsg = chatbotInput.value.trim();
    if (!userMsg) return;

    appendMessage('Tú', userMsg, 'user');
    chatbotInput.value = '';
    chatbotInput.disabled = true;

    try {
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCp873319-ShuUYz6XtTD-4zHXarrcVUK0';
        const data = '{"contents": [{"parts":[{"text": "'+userMsg+'"}]}]}'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
        const resp = JSON.parse(await response.text());
        appendMessage('Gemini', resp.candidates[0].content.parts[0].text || 'Sin respuesta', 'bot');
    } catch (err) {
        appendMessage('Gemini', 'Hubo un error al conectar con el chatbot.', 'bot');
    }
    chatbotInput.disabled = false;
    chatbotInput.focus();
});

function appendMessage(sender, text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-msg ' + type;
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}