'use strict'

module.exports.post = async(repository, validationContract, req, res) => {
    try {    
        let data = req.body;

        if(!validationContract.isValid()) {
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição.',
                validation: validationContract.errors()
            }).end();
            return;
        }

        let result = await repository.create(data);

        res.status(201).send(result);
    } catch(err) {    
        console.log('POST com erro. Motivo: ', err);

        res.status(500).send({
            message: 'Erro no processo.',
            error: err
        });
    }
};

module.exports.put = async(repository, validationContract, req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        if(id) {
            if(!validationContract.isValid()) {
                res.status(400).send({
                    message: 'Existem dados inválidos na requisição.',
                    validation: validationContract.errors()
                }).end();
                return;
            }
    
            let result = await repository.update(id, data);
    
            res.status(202).send(result);
        } else {
            res.status(400).send({
                message: 'O parâmetro "id" precisa ser informado.'
            });
        }
    } catch(err) {
        console.log('PUT com erro. Motivo: ', err);

        res.status(500).send({
            message: 'Erro no processo.',
            error: err
        });
    }
};

module.exports.get = async(repository, req, res) => {
    try {
        let list = await repository.getAll();

        res.status(200).send(list);
    } catch(err) {
        console.log('GET com erro. Motivo: ', err);

        res.status(500).send({
            message: 'Erro no processo.',
            error: err
        });
    }
};

module.exports.getById = async(repository, req, res) => {
    try {
        let id = req.params.id;

        if(id) {
            let data = await repository.getById(id);

            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'O parâmetro "id" precisa ser informado.'
            });
        }
    } catch(err) {
        console.log('GET BY ID com erro. Motivo: ', err);

        res.status(500).send({
            message: 'Erro no processo.',
            error: err
        });
    }
};

module.exports.delete = async(repository, req, res) => {
    try {
        let id = req.params.id;

        if(id) {
            let data = await repository.delete(id);

            res.status(200).send({
                message: 'Registro excluído com sucesso!'
            });
        } else {
            res.status(400).send({
                message: 'O parâmetro "id" precisa ser informado.'
            });
        }
    } catch(err) {
        console.log('DELETE com erro. Motivo: ', err);

        res.status(500).send({
            message: 'Erro no processo.',
            error: err
        });
    }
};