const express = require('express')
const app = express()
const expressWinston = require('express-winston')
const{transports,transport,format} = require('winston')

app.use(expressWinston.logger({
    transports:[
        new transports.Console(),
        new transports.File({
            level: 'info',
            filename: 'logsWarning.log'

        }),
        new transports.File({
            level: 'error',
            filename: 'logsErrors.log'

        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint(),

    ),
    statusLevels:true
}))

app.get('/',(req,res)=> {
    res.sendStatus(200)
})

app.get('/400',(req,res)=> {
    res.sendStatus(500)
})

app.listen(4000,()=>{
    console.log('port online')
})