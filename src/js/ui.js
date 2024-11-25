class ChatUI {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.messages = [];
    }

    initializeElements() {
        this.messageInput = document.getElementById('messageInput');
        this.chatWindow = document.getElementById('chatWindow');
        this.sendButton = document.getElementById('sendButton');
        this.stopButton = document.getElementById('stopButton');
    }

    bindEvents() {
        this.messageInput.addEventListener('input', this.autoResizeTextarea.bind(this));
        this.messageInput.addEventListener('keypress', this.handleKeyPress.bind(this));
    }

    appendMessage(role, content, timestamp = new Date()) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = this.formatTime(timestamp);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(timeSpan);
        messageDiv.appendChild(contentDiv);
        
        this.chatWindow.appendChild(messageDiv);
        this.scrollToBottom();
        
        // 存储消息
        this.messages.push({ role, content, timestamp });
    }

    formatTime(date) {
        return date.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
        });
    }

    autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            window.sendMessage();
        }
    }

    setLoading(isLoading) {
        this.messageInput.disabled = isLoading;
        this.sendButton.disabled = isLoading;
        this.stopButton.disabled = !isLoading;
        
        if (isLoading) {
            this.sendButton.innerHTML = '<span class="loading-spinner"></span>';
        } else {
            this.sendButton.textContent = '发送';
        }
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