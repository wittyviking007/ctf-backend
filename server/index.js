const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
// hashing passwords
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "ctf_task",
});

const saltRounds = 10;

// Function to hash a password
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

app.post("/create", async (req, res) => {
  const uname = req.body.uname;
  const email = req.body.email;
  const password = await hashPassword(req.body.password);
  
  db.query(
    "INSERT INTO ctf_logins (uname,email,password) VALUES (?,?,?)",
    [uname,email,password],
    (err, result) => {
      console.log(password);
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/logins/:email", (req, res) => {
  const email = req.params.email;
  db.query("SELECT count(*) FROM ctf_logins where email = ?",
  [email],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/pw/:email", (req,res) => {
  const email = req.params.email;
  db.query("SELECT password FROM ctf_logins WHERE email = ?",
  [email],
  (err,result) => {
    if (err) {
      console.log(err);
    }else {
      res.send(result);
    }
  }
  )
})

app.put("/update", (req, res) => {
  const name = req.body.name;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE name = ?",
    [wage, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
