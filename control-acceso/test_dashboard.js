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
    console.log('Login status:', res.statusCode);
    const cookies = res.headers['set-cookie'];
    console.log('Cookies:', cookies);

    if (cookies) {
      const dashboardReq = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/dashboard',
        method: 'GET',
        headers: { 'Cookie': cookies[0] }
      }, (dashRes) => {
        let dashData = '';
        dashRes.on('data', chunk => dashData += chunk);
        dashRes.on('end', () => {
          console.log('Dashboard status:', dashRes.statusCode);
          console.log('Dashboard length:', dashData.length);
          if (dashRes.statusCode === 500) {
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
