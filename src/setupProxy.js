const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/github',
    createProxyMiddleware({
      target: 'https://github.com',
      changeOrigin: true,
      pathRewrite: {
        '^/github': '',  // This rewrites the URL from `/github/...` to `https://github.com/...`
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Received response from target:', proxyRes.statusCode);
      },
    })
  );
};
