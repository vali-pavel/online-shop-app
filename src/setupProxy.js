const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/users', {
            target: 'http://localhost:8001/',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/api/products', {
            target: 'http://localhost:8003/',
            changeOrigin: true,
        })
    );
}
