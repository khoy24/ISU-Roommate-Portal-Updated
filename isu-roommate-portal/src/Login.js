import Navbar from "./Navbar"
import Footer from "./Footer"
import './styles/profile.css'
import { useState, useEffect } from "react"

export default function Login ({userData, setUserData, viewer, setViewer, password, setPassword, email, setEmail}) {

    // causes a small delay on the load, could move this to 
    useEffect(() => {
            if (Object.keys(userData).length !== 0){
                setViewer(5);
            }
    });

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        try {
            e.preventDefault();
            const response = await fetch("http://localhost:8081/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                setEmail("");
                // setUsername("");
                setPassword("");
                return;
            }

            try {
                e.preventDefault();
                const getinfo = await fetch(`http://localhost:8081/user/${encodeURIComponent(email)}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", }
                });
                if (!getinfo.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = await getinfo.json();
                setUserData(data);
                console.log(data);
                console.log(userData);

            } catch (err){
                alert("There was an Error finding the user: "+err);
            }

            // setUsername(username);
            console.log(email, password);
            setViewer(5);

        } catch (err){
            console.log("Failed to log in. Please try again."+err);
            setError("Failed to log in. Please try again. " + err);
            setEmail("");
            // setUsername("");
            setPassword("");

        }

    };

    // const updateHooks = (username) =>{
    //     // setViewer(number);
    //     setUsername(username);
    //     // console.log(number)
    // };

    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
            {/* <!-- sign in / sign up --> */}
                <main className="form-signin w-100 m-auto" id="formContainer">
                    <form className="my-5" id="loginForm" onSubmit={handleLogin}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    
                        <div className="form-floating">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="userInput" placeholder="name@example.com" required />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="passwordInput" placeholder="Password" required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    
                        {/* <!-- not implement the remember me yet --> */}
                        {/* <div class="form-check text-start my-3">
                            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                            <label class="form-check-label" for="flexCheckDefault">
                            Remember me
                            </label>
                        </div> */}

                        <button className="btn btn-primary w-100 py-2" type="submit" id="loginButton" style={{backgroundColor:'#7C2529'}}>Sign in</button>
                        <button class="btn btn-primary w-100 py-2 gy-2 my-2 " onClick={() => setViewer(6)} style={{backgroundColor:'#7C2529'}}>Create Account</button>
                        {/* <p className="mt-5 mb-3 text-body-secondary">(for grading purposes) login with:<br/> e: khoyme@iastate.edu p: password <br/> or e: moseleyc@iastate.edu p: password <br/> or e: bbb@iastate.edu p: bbrules</p> */}
                    </form>
                    <div id="loginuser"></div>
                    {/* </div> */}
                </main>

            <Footer />
        </div>
    )
            
    
}