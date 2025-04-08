const { Instituicao } = require('../../models');

module.exports = {
    async criarInstituicao(req, res) {
        try {
            const { nome } = req.body;
            const jaExiste = await Instituicao.findOne({ where: {nome}});

            if(!nome) {
                return res.status(400).json({erro: 'Nome da instituição é obrigatório.'});
            }

            if(jaExiste) {
                return res.status(409).json({erro: 'Intituição já cadastrada.'});
            }

            const novaInstituicao = await Instituicao.create({nome});

            return res.status(201).json(novaInstituicao);

        } catch(err){
            console.error('Erro ao criar instituição: ', err);
            return res.status(500).json({erro: 'Erro interno do servidor'});
        }
    }
}