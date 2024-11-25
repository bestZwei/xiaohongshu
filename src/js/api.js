class ApiClient {
    constructor() {
        this.controller = null;
    }

    async sendMessage(message, systemPrompt) {
        const apiUrl = window.Config.API_URL;
        const apiKey = window.Config.API_KEY;
        const model = document.getElementById('model').value;

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

window.apiClient = new ApiClient(); 