import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect, useState } from "react";

export default function Profile({userData, setUserData, viewer, setViewer, setEmail, setPassword}){

    const [image, setImage] = useState(null);
    // const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        // updateProfilePic(userData[0].id);
    };

    // implemented logout 
    const handleLogout = async (e) => {
        // setUserData({});
        setEmail("");
        setPassword("");
        setViewer(4);
        setUserData({});
    }


    // Delete a user by ID
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/user/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
                alert("User deleted successfully");
                setEmail("");
                setPassword("");
                setUserData({});
                setViewer(4);
            } catch (err) {
                alert("There was an error updating the user: " + err);
            }
    };


    // change profile picture
    const updateProfilePic = async (id) => {
        try {
            const formData = new FormData();
            console.log(image);
            formData.append("profile_photo", image);
            formData.append("id", id);
            const response = await fetch(`http://localhost:8081/user/profile_photo/${id}`, {
                method: "PUT",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to update user");
            }
                alert("User updated successfully");
                setImage(null);
                // setPreview(null);
            } catch (err) {
                alert("There was an error deleting the user: " + err);
            }

            // retrieve the user in image in userData?
            try {
                const getinfo = await fetch(`http://localhost:8081/user/${encodeURIComponent(userData[0].email)}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", }
                });
                if (!getinfo.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await getinfo.json();
                setUserData(data);
                // setViewer(5);
            } catch (err){
                alert("There was an Error finding the user: "+err);
            }
    };



    // implement being able to upload images to gallery and profile, and change bio text (put methods)

    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
            <div className="container p-5 my-4" id="profilePageDisplay">
                <div className="row" >
                    <div class="col-lg-4" style={{textAlign:'center'}}>
                        {/* add ability to change profile photo? */}
                        {userData[0].profile_photo && (
                            <div>
                                <img
                                    src={`http://localhost:8081${userData[0].profile_photo}`}
                                    alt={userData[0].user + '\'s profile photo'}
                                    id="profPhoto"
                                    style={{position: 'relative', width: 15+'em', height: 15+'em', borderRadius: 50+'%', overflow:'hidden', objectFit: 'cover'}}
                                />
                                <div class="input-group mb-3 my-4" style={{maxWidth:450+'px'}}>
                                    <input type="file" id="uploadingFile" className="form-control" onChange={handleImageChange} />
                                    <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                </div>
                            </div>
                        )}
                        {!userData[0].profile_photo && (
                            <div>
                                <img className="img-fluid"
                                src={"./images/noPhoto.jpg"}
                                alt={userData[0].user + '\'s profile photo'}
                                id="galleryphoto1"
                                style={{position: 'relative', width: 15+'em', height: 15+'em', borderRadius: 50+'%', overflow:'hidden', objectFit: 'cover'}}
                                />  
                                <div class="input-group mb-3 my-4">
                                    <input type="file" className="form-control" onChange={handleImageChange} />
                                    <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                </div>
                             </div>
                        )}
                        <h1 className="fw-normal my-3">{userData[0].user}</h1>
                        <p className="my-2">{userData[0].first_name} {userData[0].last_name}</p>
                        <div className="d-flex flex-column my-4 ">
                            <div>
                            <button className="btn btn-outline-light px-4" type="button" style={{backgroundColor:'#7C2529'}}><a href="mailto: ${email}" style={{color:'white', textDecoration:'none'}}>Contact Me</a></button>
                            </div>
                            <div>
                            <button className="btn btn-outline-light px-4 my-2"  onClick={handleLogout} type="button" style={{backgroundColor:'#7C2529'}}>Logout</button>
                            </div>
                            <div>
                            <button className="btn btn-outline-light px-4 my-1"  onClick={() => deleteUser(userData[0].id)} type="button" style={{backgroundColor:'#4A4A4A'}}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7" id="aboutmetext" style={{textAlign:'left'}}>
                        <h2 class="fw-normal my-3">All About Me</h2>
                        <p>{userData[0].bio}</p>
                        <div class="container text-center">
                            <div class="row" id="image-gallery">
                                {/* gallery image 1 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                    {userData[0].gallery1 && (
                                        <div>
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${userData[0].gallery1}`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto1"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                        <div class="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                        
                                    ) && (<button type="button" className="btn btn-outline-secondary">Secondary</button>)}
                                    {!userData[0].gallery1 && ( <div>
                                        <img className="img-fluid"
                                        src={"./images/noPhoto.jpg"}
                                        alt={userData[0].user + '\'s gallery photo'}
                                        id="galleryphoto1"
                                        style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        /> 
                                        <div class="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}" style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    <p class="my-1">{userData.caption1}</p>
                                </div >
                                {/* gallery image 2 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                {userData[0].gallery2 && (
                                        <div>
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${userData[0].gallery2}`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto2"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                        <div class="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                    )}
                                    {!userData[0].gallery2 && (
                                        <div>
                                            <img className="img-fluid"
                                            src={"./images/noPhoto.jpg"}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto2"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <div class="input-group mb-3 my-4">
                                                <input type="file" className="form-control" onChange={handleImageChange} />
                                                <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                            </div>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}"  style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    <p class="my-1">{userData.caption2}</p>
                                </div>
                                {/* gallery image 3 */}
                                <div className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                    {userData[0].gallery3 && (
                                        <div>
                                        <img className="img-fluid"
                                            src={`http://localhost:8081${userData[0].gallery3}`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto3"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        />
                                        <div class="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                    )}
                                    {!userData[0].gallery3 && (
                                        <div>
                                            <img className="img-fluid"
                                            src={"./images/noPhoto.jpg"}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto3"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <div class="input-group mb-3 my-4">
                                                <input type="file" className="form-control" onChange={handleImageChange} />
                                                <button type="button" onClick={()=>updateProfilePic(userData[0].id)} className="btn btn-outline-secondary">Upload</button>
                                            </div>
                                        </div>
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