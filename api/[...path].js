export const config = {
  api: {
    bodyParser: false, // Important for streaming binary
  },
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    return res.status(200).end();
  }

  try {
    // Join path segments to match request
    const path = req.query.path.join('/');

    // Build target URL
    const base = 'http://143.44.136.110:6910';
    const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const target = `${base}/${path}${query}`;

    // Fetch from target
    const response = await fetch(target);

    // Forward headers & CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');

    // Stream body
    const arrayBuffer = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(arrayBuffer));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
