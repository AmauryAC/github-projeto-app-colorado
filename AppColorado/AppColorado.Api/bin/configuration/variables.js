'use strict'

const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://appcoloradoadmin:alicercecol@cluster0-77rdq.mongodb.net/test?retryWrites=true&w=majority'
    },
    Security: {
        securityKey: 'd41d8cd98f00b204e9800998ecf8427a|b48333d02f1e90774479d127e119149e'
    }
}

module.exports = variables;