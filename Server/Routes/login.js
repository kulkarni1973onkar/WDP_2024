const express = require("express")
const Customer = require("../Models/login") 
const router = express.Router()

router
.get('/getCustomers', async (req, res) => { 
  try {
    const customers = await Customer.getAllCustomers() 
    res.send(customers)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.post('/login', async (req, res) => {
  try {
    const customer = await Customer.login(req.body) 
    res.send({...customer, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.post('/register', async (req, res) => {
  try {
    const customer = await Customer.register(req.body) 
    res.send({...customer, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit', async (req, res) => {
  try {
    let updatedCustomer = await Customer.editUsername(req.body) 
    res.send({...updatedCustomer, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/remove', async (req, res) => {
  try {
    await Customer.deleteAccount(req.body) 
    res.send({success: "Have a good one >:((("})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router
