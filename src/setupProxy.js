const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://192.168.213.77',
      secure: false,
      changeOrigin: true,
    }),
  );
};
