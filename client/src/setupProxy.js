const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {

  app.use(

    '/api',

    createProxyMiddleware({

      target: 'https://wingrowplatform.onrender.com', // Replace with the URL of your API endpoint

      changeOrigin: true,

    })

  );

};