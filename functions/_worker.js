export async function onRequest(context) {
    const { request, env } = context;
    
    // 如果请求的是环境变量
    if (request.url.endsWith('/__env.json')) {
        // 只返回以 VITE_ 开头的环境变量
        const envVars = {};
        for (const key in env) {
            if (key.startsWith('VITE_')) {
                envVars[key] = env[key];
            }
        }
        
        return new Response(JSON.stringify(envVars), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache'
            }
        });
    }

    // 其他请求继续正常处理
    return env.ASSETS.fetch(request);
} 