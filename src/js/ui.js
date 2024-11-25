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
        
        // 使用 marked 处理 Markdown
        if (role === 'ai') {
            messageDiv.innerHTML = marked.parse(content);
            // 代码高亮
            messageDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        } else {
            messageDiv.textContent = content;
        }

        this.chatWindow.appendChild(messageDiv);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }

    setLoading(isLoading) {
        this.messageInput.disabled = isLoading;
        this.sendButton.disabled = isLoading;
        this.stopButton.disabled = !isLoading;
    }

    clearInput() {
        this.messageInput.value = '';
    }

    getMessage() {
        return this.messageInput.value.trim();
    }
}

function toggleSettings() {
    const settings = document.getElementById('settings');
    settings.classList.toggle('visible');
}

// 保存设置到 localStorage
function saveSettings() {
    const settings = {
        apiUrl: document.getElementById('apiUrl').value,
        apiKey: document.getElementById('apiKey').value,
        model: document.getElementById('model').value,
        systemPrompt: document.getElementById('systemPrompt').value
    };
    localStorage.setItem('chatSettings', JSON.stringify(settings));
}

// 加载设置
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('chatSettings') || '{}');
    if (settings.apiUrl) document.getElementById('apiUrl').value = settings.apiUrl;
    if (settings.apiKey) document.getElementById('apiKey').value = settings.apiKey;
    if (settings.model) document.getElementById('model').value = settings.model;
    if (settings.systemPrompt) document.getElementById('systemPrompt').value = settings.systemPrompt;
}

// 页面加载时加载设置
document.addEventListener('DOMContentLoaded', loadSettings);

// 设置改变时保存
['apiUrl', 'apiKey', 'model', 'systemPrompt'].forEach(id => {
    document.getElementById(id).addEventListener('change', saveSettings);
}); 