const { Usuario, Conta, Transacao, Instituicao } = require('../../models');

module.exports = {
    async criaUsuario(req, res){
        try {
            const {cpf, nome, email } = req.body;
            const novoUsuario = await Usuario.create({cpf, nome, email});
            return res.status(201).json(novoUsuario);

        } catch (error) {
            return res.status(500).json({erro: 'Erro ao criar usuário'});
        }
    },

    async listaUsuario(req, res){
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json(usuarios);

        } catch (error) {
            return res.status(500).json({erro: 'Erro ao buscar o usuário'});
        }
    },

    async listaPorCpf(req, res) {
        try {
            const { cpf } = req.params;
            const usuario = await Usuario.findByPk(cpf);

            if(!usuario){
                return res.status(404).json({erro: 'Usuário não encontrado'});
            }

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({erro: 'Erro ao buscar o usuário'});
        }
    },

    async editaUsuario(req, res){
        try {
            const { cpf } = req.params;
            const { nome, email } = req.body;
            const usuario = await Usuario.findByPk(cpf);

            if(!usuario){
                res.status(404).json({erro: 'Usuário não encontrado'});
            }

            await usuario.update({ nome, email });

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({erro: 'Erro ao atualizar o usuário'})
        }
    },

    async deletaUsuario(req, res){
        try {
            const { cpf } = req.params;
            const usuario = await Usuario.findByPk(cpf);

            if(!usuario){
                res.status(404).json({erro: 'Usuário não encontrado'})
            }

            await usuario.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({erro: 'Erro ao deletar usuário'})
        }
    },

    async extratoTotal(req, res){
        try {
            const { cpf } = req.params;
            const usuario = await Usuario.findByPk(cpf, {
                include: {
                    model: Conta,
                    as: 'contas',
                    include: [
                        {
                            model: Transacao,
                            as: 'transacoes',
                            required: false
                        },
                        {
                            model: Instituicao,
                            as: 'instituicao'
                        }
                    ]
                }
            });

            if (!usuario){
                return res.status(404).json({erro: 'Erro ao encontrar o usuário'});
            }

            const contas = usuario.contas || [];
            let transacoes = [];

            contas.forEach(conta => {
                if(conta.transacoes && conta.transacoes.length > 0){
                    conta.transacoes.forEach(transacao => {
                        transacoes.push({
                            id: transacao.id,
                            tipo: transacao.tipo,
                            valor: transacao.valor,
                            contaId: conta.id,
                            Instituicao: conta.instituicao?.nome || null,
                            createdAt: transacao.createdAt
                        });
                    });
                }
            });

            transacoes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return res.status(200).json({
                cpf: usuario.cpf,
                nome: usuario.nome,
                transacoes
            });

        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao gerar extrato', detalhe: error.message });
        }
    }
};