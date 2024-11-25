async function loadEnvironmentVariables() {
    try {
        const response = await fetch('/__env.json');
        if (!response.ok) throw new Error('Failed to load environment variables');
        window.ENV = await response.json();
    } catch (error) {
        console.warn('Failed to load environment variables:', error);
        window.ENV = {};
    }
} 