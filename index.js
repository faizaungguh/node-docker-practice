const express   = require('express')
const mongoose  = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config')
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// "mongodb://faiza4dev:rahasiaku@172.26.0.2:27017/?authSource=admin"

const app       = express()

const connectWithRetry = () => {
  mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(()=>console.log("Success connected to DB"))
  .catch((e)=>{
    console.log(e)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

app.get("/", (req,res)=>{
  res.send("<h2>Sugeng Siyang</h2>")
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`connect to http://localhost:${port}`))