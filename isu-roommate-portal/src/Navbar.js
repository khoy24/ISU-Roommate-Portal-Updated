
import "bootstrap/dist/css/bootstrap.css";



function Navbar() {

    return (
        <div>
            {/* navigation bar */}
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <img src="myotherimages/isulogo-nobg.png" alt="Iowa State University Logo" style={{height: 28+'px', marginLeft: 2+'em'}}></img>
                    {/* <!-- margin-left auto in style make s it so that it floats to the right --> */}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{marginLeft:'auto'}}>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {/* <!-- add justify-content-end to the class to right align --> */}
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <a class="nav-link" aria-current="Home page" href="./index.html">Home</a>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <a class="nav-link" href="./housing.html">Housing</a>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <a class="nav-link" href="./quiz.html">Quiz</a>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <a class="nav-link active" href="./authors.html">Authors</a>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <a class="nav-link" id="p-icon" href="./profile.html"><img src="myotherimages/profileIcon.png" style={{height: 20 +'px', marginBottom: .5 +'em', marginRight: .5 +'em'}}></img></a>
                                <a class="nav-link d-none" id="p-text" href="./profile.html"><span id="profile-text">Profile</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}


export default Navbar;