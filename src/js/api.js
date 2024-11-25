class ApiClient {
    constructor() {
        this.controller = null;
        this.retryCount = 3;
        this.retryDelay = 1000;
    }

    async sendMessage(message, systemPrompt) {
        const apiUrl = window.Config.API_URL;
        const apiKey = window.Config.API_KEY;
        const model = document.getElementById('model').value;

        this.controller = new AbortController();

        for (let attempt = 0; attempt < this.retryCount; attempt++) {
            try {
                const response = await this.makeRequest(apiUrl, apiKey, model, message, systemPrompt);
                return response;
            } catch (error) {
                if (error.name === 'AbortError') {
                    throw new Error('请求已取消');
                }
                
                if (attempt === this.retryCount - 1) {
                    throw error;
                }
                
                await this.delay(this.retryDelay * Math.pow(2, attempt));
            }
        }
    }

    async makeRequest(apiUrl, apiKey, model, message, systemPrompt) {
        const response = await fetch(`${apiUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                temperature: 0.7,
                stream: false
            }),
            signal: this.controller.signal
        });

        if (!response.ok) {
            const error = await response.json();
            throw new ApiError(error.error?.message || '请求失败', response.status);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    stopGeneration() {
        if (this.controller) {
            this.controller.abort();
            this.controller = null;
        }
    }

    saveApiSettings() {
        const apiUrl = document.getElementById('apiUrl').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        
        if (apiUrl) {
            localStorage.setItem('apiUrl', apiUrl);
        }
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey);
        }
        alert('API 设置已保存！');
    }
}

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

window.apiClient = new ApiClient(); 