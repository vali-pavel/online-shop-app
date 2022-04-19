const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/users', {
            target: 'http://shopnet.service',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/api/customers', {
            target: 'http://shopnet.service',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/api/products', {
            target: 'http://shopnet.service',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/api/orders', {
            target: 'http://shopnet.service',
            changeOrigin: true,
        })
    );
}
