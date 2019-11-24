const app = require('../AppColorado.Api/bin/express');
const variables = require('../AppColorado.Api/bin/configuration/variables');

const port = variables.Api.port;

app.listen(port, () => {
    console.log(`Api inicializada com sucesso na porta ${port}.`);
});