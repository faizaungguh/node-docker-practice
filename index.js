const express = require('express')
const app = express()

app.get("/", (req,res)=>{
  res.send("<h2>Sugeng Siyang</h2>")
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`connect to http://localhost:${port}`))