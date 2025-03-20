const { error } = require('node:console');
const {createServer, request} = require('node:http');
const {url} = require('node:url');

const host = '127.0.0.1';
const port = 3000;

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'text', 'application/json');    
});

try {

    const url = new URL(request.url, `http://${host}:${port}`);


} catch {
    error;
}


server.listen(port, host, () => {
    console.log(`O servidor está rodando na porta ${host}:${port}`);
})
