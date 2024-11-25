const apiClient = new ApiClient();
const chatUI = new ChatUI();

async function sendMessage() {
    const message = chatUI.getMessage();
    if (!message) return;

    chatUI.setLoading(true);
    chatUI.appendMessage('user', message);
    chatUI.clearInput();

    try {
        const systemPrompt = document.getElementById('systemPrompt').value;
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