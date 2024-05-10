const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS User (
    UserID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userID)
  );`

  await con.query(sql);  
}

createTable()


async function getAllUsers() {
  let sql = `SELECT * FROM User;`
  return await con.query(sql)
}

async function userExists(username) {
  let sql = `SELECT * FROM User 
    WHERE Username = "${username}"
  `
  return await con.query(sql) 
}

async function emailExists(email) {
  let sql = `SELECT * FROM User 
    WHERE Email = "${email}"
  `
  return await con.query(sql) 
}

// let user = {
//   Username: "steve@123",
//   Email: "steve@mail.com",
//   Password: "assemble"
// }

async function register(user) {
  let cUser = await userExists(user.Username)
  if(cUser.length > 0) throw Error("Username Already Exists!")

  let email = await emailExists(user.Email)
  if(email.length > 0) throw Error("Account with Email Already Exists ")

  let sql = `
    INSERT INTO User(Username, Password, Email)
    VALUES("${user.Username}", "${user.Password}", "${user.Email}")
  `
  await con.query(sql)
  const u = await userExists(user.Username)
  console.log(u)
  return u[0]
}


async function login(user) {
  let currentUser = await userExists(user.Username)
  if(!currentUser[0]) throw Error("Username does not exist!")
  if(user.Password !== currentUser[0].Password) throw Error("Invalid Password!")

  return currentUser[0]
}

async function editUsername(user) {
  let sql = `
    UPDATE User SET
    Username = "${user.Username}"
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)

  let updatedUser = await userExists(user.Username)
  return updatedUser[0]
}

async function editPassword(user) {
  let sql = `
    UPDATE UserData SET
    Password  = "${user.Password}"
    WHERE Username = "${user.Username}";
  `
  await con.query(sql)

  let updatedUser = await userExists(user.Username)
  return updatedUser[0]
}


async function deleteAccount(user) {
  let sql = `
    DELETE FROM User
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)
}

module.exports = { getAllUsers, login, register, editUsername, deleteAccount, editPassword }
