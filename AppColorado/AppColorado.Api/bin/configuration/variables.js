'use strict'

const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://appcoloradoadmin:alicercecol@cluster0-77rdq.mongodb.net/test?retryWrites=true&w=majority'
    }
}

module.exports = variables;