const express = require("express")
const app = express()

app.use(express.json()); 

const loginRoutes = require("./Server/Routes/login")
const registerRoutes = require("./Server/Routes/register")


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use('/login', loginRoutes)
app.use('/register', registerRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started!! Listening on port ${PORT}!!! :)`))
