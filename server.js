const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;

const server = http.createServer((req, res) => {
    // Extract the file path from the request URL
    let filePath = '.' + req.url;
    if (filePath === './') {
        // If no specific file is requested, default to index.html
        filePath = './index.html';
    }

    // Get the file extension
    const extname = path.extname(filePath);

    // Define MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        // Add more MIME types as needed
    };

    // Determine the content type based on the file extension
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // If file not found, return a 404 error
                fs.readFile('./404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // For other errors, return a 500 error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // If file is found, return it with the appropriate content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
