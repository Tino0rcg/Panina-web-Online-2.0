const http = require('http');

const postData = JSON.stringify({ email: 'a1@gmail.com', password: '12345678' });

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const cookies = res.headers['set-cookie'];

    if (cookies) {
      const dashboardReq = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/dashboard',
        method: 'POST', // Simulate the 307 redirect preserving the POST method
        headers: { 'Cookie': cookies[0] }
      }, (dashRes) => {
        let dashData = '';
        dashRes.on('data', chunk => dashData += chunk);
        dashRes.on('end', () => {
          console.log('Dashboard POST status:', dashRes.statusCode);
          if (dashRes.statusCode >= 400) {
            console.log('Error content:', dashData.substring(0, 500));
          }
        });
      });
      dashboardReq.end();
    }
  });
});

req.write(postData);
req.end();
