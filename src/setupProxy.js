const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/?method=auth.start', { target: 'http://api.nccp-eng.ru' }));
  app.use(createProxyMiddleware('/?method=auth.direct', { target: 'http://api.nccp-eng.ru' }));
};
