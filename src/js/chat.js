const apiClient = new ApiClient();
const chatUI = new ChatUI();

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (!message) return;

    const chatUI = window.chatUI;
    const apiClient = window.apiClient;

    try {
        chatUI.setLoading(true);
        chatUI.appendMessage('user', message);
        messageInput.value = '';

        const systemPrompt = window.Config.SYSTEM_PROMPT;
        const response = await apiClient.sendMessage(message, systemPrompt);
        chatUI.appendMessage('ai', response);
    } catch (error) {
        chatUI.appendMessage('system', `错误：${error.message}`);
    } finally {
        chatUI.setLoading(false);
    }
}

function stopGeneration() {
    apiClient.stopGeneration();
    chatUI.appendMessage('system', '已停止生成');
}

// 添加回车发送功能
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}); 