import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/authors.css";

export default function Authors({userData, setUserData, viewer, setViewer}) {

    return (
        <div>
            <body>
                <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>

                <main>
                    <div className="container py-4" >
                        <header className="pb-3 mb-4">
                                <span className="fs-4" style={{fontFamily: 'Merriweather serif'}}>Meet the Authors of the ISU Roommate Portal!</span>
                        </header>

                        <div className="p-3 mb-4 bg-body-tertiary rounded-3" style={{ borderRadius: 5+'px', backgroundImage: 'linear-gradient(white, white), linear-gradient(to left, #C8102E, #F1BE48)',
                            backgroundOrigin: 'border-box', backgroundClip: 'content-box, border-box'}}>
                            <div className="container-fluid py-5 px-5">
                                <h1 className="display-5 fw-bold">COM S 3190 Construction of User Interfaces, Fall 2024</h1>
                                <p className="col-md-8 fs-4">Professor: Dr. Abraham Aldaco</p>
                                <p className="col-md-8 fs-4">Date: 12/11/24</p>
                            </div>
                        </div>

                        <div className="row align-items-md-stretch gy-3">
                            <div className="col-md-6">
                                <div className="h-100 p-5 text-bg-dark rounded-3 card-bg-dark">
                                    <h2>Kaitlyn Hoyme</h2>
                                    <p>Email: khoyme@iastate.edu</p>
                                    <button className="btn btn-outline-light" type="button" style={{backgroundColor:'white'}}><a href="mailto: khoyme@iastate.edu" style={{color:'#7C2529', textDecoration:'none'}}>Contact Me</a></button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="h-100 p-5 bg-body-tertiary border rounded-3 card-bg-light">
                                    <h2>Christoper Moseley</h2>
                                    <p>Email: moseleyc@iastate.edu</p>
                                    <button className="btn btn-outline-light" style={{backgroundColor:'white'}} type="button"><a href="mailto: moseleyc@iastate.edu" style={{color:'#7C2529', textDecoration:'none'}}>Contact Me</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </body>
            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    )
}

