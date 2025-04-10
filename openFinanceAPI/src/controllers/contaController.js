const { Conta, Usuario, Instituicao } = require('../../models');

module.exports = {
    async criaConta(req, res){
        try {
            const { saldo, usuarioCpf, instituicaoId } = req.body;
            const usuario = await Usuario.findByPk(usuarioCpf);
            const instituicao = await Instituicao.findByPk(instituicaoId);

            if(!usuario || !instituicao){
                return res.status(404).json({erro: 'Usuário e/ou instituição inexistentes'});
            }

            const novaConta = await Conta.create({ saldo, usuarioCpf, instituicaoId });
            return res.status(201).json(novaConta);

        } catch (error) {
            return res.status(500).json({erro: 'Erro ao criar conta.', detalhe: error.message });
        }
    },

    async listaConta(req, res){

    },

    async buscaContaPorId(req, res){

    },

    async deletaConta(req,res){

    }


}