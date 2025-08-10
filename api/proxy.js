// api/proxy.js

import { createProxyMiddleware } from 'http-proxy-middleware';

// Disable Vercel body parsing for streams
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  // Get target URL from ?url= query
  const target = req.query.url;
  if (!target || !/^https?:\/\//.test(target)) {
    res.status(400).send("Missing or invalid 'url' parameter");
    return;
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Range');

  // Create the proxy middleware
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    selfHandleResponse: false,
    pathRewrite: () => '', // Remove path, stream full target
    onProxyReq: (proxyReq) => {
      // Optional: remove Origin header
      proxyReq.removeHeader('origin');
    },
    logger: console,
  });

  return proxy(req, res, () => {});
}
