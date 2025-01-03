import Navbar from "./Navbar";
import "./styles/index.css";
import Footer from "./Footer";
import { useState } from "react";

function Homepage({userData, setUserData, viewer, setViewer}) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // go to the previous image
  const handlePrev = () => {
      if (currentImageIndex === 0){
        setCurrentImageIndex(2);
      } else {
        setCurrentImageIndex(currentImageIndex-1);
      }
      
  };

  // go to the next image
  const handleNext = () => {
    if (currentImageIndex === 2){
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex(currentImageIndex+1);
      }
  };

    return (
        <div>

            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>

            {/* <!-- welcome message --> */}
                <div className="mx-auto" style={{padding:60 +'px', margin:'auto', backgroundColor: '#C8102E', color:'#F5F5F5', overflow: 'hidden', textAlign:'center', border: 10+'px #F1BE48', borderStyle: 'dashed none'}}>
                    <h1 id="welcome-msg" className="mx-auto" style={{fontFamily: 'Merriweather serif', fontSize: 50 +'px'}}>Welcome to the Iowa State University Roommate Portal!</h1>
                </div>
                <div className="container-fluid" id="div-1" style={{backgroundColor: '#F5F5F5', position: 'relative'}}> 
                    <div className="row mx-0 gx-3 justify-content-center">
                        <div className="col-12 col-md-6 my-auto" id="div-1-texts">
                            <p className="mb-1"><strong>Iowa State University Roommate Portal</strong></p>
                            <h1 style={{color:'#C8102E'}}>Find The Perfect Roommate!</h1>
                            <p className="mb-3">Create an account today to find your ideal roommate at Iowa State.<br/>Or, if you are an existing user, log in.</p>
                            <button type="button" className="btn btn-outline-danger" id="toSignupButton" onClick={() => setViewer(6)}>Sign Up</button>
                            <button type="button" className="btn btn-outline-danger" id="toLoginButton"  onClick={() => setViewer(4)}>login</button>
                        </div>
                        <div className="col-12 col-md-6 my-auto" id="camp-img" style={{textAlign: 'center'}}>
                            <img className="img-fluid" style={{maxWidth: 546.4+'px', maxHeight: 364.71 + 'px', width: 100+'%', height: 'auto'}} src={`http://localhost:8081/images/campanile.jpg`} ></img>
                        </div>
                    </div>
                </div>

                <div className="container-fluid" id="div-2" style={{backgroundColor: 'white', position: 'relative'}}> 
                    <div className="row mx-0 gx-4 justify-content-center">
                        <div className="col-12 col-md-6 my-auto" id="camp-img" style={{textAlign: 'center'}}>
                            {/* <!-- object-fit: cover; allows the image to be cropped without distorting it --> */}
                            <img className="img-fluid" style={{maxWidth: 546.4+'px', maxHeight: 364.71 +'px', width: 100+'%', height: 'auto', objectFit: 'cover'}}  src={`http://localhost:8081/images/collegeRoommateStory.jpg`}></img>
                        </div>
                        <div className="col-12 col-md-6 my-auto" id="div-1-texts">
                            <p className="mb-1"><strong>Hear from one of our first users</strong></p>
                            <h1 style={{color:'#C8102E'}}>Success Story</h1>
                            <blockquote className="blockquote mb-3">
                                <p>"I used Iowa State Roommate Portal to find my roommate freshman year. We got along so well, and we still live together now that we are in our senior year here! I am so grateful this website helped me find her!" - Emily</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
        
                {/* <!-- Features --> */}
                <div className="" style={{backgroundColor: '#F5F5F5', width: 100+'%', paddingBottom: 2+'em', paddingTop: 2+'em'}}>
                <h1 style={{textAlign:'center'}}>Features</h1>
                <div className="mx-auto" style={{display:'flex', flexDirection:'row', margin:'auto', justifyContent: 'center', alignItems: 'center'}}>
                    <button type="button" className="btn btn-danger my-auto mx-4" id="control-prev" onClick={(e)=>handlePrev()} style={{height:50+'px', width:50+'px'}}><strong>{'<'}</strong></button>
                    <div id="carousel-group"style={{backgroundColor: '#F5F5F5'}}>
                        <div id="my-carousel">
                            {currentImageIndex===0 &&
                            <div style={{position: 'relative', maxWidth: 546.4+'px', maxHeight: 364.71+'px', margin: 'auto'}}>
                                <img src= {`http://localhost:8081/images/collegeStudent.jpg`} class="d-block w-100" alt="A photo of a college student wearing a yellow blouse holding a red binder." style={{width: 100+'%', height:'auto', objectFit: 'cover'}}/>
                                <div class="carousel-text" id="carousel-text" style={{position: 'absolute', width:90+'%', top: 80+'%', left: 50+'%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white'}}>
                                    <h5>Create An Account</h5>
                                    <p>Create your free account today to start the roommate search! Fill out any information about yourself you wish to share with your potential roommate matches.</p>
                                </div>
                            </div>
                            }
                            {currentImageIndex===1 && 
                                <div style={{position: 'relative', maxWidth: 546.4+'px', maxHeight: 364.71+'px', margin: 'auto'}}>
                                    <img src= {`http://localhost:8081/images/collegeStudentsTalking.jpg`} class="d-block w-100" alt="A group of college students laughing together around a table" style={{width: 100+'%', height:'auto', objectFit: 'cover'}}/>
                                    <div class="carousel-text" id="carousel-text" style={{position: 'absolute', width:90+'%', top: 80+'%', left: 50+'%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white'}}>
                                        <h5>Match With Potential Roommates</h5>
                                        <p>Be matched with potential roommates with similar lifestyles, habits, and interests. Talk with them to discover if you would be a good fit!</p>
                                    </div>
                                </div>
                            }
                            {currentImageIndex===2 && 
                                <div style={{position: 'relative', maxWidth: 546.4+'px', maxHeight: 364.71+'px', margin: 'auto'}}>
                                    <img src= {`http://localhost:8081/images/Beardshear.jpg`} class="d-block w-100" alt="A photo of beardshear hall from Iowa State University" style={{width: 100+'%', height:'auto', objectFit: 'cover'}}/>
                                    <div class="carousel-text" id="carousel-text" style={{position: 'absolute', width:90+'%', top: 80+'%', left: 50+'%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white'}}>
                                        <h5>Housing</h5>
                                        <p>Discover the buildings you can live at around campus!</p>
                                    </div>
                                </div>
                            }   
                        </div>
                    </div>


                    <button type="button" className="btn btn-danger my-auto mx-4" id="control-next" onClick={(e)=>handleNext()} style={{height:50+'px', width:50+'px'}}><strong>{'>'}</strong></button>
                    </div>
                </div>
                

            <Footer/>
        </div>
    );

}

export default Homepage;