const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "https://proyecto-integrador-enyoi-1-servidor.onrender.com/api",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api': '', // Opcional: remueve /api de las solicitudes
            },
        })
    );
};
