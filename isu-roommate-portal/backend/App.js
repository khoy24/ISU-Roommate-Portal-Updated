
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


// endpoint to get one user by email
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



// Request method to read the picture user
// app.get('/contact/profile_picture/:contact_name', (req, res) => { 

//     // Read contact_name from route parameter
//     const contact_name = req.params.contact_name;   
//     // MySQL Query
//     const query = "SELECT image_url FROM contact WHERE contact_name = ?";
//     try {
//         db.query(query, [contact_name], (err, result)=>{
//             if (err) {
//             console.log({error:"Error in Profile Picture"});
//             return res.status(500).send({ error: "Error fetching Profile Picture :"+err });
//             } else if (result.length) {
//             console.log(result);
//             res.json({ picture: result[0].image_url }); // return local url
//             } else {
//             res.status(404).send({ error: 'Profile picture not found' });
//             }
//         });
//     } catch (err){
//         console.error("Error fetching profile picture:", err);
//         res.status(500).send({ error: 'Error fetching profile picture :'+ err });
//     }

// });


// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the 'uploads' folder
    },
        filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });
// Create "uploads" folder if it doesn't exist
const fs = require("fs");
// const multer = require("multer");
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// create new user
app.post("/user", upload.single("image"), (req, res) => {
 
    console.log("Received file:", req.file);

    const { email, user, first_name, last_name, password, bio } = req.body;
    const profile_photo = req.file ? `/uploads/${req.file.filename}` : null;

    // Step 1: Check if contact_name already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Database error during validation:", checkErr);
            return res.status(500).send({ error: "Error checking contact name: " + checkErr.message });
        }
        if (checkResult.length > 0) {
            // If email exists, send a conflict response
            return res.status(409).send({ error: "An account with that email already exists." });
        }
    });

    const query = "INSERT INTO users (email, user, first_name, last_name, password, bio, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [email, user, first_name, last_name, password, bio, profile_photo], (err, result) => {

        try {
            res.status(201).send("User added successfully");
        } catch (err) {
            // Handle synchronous errors
            console.error("Error in POST /User:", err);
            res.status(500).send({ error: "An unexpected error occurred: " + err.message });
        }
    });

});


// delete a user by email
app.delete("/user/:id", (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {

        try {
            if (result.affectedRows === 0){
                res.status(404).send({err:"User not found"});
            } else {
                res.status(200).send("User deleted successfully");
            }
        } catch (err){
            // Handle synchronous errors
            console.error("Error in DELETE /user:", err);
            res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
        }


    }); 

});



// change a users profile picture
// upload.single() had to say profile_photo not image in this case
app.put("/user/profile_photo/:id",  upload.single("profile_photo"), (req, res) => {

    const id = req.params.id;
    const profile_photo = req.file ? `/uploads/${req.file.filename}` : null;
    const query = `
    UPDATE users
    SET profile_photo = ?
    WHERE id = ?
    `;

    db.query(query, [profile_photo, id], (err, result) => {

        try {
            if (result.affectedRows === 0) {
                res.status(404).send({err:"User not found"});
            } else {
                res.status(200).send("User updated successfully");
                console.log(profile_photo);
                console.log(id);
            }
        } catch {
        // Handle synchronous errors
        console.error("Error in UPDATE /users :", err);
        res.status(500).send({ error: "An unexpected error occurred in UPDATE: " + err.message });
        }
    })        


});

// change a users gallery photos
app.put("/user/gallery_image/:id/:gallery_number",  upload.single(`gallery_image`), (req, res) => {

    const id = req.params.id;
    const gallery_number = req.params.gallery_number;
    const gallery_image = req.file ? `/uploads/${req.file.filename}` : null;
    const query = `
    UPDATE users
    SET gallery${gallery_number} = ?
    WHERE id = ?
    `;

    console.log(gallery_image);

    db.query(query, [gallery_image, id], (err, result) => {

        try {
            if (result.affectedRows === 0) {
                res.status(404).send({err:"User not found"});
            } else {
                res.status(200).send("User updated successfully");
            }
        } catch (err) {
        // Handle synchronous errors
        console.error("Error in UPDATE /users :", err);
        res.status(500).send({ error: "An unexpected error occurred in UPDATE: " + err.message });
        }
    })         


});