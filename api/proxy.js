import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing ?url= parameter' });
  }
  
  try {
    const response = await fetch(targetUrl);
    
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*'); // for player CORS
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch target' });
  }
}
