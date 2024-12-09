
var express = require("express");
var cors = require("cors");
const multer = require("multer");
// var multer = require("multer");
// var fs = require("fs");
var bodyParser = require("body-parser");
const path = require('path');
var app = express();

app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
// Server
// app.use(multer());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

// Start server
app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});

const mysql = require("mysql2");
const db = mysql.createConnection({
host: "127.0.0.1",
user: "fallstudent",
password: "FallStudent2024",
database: "isuroommateportal",
});


app.post("/users/login", (req, res) => {

    const { email, password } = req.body;
        if (!email || !password) {
        return res.status(400).send({ error: "Email and password are required." });
    }

    // Query MySQL
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";

    // Query MySQL
    db.query(query, [email, password], (err, results) => {
        try {
            if (err) {
                console.error("Database error during login:", err);
                return res.status(500).send({ error: "An error occurred in Query. Please try again." });
            }
            if (results.length === 0) {
                return res.status(401).send({ error: "Invalid username or password." });
            }
            // If there is not any error, respond with code and role
            const { user } = results;
            res.status(200).send({ user });
            // console.log(res[0], res[2], res[1])
            // console.log(email, password);
            // console.log(results);
        } catch (err){
            // Handle synchronous errors
            console.error("Error in GET /users/login", err);
            res.status(500).send({ error: "An unexpected error occurred in Login: " + err.message });
        }
        
    });
    
});


// endpoint to get all users
app.get("/users", (req, res) => {
    try {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
        console.error({error:"Error reading all posts:"+err});
        return res.status(500).send({ error: "Error reading all contacts"+err});
        }
        res.status(200).send(result);
        // console.log(result);
    });
    } catch {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }
 });

 db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});


// endpoint to get one user
app.get("/user/:email", (req, res) => {

    const email = decodeURIComponent(req.params.email);
    // Validate if email is provided
    if (!email) {
        return res.status(400).send({ error: "email is required" });
    }

    try {
        db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
            if (err) {
            console.error({error:"Error reading all posts:"+err});
            return res.status(500).send({ error: "Error reading all contacts"+err});
            }
            res.status(200).send(result);
            // console.log(result);
        });
    } catch {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }
 });
