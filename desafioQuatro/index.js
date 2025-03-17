const readline = require('node:readline');

const { stdin: input, stdout: output } = require('node:process');

function jogadaUsuario(callback){
    const escolha = ['pedra', 'papel', 'tesoura'];

    const rl = readline.createInterface({ input, output });

    rl.question('Qual sua escolha (PEDRA, PAPEL, TESOURA)? ', (escolhaFinal) => {
        escolhaFinal = escolhaFinal.toLowerCase(); 
        if (!escolha.includes(escolhaFinal)) {
            console.log('Erro: escolha inválida!');
        } else {
            console.log(`Você escolheu: ${escolhaFinal}`);
        }

        rl.close();
        callback(escolhaFinal);
    });
}

function jogadaDaMaquina(){
    const escolha = ['pedra', 'papel', 'tesoura'];
    let escolhaFinalMaquina = escolha[Math.floor(Math.random()*3)];
    

    console.log(`A máquina escolheu: ${escolhaFinalMaquina}`);
    return escolhaFinalMaquina;
}

function resultado(escolhaFinal, escolhaFinalMaquina){
    if (escolhaFinal === escolhaFinalMaquina){
        console.log('Rodada empatata!');
    } else if (escolhaFinal === 'pedra' && escolhaFinalMaquina === 'tesoura') {
        console.log('Você venceu!');
    } else if (escolhaFinal === 'papel' && escolhaFinalMaquina === 'pedra') {
        console.log('Você venceu!');
    } else if (escolhaFinal === 'tesoura' && escolhaFinalMaquina === 'papel') {
        console.log('Você venceu!');
    } else {
        console.log('A máquina venceu!');
    }
}


jogadaUsuario((escolhaFinal) => {
    const escolhaFinalMaquina = jogadaDaMaquina();
    resultado(escolhaFinal, escolhaFinalMaquina);
});
