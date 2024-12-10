
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

    // First, delete quiz results for the user
    const quizQuery = "DELETE FROM quizresults WHERE user_id = ?";
    db.query(quizQuery, [id], (err, result) => {
        if (err) {
            console.error("Error deleting quiz results: ", err);
            return res.status(500).send({error: "An unexpected error occurred while deleting quiz results"});
        }

        // If quiz results are deleted successfully, then proceed to delete the user
        const query = "DELETE FROM users WHERE id = ?";
        db.query(query, [id], (err, result) => {
            try {
                if (result.affectedRows === 0) {
                    res.status(404).send({err: "User not found"});
                } else {
                    res.status(200).send("User deleted successfully");
                }
            } catch (err) {
                // Handle synchronous errors
                console.error("Error in DELETE /user:", err);
                res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
            }
        });
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
                // console.log(profile_photo);
                // console.log(id);
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


// change a user's bio
// needed to add the upload.none() to pass in multer to allow for bio to be brought in from the formdata. No images needed so .none()
app.put("/user/bio/:id", upload.none(), (req, res) => {

    const id = req.params.id;
    const { bio } = req.body;

    const query = `
    UPDATE users
    SET bio = ?
    WHERE id = ?
    `;

    // console.log(gallery_image);

    db.query(query, [bio, id], (err, result) => {

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

// change a users gallery captions
app.put("/user/caption/:id/:caption_number", upload.none(), (req, res) => {

    const id = req.params.id;
    const {caption} = req.body;
    const caption_number = req.params.caption_number;
    const query = `
    UPDATE users
    SET caption${caption_number} = ?
    WHERE id = ?
    `;
    db.query(query, [caption, id], (err, result) => {

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


// get quiz questions
app.get('/quiz', (req, res) => {
    try {
        db.query("SELECT * FROM quiz", (err, result) => {
            if (err) {
                console.error({error:"error reading all questions: "+err});
                return res.status(500).send({error: "error reading all questions"})
            }
            res.status(200).send(result);
        });
    } catch {
        console.error({ error: "An unexpected error occurred"+err});
        res.status(500).send({error: "An unexpected error occurred"+err});
    }
});

app.post('/submitQuiz', (req, res) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, user_id } = req.body;

    // Perform any necessary database operations
    const query = `
        INSERT INTO quizresults (user_id, q1, q2, q3, q4, q5, q6, q7, q8, q9)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [user_id, q1, q2, q3, q4, q5, q6, q7, q8, q9], (err, result) => {
        if (err) {
            console.error('Error inserting quiz results:', err);
            return res.status(500).json({ error: 'Error saving quiz results' });
        }
        res.status(200).json({ message: 'Quiz saved successfully' });
    });
});

//retrieve quiz results for user
app.get('/quizResult/:user_id', (req, res) => {

    const userID = req.params.user_id;

    // Query to check if the user already has quiz results
    const query = 'SELECT * FROM quizresults WHERE user_id = ?';

    db.query(query, [userID], (err, result) => {
        if (err) {
            console.error('Error checking quiz results:', err);
            return res.status(500).json({ error: 'Error checking quiz results' });
        }

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json(null);
        }
    });
});



// PUT method for updating quiz results
app.put('/quizResult/:user_id', (req, res) => {
    const { user_id } = req.params;
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9 } = req.body;

    // Check if the user already has quiz results
    const checkQuery = 'SELECT * FROM quizresults WHERE user_id = ?';
    
    db.query(checkQuery, [user_id], (err, result) => {
        if (err) {
            console.error('Error checking existing quiz results:', err);
            return res.status(500).json({ error: 'Error checking quiz results' });
        }

        if (result.length === 0) {
            // If no results exist for the user, return a 404 error
            return res.status(404).json({ error: 'No quiz results found for the user' });
        }

        // If results exist, update them
        const updateQuery = `
            UPDATE quizresults
            SET q1 = ?, q2 = ?, q3 = ?, q4 = ?, q5 = ?, q6 = ?, q7 = ?, q8 = ?, q9 = ?
            WHERE user_id = ?
        `;
        
        db.query(updateQuery, [q1, q2, q3, q4, q5, q6, q7, q8, q9, user_id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating quiz results:', updateErr);
                return res.status(500).json({ error: 'Error updating quiz results' });
            }

            // If update is successful, return a success message
            res.status(200).json({ message: 'Quiz results updated successfully' });
        });
    });
});

//find users with similar quiz results
app.get('/findSimilarUsers/:user_id', (req, res) => {
    const userID = req.params.user_id;

    // Step 1: Fetch the target user's answers
    const queryTargetUser = `
        SELECT q1, q2, q3, q4, q5, q6, q7, q8, q9 
        FROM quizresults 
        WHERE user_id = ?;
    `;

    db.query(queryTargetUser, [userID], (err, targetResults) => {
        if (err) {
            console.error("Error fetching target user's answers:", err);
            return res.status(500).json({ error: 'Error fetching target user answers' });
        }

        if (targetResults.length === 0) {
            return res.status(404).json({ error: 'Target user not found' });
        }

        // Extract target user answers
        const targetUserAnswers = [
            targetResults[0].q1,
            targetResults[0].q2,
            targetResults[0].q3,
            targetResults[0].q4,
            targetResults[0].q5,
            targetResults[0].q6,
            targetResults[0].q7,
            targetResults[0].q8,
            targetResults[0].q9
        ];

        // Step 2: Find the other users with the most matching answers
        const queryFindSimilarUsers = `
            SELECT user_id, 
                   (LOWER(TRIM(q1)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q2)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q3)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q4)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q5)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q6)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q7)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q8)) = LOWER(TRIM(?))) + 
                   (LOWER(TRIM(q9)) = LOWER(TRIM(?))) AS score
            FROM quizresults
            WHERE user_id != ? 
            ORDER BY score DESC
            LIMIT 3;
        `;

        // Step 3: Perform the query to find the similar users with matching answers
        db.query(queryFindSimilarUsers, [...targetUserAnswers.map(ans => ans), userID], (err, results) => {
            if (err) {
                console.error("Error finding similar users:", err);
                return res.status(500).json({ error: 'Error finding similar users' });
            }

            // Step 4: Fetch the user details (email, first_name, last_name) for the most similar users
            const userIds = results.map(result => result.user_id);
            if (userIds.length > 0) {
                const userDetailsQuery = `
                    SELECT id, email, first_name, last_name
                    FROM users
                    WHERE id IN (${userIds.join(",")});
                `;

                // Step 5: Query the user details for the similar users
                db.query(userDetailsQuery, (err, userDetails) => {
                    if (err) {
                        console.error("Error getting user details:", err);
                        return res.status(500).json({ error: 'Error getting user details' });
                    }

                    // Combine the similarity score with the user details
                    const resultWithUserDetails = results.map((result) => {
                        const userDetail = userDetails.find(user => user.id === result.user_id);
                        return {
                            user_id: result.user_id,
                            score: result.score,
                            email: userDetail?.email || "Unknown",
                            first_name: userDetail?.first_name || "Unknown",
                            last_name: userDetail?.last_name || "Unknown"
                        };
                    });

                    // Send the combined result back to the client
                    res.status(200).json(resultWithUserDetails);
                });
            } else {
                // No similar users found
                res.status(200).json([]);
            }
        });
    });
});

