const { createServer } = require('node:http');
const { URL } = require('node:url');

const host = '127.0.0.1';
const port = 3000;

const server = createServer(async (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    
    try {
        const parsedUrl = new URL(request.url, `http://${host}:${port}`);
        
        if (request.method === "GET" && parsedUrl.pathname === "/health-check") {
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
            } else if (request.method === "GET" && parsedUrl.pathname === "/stock-insight") {
            const currency = parsedUrl.searchParams.get('currency') || 'usd';
            if (!['usd', 'brl'].includes(currency)) {
                response.statusCode = 400;
                return response.end(JSON.stringify({ error: "Moeda inválida. Use 'usd' ou 'brl'." }));
            }

            const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`;
            const apiResponse = await fetch(apiUrl);
            const data = await apiResponse.json();
            
            if (!data.bitcoin || !data.bitcoin[currency]) {
                response.statusCode = 500;
                return response.end(JSON.stringify({ error: "Erro ao obter dados do CoinGecko." }));
            }

            const btcPrice = data.bitcoin[currency];
            let suggestion = "";

            if (currency === "brl") {
                if (btcPrice < 300000) {
                    suggestion = "Bom momento para compra!";
                } else if (btcPrice >= 300000 && btcPrice <= 450000) {
                    suggestion = "Preço razoável. Avalie antes de comprar.";
                } else {
                    suggestion = "Bitcoin está caro. Pode ser melhor esperar.";
                }
            } else {
                if (btcPrice < 60000) {
                    suggestion = "Bom momento para compra!";
                } else if (btcPrice >= 60000 && btcPrice <= 80000) {
                    suggestion = "Preço razoável. Avalie antes de comprar.";
                } else {
                    suggestion = "Bitcoin está caro. Pode ser melhor esperar.";
                }
            }

            response.statusCode = 200;
            response.end(JSON.stringify({
                btc_price: btcPrice,
                currency: currency,
                suggestion: suggestion
            }));
        } else {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: 'Route not found' }));
        }
    } catch (error) {
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