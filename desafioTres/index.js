const readline = require("node:readline");
const { stdin: input, stdout: output } = require('node:process');

function palindromo (){
    let escritaSemEspaco = '';

    const rl = readline.createInterface({ input, output });

    rl.question('Digite uma palavra ou frase: ', (escrita) => {
        escritaFinal = escrita.toLowerCase();

        for(let i=0; i<escritaFinal.length; i++){
            if(escritaFinal[i] !== ' '){
                escritaSemEspaco += escritaFinal[i].toLocaleLowerCase();
            }
        }
    
        for (let i = 0; i < escritaSemEspaco.length / 2; i++) {
            if (escritaSemEspaco[i] !== escritaSemEspaco[escritaSemEspaco.length - 1 - i]) {
                console.log('Não é palindromo!');
                rl.close();
                return;
            }
        }
        
        console.log('É palindromo!');
        rl.close();
    });
}

palindromo();