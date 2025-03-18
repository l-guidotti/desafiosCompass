const readline = require("node:readline");
const { stdin: input, stdout: output } = require('node:process');

function somaVetor() {
    let vetor1 = [];
    let resultado = 0;

    const rl = readline.createInterface({ input, output });

    function coletarNumero(i = 0) {
        if (i < 4) {
            rl.question('Escolha um valor: ', (escolha) => {
                let numero = parseInt(escolha);

                if (isNaN(numero)) {
                    console.log('Valor inválido detectado.');
                    coletarNumero(i);
                } else {
                    vetor1.push(numero); 
                    coletarNumero(i + 1);
                }
            });
        } else {
            for (let i = 0; i < vetor1.length; i++) {
                resultado += vetor1[i];
            }
            console.log(`A soma dos valores é: ${resultado}`);
            rl.close();
        }
    }

    coletarNumero(0); 
}

somaVetor();