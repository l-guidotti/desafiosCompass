function palindromo (){
    let escrita = 'a base do teto desaba';
    let escritaSemEspaco = '';

    for(let i=0; i<escrita.length; i++){
        if(escrita[i] !== ' '){
            escritaSemEspaco += escrita[i].toLocaleLowerCase();
        }
    }

    for (let i = 0; i < escritaSemEspaco.length / 2; i++) {
        if (escritaSemEspaco[i] !== escritaSemEspaco[escritaSemEspaco.length - 1 - i]) {
            console.log(false);
            return;
        }
    }
    
    console.log(true);
}

palindromo()

//Fiz o algoritmo de forma com que você testa trocando os valores direto na variável