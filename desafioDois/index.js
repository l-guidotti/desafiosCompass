const readline = require("node:readline");
const { stdin: input, stdout: output } = require('node:process');

function verificaPrimo (){

    const rl = readline.createInterface({ input, output });
   
    rl.question('Escolha um valor: ', (escolha) => {
        
        let numero1 = parseInt(escolha);
   
        if(isNaN(numero1) || numero1 < 2){ 
            console.log('Valor inválido detectado.');
            rl.close();
            return;
        }

        let resultadoFinal = true;

        for(let i = 2; i < numero1; i++){
            if (numero1 % i === 0){
                resultadoFinal = false;
                break;
            }
        }

        if(resultadoFinal === true){
            console.log('O múmero é primo!');
        } else {
            console.log('O número não é primo!');
        }
        rl.close();
    });
}

verificaPrimo();