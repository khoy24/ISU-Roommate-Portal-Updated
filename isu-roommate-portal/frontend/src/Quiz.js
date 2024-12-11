import Navbar from "./Navbar";
import "./styles/Quiz.css";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Quiz({userData, setUserData, viewer, setViewer, setOtherUserData}) {

    // const [signedIn, setSignedIn] = useState(0); // 0  = not signed in 
    const [quizData, setQuizData] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [similarUsers, setSimilarUsers] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { register, formState: { errors } } = useForm();

    useEffect(() => {
        fetch("http://localhost:8081/quiz")
        .then((response) => response.json())
        .then((data) => {
            setQuizData(data);
        })
        .catch((error) => {
            console.error("Error fetching quiz data: ", error);
        });
    }, []);

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setQuizAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };




    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     console.log("Form submitted");
    //     console.log(quizAnswers);
    //     // console.log(userData[0].id);
    //     if (!userData || !userData[0].id) {
    //         console.error("Please log in.");
    //         return;
    //     }
    
    //     // Prepare data to send to the server
    //     const submissionData = {
    //         user_id: userData[0].id,  // Assuming userData contains the user info
    //         ...quizAnswers,        // Spread the quiz answers (e.g., { q1: 'Yes', q2: 'No', ... })
    //     };
    //     console.log("Submission Data:", submissionData);
    //     // Send data to the server (POST request)
    //     fetch("http://localhost:8081/submitQuiz", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(submissionData),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         // Handle successful submission (e.g., show a success message)
    //         console.log("Quiz submitted successfully:", data);
    //     })
    //     .catch((error) => {
    //         // Handle error
    //         console.error("Error submitting quiz:", error);
    //     });
    // };

    const handleSubmit = async () => {
        try {

            if (!userData || !userData[0]?.id) {
                alert("You must sign in before submitting the quiz");
                return;
            }

            const transformedKeys = Object.keys(quizAnswers).reduce((acc, key) => {
                const newKey = 'q' + key.replace('question', '');
                acc[newKey] = quizAnswers[key];
                return acc;
            }, {});
    
            const submissionData = {
                user_id: userData[0].id,
                ...transformedKeys,
            };
    
            console.log("Submission Data:", submissionData);
    
            // First, check if quiz results exist
            const checkResponse = await fetch(`http://localhost:8081/quizResult/${userData[0].id}`);
    
            if (!checkResponse.ok) {
                // If quiz results do not exist (404), create new quiz results
                const errorText = await checkResponse.text();
                if (checkResponse.status === 404) {
                    alert("No previous quiz results found. Creating new results.");
                    // Call POST method to submit the quiz if no results exist
                    const response = await fetch("http://localhost:8081/submitQuiz", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(submissionData),
                    });
    
                    if (!response.ok) {
                        const errorText = await response.text();
                        alert("Error submitting quiz results: " + errorText);
                    } else {
                        const successMessage = await response.json();
                        alert(successMessage.message);
                        findSimilarUsers(submissionData.user_id);
                    }
                }
            } else {
                // If quiz results exist (200), update them with PUT method
                const response = await fetch(`http://localhost:8081/quizResult/${userData[0].id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(submissionData),
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    alert("Error updating quiz results: " + errorText);
                } else {
                    const successMessage = await response.json();
                    alert(successMessage.message);

                    findSimilarUsers(submissionData.user_id);
                }
            }
            setFormSubmitted(true);
        } catch (err) {
            alert("An error occurred: " + err);
        }
    };


    const findSimilarUsers = async () => {
        const userID = userData[0].id;
        const response = await fetch(`http://localhost:8081/findSimilarUsers/${userID}`);
    
        if (response.ok) {
            const similarUsers = await response.json();
            setSimilarUsers(similarUsers);  // Store the similar users in the state
            console.log("Similar users:", similarUsers);
            
            // Optionally, log the user details
            similarUsers.forEach(user => {
                setOtherUserData(user.userDetail);
                console.log(`User ID: ${user.user_id}`);
                console.log(`Email: ${user.email}`);
                console.log(`First Name: ${user.first_name}`);
                console.log(`Last Name: ${user.last_name}`);
                console.log(`Score: ${user.score}`);
                console.log(user);
            });
        } else {
            alert("Error getting other users");
        }
    };
    
     // updates the page with the user's info. Called each time it changes. 
     const updatePage = async (email) => {
        try {
            const getinfo = await fetch(`http://localhost:8081/user/${encodeURIComponent(email)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            });
            if (!getinfo.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await getinfo.json();
            setOtherUserData(data[0]);
            console.log(data);
            setViewer(8);
        } catch (err){
            alert("There was an Error finding the user: "+err);
        }
    }
    
    
    
    
    


    return (
        <div>

            <body style={{backgroundColor: '#f5f5f5'}} className="prevent-select">
                <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>

                <header>
                    <div className="mx-auto" style={{padding: 20+'px', margin: 'auto', backgroundColor: '#C8102E', color: '#F5F5F5', overflow: 'hidden', textAlign: 'center', marginBottom: 20+'px'}}>
                        <h1 className="mx-auto" style={{fontSize: 50+'px', fontFamily: 'Merriweather serif'}}>Roommate Quiz</h1>
                    </div>
                </header>

                <div className="container" style={{marginBottom: 20+'px'}}>
                    {/* This is for using a dropdown option */}
                {/* <form id="QuizBody" onSubmit={handleSubmit}>
            {quizData.length > 0 ? (
              quizData.map((question) => (
                <div key={question.id} style={{ marginBottom: "15px" }}>
                  <label htmlFor={`question${question.id}`} style={{ fontWeight: "bold" }}>
                    {question.question}
                  </label>
                  <br />
                  <select
                    name={`question${question.id}_1`}
                    id={`question${question.id}_1`}
                    value={quizAnswers[`question${question.id}_1`] || question.Value1}
                    onChange={handleInputChange}
                  >
                    <option value={question.Value1}>{question.Value1}</option>
                    {question.Value2 && <option value={question.Value2}>{question.Value2}</option>}
                    {question.Value3 && <option value={question.Value3}>{question.Value3}</option>}
                  </select>
                </div>
              ))
            ) : (
              <p>Loading quiz...</p>
            )}
          </form> */}

                    {/* This is for using radio buttons */}
                    <form id="QuizBody" className=" w-100 m-auto justify-content-center" onSubmit={handleSubmit}>
                        {!userData[0]?.id &&
                            <div className="justify-content-center text-align-center">
                                <h1 className="my-5" style={{textAlign:'center'}}>Sign in before taking the quiz</h1>
                            </div>
                        }
                        {userData[0]?.id && quizData.length > 0 ? (
                        quizData.map((q) => (
                            <div key={q.id} style={{ marginBottom: "15px" }}>
                            <label htmlFor={`question${q.id}`} style={{ fontWeight: "bold" }}>
                                {q.question}
                            </label>
                            <br />
                            {/* Radio buttons for Value1, Value2, and Value3 */}
                            <div>
                                <input
                                type="radio"

                                name={`question${q.id}`}
                                value={q.Value1}
                                id={`question${q.id}_1`}
                                checked={quizAnswers[`question${q.id}`] === q.Value1}
                                onChange={handleInputChange}
                                />
                                <label htmlFor={`question${q.id}_1`} style={{marginLeft: "10px"}}>{q.Value1}</label>
                            </div>

                            {q.Value2 && (
                                <div>
                                <input
                                    type="radio"
                                    name={`question${q.id}`}
                                    value={q.Value2}
                                    id={`question${q.id}_2`}
                                    checked={quizAnswers[`question${q.id}`] === q.Value2}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={`question${q.id}_2`} style={{marginLeft: "10px"}}>{q.Value2}</label>
                                </div>
                            )}

                            {q.Value3 && (
                                <div>
                                <input
                                    type="radio"
                                    name={`question${q.id}`}
                                    value={q.Value3}
                                    id={`question${q.id}_3`}
                                    checked={quizAnswers[`question${q.id}`] === q.Value3}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={`question${q.id}_3`} style={{marginLeft: "10px"}}>{q.Value3}</label>
                                </div>
                            )}
                            </div>
                        ))
                        ) : (
                        // <p>Loading quiz...</p>
                        <p></p>
                        )}
                    </form>

                    {/* <a href="./index.html"> */}
                    {userData[0]?.id && <button type="submit" id="submitBtn" className="btn btn-outline-danger" style={{marginTop: 15+'px'}} onClick={handleSubmit}>Submit Quiz</button>
                    }
                    {!userData[0]?.id && 
                        <div className="d-flex justify-content-center">
                            <button  id="submitBtn" className="btn btn-outline-danger py-2 gy-2 my-2 " style={{marginTop: 15+'px'}} onClick={(e)=>setViewer(4)}>To Login</button>
                        </div>
                    }
                    {/* </a> */}
                    
                    {formSubmitted && (
                        <h3 className="my-3" style={{ paddingTop: '50px' }}>
                            Top Matches
                        </h3>
                    )}
                    
                    {similarUsers.length > 0 && (
                        <div className="row mt-4">
                            {similarUsers.map((user) => (
                                <div className="col-md-4" key={user.user_id}>
                                    <div className="card" style={{ marginBottom: '20px' }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                                            <p className="card-text">Email: {user.email}</p>
                                            <p className="card-text">Score: {user.score}</p>
                                            <button className="btn btn-danger" onClick={(e)=>{updatePage(user.email)}}>View User's Profile</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Footer/>
            </body>

        </div>
    )
}