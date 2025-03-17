function somaVetor (){
    let vetor1 = [4, -56, 3, 8];
    let resultado = 0;
    
    for (let i=0; i < vetor1.length; i++){
        if (typeof vetor1[i] !== 'number'){
        console.log('Valor inválido detectado');
        return;
        }
        resultado += vetor1[i];
    }

    
    console.log(resultado);

}

somaVetor();

//Fiz o algoritmo de forma com que você testa trocando os valores direto na variável