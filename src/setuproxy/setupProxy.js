const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8800',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api': '', // Opcional: remueve /api de las solicitudes
            },
        })
    );
};
