export async function onRequest(context) {
    const { request, env } = context;
    
    // 如果请求的是环境变量
    if (request.url.endsWith('/__env.json')) {
        // 使用默认值
        const defaultEnv = {
            VITE_API_URL: 'https://duck.cool.us.kg',
            VITE_API_KEY: '',
            VITE_SYSTEM_PROMPT: '无',
            VITE_MODEL_LIST: 'llama-3.1-70b,claude-3-haiku,gpt-4o-mini',
            VITE_DEFAULT_MODEL: 'llama-3.1-70b'
        };

        // 合并环境变量，优先使用 env 中的值
        const envVars = {
            ...defaultEnv,
            ...(env || {})
        };
        
        return new Response(JSON.stringify(envVars), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    // 其他请求继续正常处理
    return env.ASSETS.fetch(request);
} 