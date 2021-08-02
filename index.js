const express   = require('express')
const mongoose  = require('mongoose')
const { 
  MONGO_USER, 
  MONGO_PASSWORD, 
  MONGO_IP, 
  MONGO_PORT 
} = require('./config/config')

const postRouter = require('./src/routes/postRoutes')

// "mongodb://faiza4dev:rahasiaku@172.26.0.2:27017/?authSource=admin"
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

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

app.use(express.json())

app.get("/", (req,res)=>{
  res.send("<h2>Sugeng Siyang</h2>")
})
// route api
app.use('/api/v1/posts', postRouter)

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`connect to http://localhost:${port}`))