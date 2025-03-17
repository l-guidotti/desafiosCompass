function verificaPrimo (){
    const numero1 = 11;
    let resultadoFinal = true;

    if(typeof numero1 !== 'number' || numero1 < 2){ 
        console.log('Valor inválido detectado.');
        return;
    }

    for(let i = 2; i < numero1; i++){
        if (numero1 % i === 0){
            resultadoFinal = false;
            break;
        }
    }

    console.log(resultadoFinal);
}

verificaPrimo();

//Fiz o algoritmo de forma com que você testa trocando os valores direto na variável