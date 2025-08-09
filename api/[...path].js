import fetch from 'node-fetch';

export default async function handler(req, res) {
  const path = req.query.path.join('/');
  
  // Original base server
  const target = `http://143.44.136.110:6910/${path}${req.url.split('?')[1] ? '?' + req.url.split('?')[1] : ''}`;

  try {
    const response = await fetch(target);
    
    // Set headers for CORS + correct content type
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    
    // Pipe response to client
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Proxy fetch failed', details: err.message });
  }
}
