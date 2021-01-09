const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://nodereact-lee.run.goorm.io/',
      changeOrigin: true
    })
  );
};