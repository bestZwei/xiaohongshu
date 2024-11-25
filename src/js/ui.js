class ChatUI {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.chatWindow = document.getElementById('chatWindow');
        this.sendButton = document.getElementById('sendButton');
        this.stopButton = document.getElementById('stopButton');
    }

    appendMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        messageDiv.textContent = content;
        this.chatWindow.appendChild(messageDiv);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }

    setLoading(isLoading) {
        this.messageInput.disabled = isLoading;
        this.sendButton.disabled = isLoading;
        this.stopButton.disabled = !isLoading;
    }
}

// 创建全局 UI 实例
window.chatUI = new ChatUI();

// 设置切换函数
window.toggleSettings = function() {
    const settings = document.getElementById('settings');
    settings.classList.toggle('visible');
}

// 添加回车发送功能
document.getElementById('messageInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}); 