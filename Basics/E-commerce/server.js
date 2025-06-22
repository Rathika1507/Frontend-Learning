const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const db = new sqlite3.Database("db.sqlite");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Create user table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
    if (row) return res.send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
      if (err) return res.send("Error registering user");
      res.send("Signup successful! <a href='signin.html'>Go to Sign In</a>");
    });
  });
});

// Signin route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.send("Login successful! Welcome " + email);
    } else {
      res.send("Invalid credentials");
    }
  });
});

// Serve home
app.get("/", (req, res) => res.redirect("/signin.html"));

// Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
