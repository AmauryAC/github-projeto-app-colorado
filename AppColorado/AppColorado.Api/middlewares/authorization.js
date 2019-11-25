'use strict'

module.exports = async(req, res, next) => {
    if(req.loggedUser) {
        if(req.loggedUser.user.tipo != 'admin') {
            res.status(401).send({
                message: 'Você não tem autorização para acessar esse recurso.'
            });
            return;
        }

        next();
    } else {
        res.status(401).send({
            message: 'Você precisa estar autenticado para acessar esse recurso.'
        });
        return;
    }
};