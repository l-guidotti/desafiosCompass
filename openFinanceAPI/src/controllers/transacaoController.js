const { Transacao, Conta } = require('../../models');

module.exports = {
    async criaTransacao(req, res){
        try {
            const { tipo, valor, contaId } = req.body;
            const conta = await Conta.findByPk(contaId);

            if(!conta){
                return res.status(404).json({erro: 'Conta não encontrada'});
            }

            if(tipo !== 'entrada' && tipo !== 'saida'){
                return res.status(404).json({erro: 'Tipo de transação não aceito'})
            }

            if(tipo === 'entrada'){
                conta.saldo += valor;
            } else {
                if(conta.saldo < valor){
                    return res.status(400).json({erro: 'Saldo insuficiente'});
                }
                conta.saldo -= valor;
            }

            await conta.save();

            const novaTransacao = await Transacao.create({
                tipo,
                valor,
                contaId
            });

            return res.status(201).json(novaTransacao);

        } catch (error) {
            return res.status(500).json({erro: 'Erro ao criar transação.'})
        }
    }
}