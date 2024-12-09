import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect, useState } from "react";

export default function Profile({userData, setUserData, viewer, setViewer}){

    // implement profile logging in across all views 

    // implement being able to upload images to gallery and profile, and change bio text (put methods)

    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
            <div className="container p-5 my-4" id="profilePageDisplay">
                <div className="row" >
                    <div class="col-lg-4" style={{textAlign:'center'}}>
                        {/* add ability to change profile photo? */}
                        {userData[0].profile_photo && (
                        <img
                            src={`http://localhost:8081${userData[0].profile_photo}`}
                            alt={userData[0].user + '\'s profile photo'}
                            id="profPhoto"
                            style={{position: 'relative', width: 15+'em', height: 15+'em', borderRadius: 50+'%', overflow:'hidden', objectFit: 'cover'}}
                        />
                        )}
                        <h2 class="fw-normal my-3">{userData[0].user}</h2>
                        <p>{userData[0].first_name} {userData[0].last_name}</p>
                        <button class="btn btn-outline-light" type="button" style={{backgroundColor:'#7C2529'}}><a href="mailto: ${email}" style={{color:'white', textDecoration:'none'}}>Contact Me</a></button>
                    </div>
                    <div class="col-lg-7" id="aboutmetext" style={{textAlign:'left'}}>
                        <h2 class="fw-normal my-3">All About Me</h2>
                        <p>{userData[0].bio}</p>
                        <div class="container text-center">
                            <div class="row" id="image-gallery">
                                {/* gallery image 1 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                    {userData[0].gallery1 && (
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${userData[0].gallery1}`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto1"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                    )}
                                    {!userData[0].gallery1 && (
                                        <img className="img-fluid"
                                        src={"./images/noPhoto.jpg"}
                                        alt={userData[0].user + '\'s gallery photo'}
                                        id="galleryphoto1"
                                        style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                    />
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}" style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    <p class="my-1">{userData.caption1}</p>
                                </div >
                                {/* gallery image 2 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                {userData[0].gallery2 && (
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${userData[0].gallery2}`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto2"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                    )}
                                    {!userData[0].gallery2 && (
                                        <img className="img-fluid"
                                        src={"./images/noPhoto.jpg"}
                                        alt={userData[0].user + '\'s gallery photo'}
                                        id="galleryphoto2"
                                        style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                    />
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}"  style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    <p class="my-1">{userData.caption2}</p>
                                </div>
                                {/* gallery image 3 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                    {userData[0].gallery3 && (
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${userData[0].gallery3}`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto3"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                    )}
                                    {!userData[0].gallery3 && (
                                        <img className="img-fluid"
                                        src={"./images/noPhoto.jpg"}
                                        alt={userData[0].user + '\'s gallery photo'}
                                        id="galleryphoto3"
                                        style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                    />
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}"  style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    <p class="my-1">{userData.caption3}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}