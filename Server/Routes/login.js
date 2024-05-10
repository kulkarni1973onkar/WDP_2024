const express = require("express")
const User = require("../Models/login")
const router = express.Router()

router
.get('/getUsers', async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.send(users)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body)
    res.send({...user, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.post('/register', async (req, res) => {
  try {
    const user = await User.register(req.body)
    res.send({...user, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit', async (req, res) => {
  try {
    let updatedUser = await User.editUsername(req.body)
    res.send({...updatedUser, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/remove', async (req, res) => {
  try {
    await User.deleteAccount(req.body)
    res.send({success: "Have a good one >:((("})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router
