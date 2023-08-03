const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');
const formidable = require('formidable');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Serve the HTML form for uploading a file
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/upload' && req.method === 'POST') {
        let fileData = Buffer.alloc(0);
        req.on('data', (chunk) => {
            fileData = Buffer.concat([fileData, chunk]);
        });
        fs.unlink('ips/output.json', (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        req.on('end', () => {
            fs.writeFile('iplist.txt', fileData, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal server error');
                } else {
                    const child = spawn('python3', ['sllep.py'],);
                    child.on('exit', (code) => {
                        console.log(`Child process exited with code ${code}`);
                        setTimeout(() => {
                            res.writeHead(302, { Location: 'ips/vtoutput.html' });
                            res.end();
                        }, 7000);
                    });
                }
            });
        });
    } else if (req.url === '/ips/vtoutput.html' && req.method === 'GET') {
        // Serve the HTML form for uploading a file
        fs.readFile('ips/vtoutput.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/ips/output.json' && req.method === 'GET') {
        // Serve the HTML form for uploading a file
        fs.readFile('ips/output.json', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (req.url === '/assets/img/vt.png' && req.method === 'GET') {
        fs.readFile('assets/img/vt.png', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading image');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(5000, () => {
    console.log('Server listening on port 5000');
});
