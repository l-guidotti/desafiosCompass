
const {timeStamp, error} = require("node:console");
const {createServer, request} = require("node:http");

const host = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    Response.setHeader("Content-type", "application/json");

    try {
        const url = new URL(request.url)
    } catch {

    }
})

server.listen(port, host, () => {
    console.log(`Servidor rodando em: http://${host}:${port}/`);
});