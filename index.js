const express   = require('express')
const mongoose  = require('mongoose')
const session   = require('express-session')
const redis     = require('redis')
let RedisStore  = require('connect-redis')(session)

const { 
  MONGO_USER, 
  MONGO_PASSWORD, 
  MONGO_IP, 
  MONGO_PORT, 
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
} = require('./config/config')

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})

const postRouter = require('./src/routes/postRoutes')
const userRouter = require('./src/routes/userRoutes')

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

app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30000
  }
}))

app.use(express.json())

app.get("/", (req,res)=>{
  res.send("<h2>Sugeng Siyang</h2>")
})
// route api
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`connect to http://localhost:${port}`))