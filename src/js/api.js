class ApiClient {
    constructor() {
        this.controller = null;
    }

    async sendMessage(message, systemPrompt) {
        const apiUrl = document.getElementById('apiUrl').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const model = document.getElementById('model').value;

        if (!apiKey) {
            throw new Error('请输入 API Key');
        }

        this.controller = new AbortController();

        try {
            const response = await fetch(`${apiUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    stream: false
                }),
                signal: this.controller.signal
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || '请求失败');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } finally {
            this.controller = null;
        }
    }

    stopGeneration() {
        if (this.controller) {
            this.controller.abort();
            this.controller = null;
        }
    }
} 