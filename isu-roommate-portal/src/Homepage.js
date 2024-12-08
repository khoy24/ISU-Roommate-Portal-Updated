import Navbar from "./Navbar";
import "./styles/index.css";
import Footer from "./Footer";

function Homepage({dataF, setDataF, viewer, setViewer}) {


    return (
        <div>

            <Navbar dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>

            {/* <!-- welcome message --> */}
                <div class="mx-auto" style={{padding:60 +'px', margin:'auto', backgroundColor: '#C8102E', color:'#F5F5F5', overflow: 'hidden', textAlign:'center', border: 10+'px #F1BE48', borderStyle: 'dashed none'}}>
                    <h1 id="welcome-msg" class="mx-auto" style={{fontFamily: 'Merriweather serif', fontSize: 50 +'px'}}>Welcome to the Iowa State University Roommate Portal!</h1>
                </div>

                {/* <!-- div 1 --> */}
                <div class="container-fluid" id="div-1" style={{backgroundColor: '#F5F5F5', position: 'relative'}}> 
                    <div class="row mx-0 gx-3 justify-content-center">
                        <div class="col-12 col-md-6 my-auto" id="div-1-texts">
                            <p class="mb-1"><strong>Iowa State University Roommate Portal</strong></p>
                            <h1 style={{color:'#C8102E'}}>Find The Perfect Roommate!</h1>
                            <p class="mb-3">Create an account today to find your ideal roommate at Iowa State.<br/>Or, if you are an existing user, log in.</p>
                            {/* <!-- we will implement this second button in our final --> */}
                            {/* <!-- <button type="button" class="btn btn-outline-danger" id="toSignupButton">Sign Up</button> --> */}
                            <button type="button" class="btn btn-outline-danger" id="toLoginButton">login</button>
                        </div>
                        <div class="col-12 col-md-6 my-auto" id="camp-img" style={{textAlign: 'center'}}>
                            <img class="img-fluid" style={{maxWidth: 546.4+'px', maxHeight: 364.71 + 'px', width: 100+'%', height: 'auto'}} src="./myotherimages/campanile.jpg"></img>
                        </div>
                    </div>
                </div>

                {/* <!-- div 2 --> */}
                <div class="container-fluid" id="div-2" style={{backgroundColor: 'white', position: 'relative'}}> 
                    <div class="row mx-0 gx-4 justify-content-center">
                        <div class="col-12 col-md-6 my-auto" id="camp-img" style={{textAlign: 'center'}}>
                            {/* <!-- object-fit: cover; allows the image to be cropped without distorting it --> */}
                            <img class="img-fluid" style={{maxWidth: 546.4+'px', maxHeight: 364.71 +'px', width: 100+'%', height: 'auto', objectFit: 'cover'}} src="./myotherimages/collegeRoommateStory.jpg"></img>
                        </div>
                        <div class="col-12 col-md-6 my-auto" id="div-1-texts">
                            <p class="mb-1"><strong>Hear from one of our first users</strong></p>
                            <h1 style={{color:'#C8102E'}}>Success Story</h1>
                            <blockquote class="blockquote mb-3">
                                <p>"I used Iowa State Roommate Portal to find my roommate freshman year. We got along so well, and we still live together now that we are in our senior year here! I am so grateful this website helped me find her!" - Emily</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
        
                {/* <!-- Features --> */}
                <div class="" style={{backgroundColor: '#F5F5F5', width: 100+'%', paddingBottom: 2+'em', paddingTop: 2+'em'}}>
                <h1 style={{textAlign:'center'}}>Features</h1>
                <div class="mx-auto" style={{display:'flex', flexDirection:'row', margin:'auto', justifyContent: 'center', alignItems: 'center'}}>
                    <button type="button" class="btn btn-danger my-auto mx-4" id="control-prev" style={{height:50+'px', width:50+'px'}}><strong>{'<'}</strong></button>
                    <div id="carousel-group"style={{backgroundColor: '#F5F5F5'}}>
                        <div id="my-carousel"></div>
                    </div>
                    <button type="button" class="btn btn-danger my-auto mx-4" id="control-next" style={{height:50+'px', width:50+'px'}}><strong>{'>'}</strong></button>
                    </div>
                </div>
                

            {/* <!-- footer --> */}
            <Footer/>
        </div>
    );

}

export default Homepage;