const dns = require ('dns')
dns.setServers(['8.8.8.8','1.1.1.1'])

////////////////////////////////////////

const express = require ('express')
const app = express ()
const logger = require ('morgan')
const cors = require ('cors')

require('dotenv').config()
require('./db')

const PORT = process.env.PORT || 3229

////////////////////////////////////////
const authRouter = require ('./routes/authRouter')
const userRouter = require ('./routes/userRouter')
const matchRouter = require ('./routes/matchRouter')

////////////////////////////////////////

app.use(cors())
app.use ( logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

////////////////////////////////////////

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/match',matchRouter)

////////////////////////////////////////

app.get('/',(req,res)=>{
  res.send (' My Web Page server is running')
})

////////////////////////////////////////

app.listen (PORT,()=>{
  console.log (`⚽ My Web Page server running on port ${PORT}`)
})

