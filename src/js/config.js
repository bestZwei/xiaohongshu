class Config {
    static getEnvVariable(key, defaultValue = '') {
        if (!window.ENV) {
            window.ENV = {
                VITE_API_URL: 'https://duck.cool.us.kg',
                VITE_API_KEY: 'sk-vduck',
                VITE_SYSTEM_PROMPT: '测试',
                VITE_MODEL_LIST: 'llama-3.1-70b,claude-3-haiku,gpt-4o-mini',
                VITE_DEFAULT_MODEL: 'llama-3.1-70b'
            };
        }
        return window.ENV[key] || defaultValue;
    }

    static get API_URL() {
        return this.getEnvVariable('VITE_API_URL', 'https://duck.cool.us.kg');
    }

    static get API_KEY() {
        return this.getEnvVariable('VITE_API_KEY', 'sk-vduck');
    }

    static get SYSTEM_PROMPT() {
        return this.getEnvVariable('VITE_SYSTEM_PROMPT', '测试');
    }

    static get MODEL_LIST() {
        const modelString = this.getEnvVariable('VITE_MODEL_LIST', 'llama-3.1-70b,claude-3-haiku,gpt-4o-mini');
        return modelString.split(',').map(model => model.trim());
    }

    static get DEFAULT_MODEL() {
        return this.getEnvVariable('VITE_DEFAULT_MODEL', 'llama-3.1-70b');
    }
}

window.Config = Config; 