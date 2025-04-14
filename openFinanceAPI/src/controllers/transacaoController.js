const { where } = require('sequelize');
const { Transacao, Conta, Usuario } = require('../../models');

module.exports = {
    async criaTransacao(req, res){
        try {
            const { cpf } = req.params;
            const { tipo, valor, contaId } = req.body;
            const usuario = await Usuario.findByPk(cpf);
           

            if(!usuario){
                return res.status(404).json({erro: 'Usuário não encontrado'});
            }

            const conta = await Conta.findOne({
                where: { id: contaId, usuarioCpf: cpf }
            });

            if(!conta){
                return res.status(404).json({erro: 'Conta não encontrada'});
            }

            if(tipo !== 'entrada' && tipo !== 'saida'){
                return res.status(404).json({erro: 'Tipo de transação não aceito'})
            }

            if(tipo === 'entrada'){
                conta.saldo += parseFloat(valor);
            } else {
                if(conta.saldo < valor){
                    return res.status(400).json({erro: 'Saldo insuficiente'});
                }
                conta.saldo -= parseFloat(valor);
            }

            await conta.save();

            const novaTransacao = await Transacao.create({
                tipo,
                valor,
                contaId
            });

            return res.status(201).json(novaTransacao);

        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao criar transação', detalhe: error.message })
        }
    },

    async saldoUsuario(req, res){
        try {
            const { cpf } = req.params;
            const usuario = await Usuario.findByPk( cpf, {
                include: [Conta]
            });

            if(!usuario){
                return res.status(404).json({erro: 'Usuário não encontrado'});
            }
            
            const contas = usuario.Conta || usuario.conta;

            if(!contas || contas.length === 0){
                return res.status(200).json({ saldoTotal: 0 });
            } 

            const saldoTotal = usuario.Conta.reduce((total, conta) => {
                return total + parseFloat(conta.saldo);
            }, 0);

            return res.status(200).json({ cpf: usuario.cpf, saldoTotal });

        } catch (error) {
            return res.status(500).json({erro: 'Erro ao buscar saldo', detalhe: error.message });
        }
    }
};