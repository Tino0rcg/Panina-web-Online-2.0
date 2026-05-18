const http = require('http');

function testServer(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://192.168.100.20:${port}/api/stats`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ port, status: res.statusCode, data: data.substring(0, 100) });
      });
    }).on('error', (err) => {
      resolve({ port, error: err.message });
    });
    
    // Timeout
    setTimeout(() => {
      req.destroy();
      resolve({ port, error: 'Timeout' });
    }, 3000);
  });
}

async function run() {
  console.log('Testing port 3000...');
  console.log(await testServer(3000));
  
  console.log('Testing port 3001...');
  console.log(await testServer(3001));
}

run();
