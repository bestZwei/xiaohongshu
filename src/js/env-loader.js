async function loadEnvironmentVariables() {
    try {
        console.log('开始加载环境变量...');
        const response = await fetch('/__env.json');
        
        if (!response.ok) {
            console.log('使用默认环境变量');
            // 如果无法获取环境变量，使用默认值
            window.ENV = {
                VITE_API_URL: 'https://duck.cool.us.kg',
                VITE_API_KEY: 'sk-vduck',
                VITE_SYSTEM_PROMPT: '测试',
                VITE_MODEL_LIST: 'llama-3.1-70b,claude-3-haiku,gpt-4o-mini',
                VITE_DEFAULT_MODEL: 'llama-3.1-70b'
            };
            return;
        }

        window.ENV = await response.json();
        console.log('环境变量加载成功');
    } catch (error) {
        console.log('加载环境变量失败，使用默认值');
        // 出错时使用默认值
        window.ENV = {
            VITE_API_URL: 'https://duck.cool.us.kg',
            VITE_API_KEY: 'sk-vduck',
            VITE_SYSTEM_PROMPT: '测试',
            VITE_MODEL_LIST: 'llama-3.1-70b,claude-3-haiku,gpt-4o-mini',
            VITE_DEFAULT_MODEL: 'llama-3.1-70b'
        };
    }
}