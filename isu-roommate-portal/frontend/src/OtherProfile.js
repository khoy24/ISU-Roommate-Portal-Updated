import Navbar from "./Navbar"
import Footer from "./Footer"

export default function OtherProfile({userData, setUserData, viewer, setViewer, otherUserData}){


    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
            <div className="container p-5 my-4" id="profilePageDisplay">
                <div className="row" >
                    <div class="col-lg-4" style={{textAlign:'center'}}>
                        {/* add ability to change profile photo? */}
                        {otherUserData.profile_photo && (
                            <div>
                                <img
                                    src={`http://localhost:8081${otherUserData.profile_photo}`}
                                    alt={otherUserData.user + '\'s profile photo'}
                                    id="profPhoto"
                                    style={{position: 'relative', width: 15+'em', height: 15+'em', borderRadius: 50+'%', overflow:'hidden', objectFit: 'cover'}}
                                />
                            </div>
                        )}
                        {!otherUserData.profile_photo && (
                            <div>
                                <img className="img-fluid"
                                src={"./images/noPhoto.jpg"}
                                alt={otherUserData.user + '\'s profile photo'}
                                id="galleryphoto1"
                                style={{position: 'relative', width: 15+'em', height: 15+'em', borderRadius: 50+'%', overflow:'hidden', objectFit: 'cover'}}
                                />  
                                
                             </div>
                        )}
                        <h1 className="fw-normal my-3">{otherUserData.user}</h1>
                        <p className="my-2">{otherUserData.first_name} {otherUserData.last_name}</p>
                        <div className="d-flex flex-column my-4 ">
                            <div>
                            <button className="btn btn-outline-light px-4" type="button" style={{backgroundColor:'#7C2529'}}><a href={`mailto:${otherUserData.email}`} style={{color:'white', textDecoration:'none'}}>Contact Me</a></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7" id="aboutmetext" style={{textAlign:'left'}}>
                        <h2 className="fw-normal my-3">All About Me</h2>
                        <p>{otherUserData.bio}</p>

                        <div className="container text-center">
                            <div className="row" id="image-gallery">
                                {/* gallery image 1 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                    {otherUserData.gallery1 && (
                                        <div>
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${otherUserData.gallery1}`}
                                            alt={otherUserData.user + '\'s gallery photo'}
                                            id="galleryphoto1"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                        <p class="mt-2">{otherUserData.caption1}</p>
                                        </div>
                                        
                                    )}
                                    {!otherUserData.gallery1 && ( <div>
                                        <img className="img-fluid"
                                        src={"./images/noPhoto.jpg"}
                                        alt={otherUserData.user + '\'s gallery photo'}
                                        id="galleryphoto1"
                                        style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        /> 
                                        <p clasNames="mt-2">{otherUserData.caption1}</p>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}" style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    {/* <p class="my-1">{otherUserData.caption1}</p> */}
                                </div >
                                {/* gallery image 2 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                {otherUserData.gallery2 && (
                                        <div>
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${otherUserData.gallery2}`}
                                            alt={otherUserData.user + '\'s gallery photo'}
                                            id="galleryphoto2"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                        <p className="mt-2">{otherUserData.caption2}</p>
                                        </div>
                                    )}
                                    {!otherUserData.gallery2 && (
                                        <div>
                                            <img className="img-fluid"
                                            src={"./images/noPhoto.jpg"}
                                            alt={otherUserData.user + '\'s gallery photo'}
                                            id="galleryphoto2"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <p className="mt-2">{otherUserData.caption2}</p>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}"  style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    {/* <p class="my-1">{otherUserData.caption2}</p> */}
                                </div>
                                {/* gallery image 3 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                    {otherUserData.gallery3 && (
                                        <div>
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${otherUserData.gallery3}`}
                                            alt={otherUserData.user + '\'s gallery photo'}
                                            id="galleryphoto3"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                        <p className="mt-2">{otherUserData.caption3}</p>
                                        </div>
                                    )}
                                    {!otherUserData.gallery3 && (
                                        <div>
                                            <img className="img-fluid"
                                            src={"./images/noPhoto.jpg"}
                                            alt={otherUserData.user + '\'s gallery photo'}
                                            id="galleryphoto3"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <p className="mt-2">{otherUserData.caption3}</p>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}"  style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    {/* <p class="my-1">{otherUserData.caption3}</p> */}
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