const http = require('http');
const fs = require('fs').promises;

const host = '0.0.0.0';
const port = 8000;

const requestListener = function (req, res) {
    if (req.url === '/') {
        fs.readFile(__dirname + '/index.html')
            .then(contents => {
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
            });
    }
    else if (req.url.startsWith('/icon/')) {
        const icon_arg = req.url.substring('/icon/'.length);
        fs.readFile(__dirname + '/icons/'+ icon_arg +'.png')
            .then(contents => {
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
            });
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});