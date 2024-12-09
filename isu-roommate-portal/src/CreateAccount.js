import Navbar from "./Navbar";
import Footer from "./Footer";
// import 

export default function CreateAccount({dataF, setDataF, viewer, setViewer, username, setUsername, password, setPassword, email, setEmail}) {


    const handleAccountCreation = async (e) => {

    }

    return (
        <div>
            <Navbar dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>
            {/* <!-- sign in / sign up --> */}
                <main className="form-signin w-100 m-auto" id="formContainer">
                <h1 className="h3 mb-3 fw-normal my-5">Create a New Account</h1>
                <form>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Email Address" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Username" id="createNewUsername"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" placeholder="Password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                    {/* </form> */}
                        <button className="btn btn-primary w-100 py-2 gy-2 my-2 " type="submit" style={{backgroundColor:'#7C2529'}}>Create Account</button>
                        <p className="my-3">Already have an account?</p>
                        <button className="btn btn-primary w-100 py-2" onClick={() => setViewer(4)} id="loginButton" style={{backgroundColor:'#7C2529'}}>Back to sign in</button>
                        {/* <p className="mt-5 mb-3 text-body-secondary">(for grading purposes) login with:<br/> e: khoyme@iastate.edu p: password <br/> or e: moseleyc@iastate.edu p: password <br/> or e: bbb@iastate.edu p: bbrules</p> */}
                    </form>
                    <div id="loginuser"></div>
                    {/* </div> */}
                </main>

            <Footer />
        </div>
    );

}