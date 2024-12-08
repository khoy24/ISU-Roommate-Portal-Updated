import Navbar from "./Navbar"
import Footer from "./Footer"
import './styles/profile.css'
import { useState } from "react"

export default function Login ({dataF, setDataF, viewer, setViewer}) {



    return (
        <div>
            <Navbar dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>
            {/* <!-- sign in / sign up --> */}
                <main className="form-signin w-100 m-auto" id="formContainer">
                    <form className="my-5" id="loginForm">
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    
                        <div className="form-floating">
                            <input type="email" className="form-control" id="userInput" placeholder="name@example.com" required />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="passwordInput" placeholder="Password" required />
                            <label for="floatingPassword">Password</label>
                        </div>
                    
                        {/* <!-- not implement the remember me yet --> */}
                        {/* <div class="form-check text-start my-3">
                            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                            <label class="form-check-label" for="flexCheckDefault">
                            Remember me
                            </label>
                        </div> */}

                        <button className="btn btn-primary w-100 py-2" type="submit" id="loginButton" style={{backgroundColor:'#7C2529'}}>Sign in</button>
                        
                        <button class="btn btn-primary w-100 py-2 gy-2 my-2 " type="submit" style={{backgroundColor:'#7C2529'}}>Create Account</button>
                        <p className="mt-5 mb-3 text-body-secondary">(for grading purposes) login with:<br/> e: khoyme@iastate.edu p: password <br/> or e: moseleyc@iastate.edu p: password <br/> or e: bbb@iastate.edu p: bbrules</p>
                    </form>
                    <div id="loginuser"></div>
                    {/* </div> */}
                </main>

            <Footer />
        </div>
    )
            
    
}