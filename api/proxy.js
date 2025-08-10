import request from "request";

export default function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing url");

  request({
    url,
    headers: {
      "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9; OTT Player Build/PI)",
      "Referer": "http://localhost/",
      "Origin": "http://localhost",
      "Accept": "*/*"
    },
    followRedirect: true
  })
  .on("error", err => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  })
  .pipe(res);
}
