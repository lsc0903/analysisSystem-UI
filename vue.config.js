// vue.config.js
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',baseUrl已被弃用，改为publicPath
    publicPath: '/',
    devServer: {
        open:true,
        port:6060,
        // https:true,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/works': {
                target: 'http://localhost:8001',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/works': ''
                }
            }
        }
    }
};

