const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Customer (
    CustomerID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CONSTRAINT customerPK PRIMARY KEY(CustomerID)
  );`

  await con.query(sql);  
}

createTable()


async function getAllCustomers() {
  let sql = `SELECT * FROM Customer;`
  return await con.query(sql)
}

async function customerExists(username) {
  let sql = `SELECT * FROM Customer 
    WHERE Username = "${username}"
  `
  return await con.query(sql) 
}

async function emailExists(email) {
  let sql = `SELECT * FROM Customer 
    WHERE Email = "${email}"
  `
  return await con.query(sql) 
}

async function register(customer) {
  let cCustomer = await customerExists(customer.Username)
  if(cCustomer.length > 0) throw Error("Username Already Exists!")

  let email = await emailExists(customer.Email)
  if(email.length > 0) throw Error("Account with Email Already Exists ")

  let sql = `
    INSERT INTO Customer(FirstName,LastName,Username, Password, Email)
    VALUES("${customer.FirstName}","${customer.LastName}","${customer.Username}", "${customer.Password}", "${customer.Email}")
  `
  await con.query(sql)
  const u = await customerExists(customer.Username)
  console.log(u)
  return u[0]
}


async function login(customer) {
  let currentCustomer = await customerExists(customer.Username)
  if(!currentCustomer[0]) throw Error("Username does not exist!")
  if(customer.Password !== currentCustomer[0].Password) throw Error("Invalid Password!")

  return currentCustomer[0]
}

async function editUsername(customer) {
  let sql = `
    UPDATE Customer SET
    Username = "${customer.Username}"
    WHERE CustomerID = ${customer.CustomerID}
  `
  await con.query(sql)

  let updatedCustomer = await customerExists(customer.Username)
  return updatedCustomer[0]
}

async function editPassword(customer) {
  let sql = `
    UPDATE Customer SET
    Password  = "${customer.Password}"
    WHERE Username = "${customer.Username}";
  `
  await con.query(sql)

  let updatedCustomer = await customerExists(customer.Username)
  return updatedCustomer[0]
}


async function deleteAccount(customer) {
  let sql = `
    DELETE FROM Customer
    WHERE CustomerID = ${customer.CustomerID}
  `
  await con.query(sql)
}

module.exports = { getAllCustomers, login, register, editUsername, deleteAccount, editPassword }
