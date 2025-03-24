//const { error, timeStamp } = require('node:console');
const {createServer, request} = require('node:http');
const {URL} = require('node:url');

const host = '127.0.0.1';
const port = 3000;

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    
    try {

        const parsedUrl = new URL(request.url, `http://${host}:${port}`);

        if(request.method === "GET" && parsedUrl.pathname == "/health-check"){
            response.end(JSON.stringify({
                success: true,
                timeStamp: new Date().toISOString()
            }));
        } else if (request.method === "GET" && parsedUrl.pathname.startsWith("/is-prime-number")){

            let criaArray = parsedUrl.pathname.split("/");
            let parameter = Number(criaArray.pop());

            if (parameter < 2 || isNaN(parameter)) {
                response.statusCode = 400;
                response.end(JSON.stringify({
                    message: "Invalid input"
                }));
                return;
            }

            let isPrime = true;
            for (let i = 2; i <= Math.sqrt(parameter); i++) {
                if (parameter % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            
            response.statusCode = 200;
            response.end(JSON.stringify({
                isPrime: isPrime
            }));

        } else if(request.method === "POST" && parsedUrl.pathname === "/count"){
            let body = "";

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                try {
                    const { incrementBy } = JSON.parse(body);
                    if (isNaN(incrementBy) || incrementBy <= 0) {
                        response.statusCode = 400;
                        response.end(JSON.stringify({
                            error: "Invalid input"
                        }));
                    } else {
                        response.statusCode = 200;
                        response.end(JSON.stringify({ counter: incrementBy }));
                    }
                } catch (err) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: "Invalid JSON" }));
                }
            });
                } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ error: 'Route not found' }));
    }

    
    } catch(error) {
        console.log(error);
        response.statusCode = 500;
        response.end(JSON.stringify({
            error: "Internal Server Error"
        }));
    }
    
});

server.listen(port, host, () => {
    console.log(`O servidor está rodando na porta ${host}:${port}`);
});