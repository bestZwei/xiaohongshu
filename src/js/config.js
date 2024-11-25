class Config {
    static getEnvVariable(key, defaultValue = '') {
        // 尝试从环境变量中获取值
        const value = window.ENV && window.ENV[key];
        return value || defaultValue;
    }

    static get API_URL() {
        return this.getEnvVariable('VITE_API_URL', 'https://api.openai.com/v1');
    }

    static get API_KEY() {
        return this.getEnvVariable('VITE_API_KEY', '');
    }

    static get SYSTEM_PROMPT() {
        return this.getEnvVariable('VITE_SYSTEM_PROMPT', '你是一个有帮助的AI助手。');
    }

    static get MODEL_LIST() {
        const modelString = this.getEnvVariable('VITE_MODEL_LIST', 'llama-3.1-70b,claude-3-haiku,gpt-4o-mini');
        return modelString.split(',').map(model => model.trim());
    }

    static get DEFAULT_MODEL() {
        return this.getEnvVariable('VITE_DEFAULT_MODEL', 'llama-3.1-70b');
    }
}

export default Config; 