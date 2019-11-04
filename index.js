// Requires, importacion de librerias de terceros o propias
const express = require('express')
const axios = require('axios')
const Twitter = require('twitter')
const config = require('./configuration/config')
const TwitterClient = new Twitter(config)

// Inicializar variables, es importante xq aqui donde usamos las librerias
var app = express();

// Body Parser
app.use(express.static('public'))

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    next()
  })

// Expres middlewere errors
app.use((err, req, res, next) => {
    console.log('error', err)

    res.status(400).json({ error: err.message })
  })
  
  
// Rutas
app.get('/twitter/message', async (req, res, next) => {
    const url = 'https://api.twitter.com/1.1/direct_messages/events/list.json'
    let message

    try {
        await TwitterClient.get(url, {}, (err, data, res) => {
            console.log(res)
            if (err) {
                console.log(err)
                next(err)
            }
            message = data
            console.log(data)
        })
    } catch (error) {
        return next(error)
    }

    res.status(200).send(message)
})



// El 3001 es el puerto donde se va a escuchar las peticiones
app.listen(3001, () => {
    console.log('express server corriendo en el puerto 3001: \x1b[32m%s\x1b[0m', 'online')
})