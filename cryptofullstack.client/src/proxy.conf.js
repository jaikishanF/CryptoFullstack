const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7060';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api",
    ],
    target: "https://localhost:7182",
    secure: false,  // Set to false if SSL/TLS is not configured
    changeOrigin: true,
    logLevel: "debug"  // This enables verbose logging for debugging
  }
]

module.exports = PROXY_CONFIG;
