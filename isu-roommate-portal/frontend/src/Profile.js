import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect, useState } from "react";

export default function Profile({userData, setUserData, viewer, setViewer, setEmail, setPassword}){

    const [image, setImage] = useState(null);
    const [bio, setBio] = useState("");
    const [caption, setCaption] = useState(null);

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
            // console.log(image);
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
            updatePage();
    };

    // change gallery photos
    const updateGallery = async (id, gallery_number) => {
        try {
            const formData = new FormData();
            // console.log(image);
            formData.append(`gallery_image`, image);
            formData.append("gallery_number", gallery_number);
            formData.append("id", id);
            const response = await fetch(`http://localhost:8081/user/gallery_image/${id}/${gallery_number}`, {
                method: "PUT",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to update gallery");
            }
                alert("Gallery updated successfully");
                setImage(null);
                // setPreview(null);
            } catch (err) {
                alert("There was an error updating the gallery: " + err);
            }

            updatePage();
    };

     // change bio 
     const updateBio = async (id, bio) => {
        try {
            const formData = new FormData();
            // console.log(image);
            console.log(bio);
            formData.append("bio", bio);
            // formData.append("id", id);
            const response = await fetch(`http://localhost:8081/user/bio/${id}`, {
                method: "PUT",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to update Bio");
            }
                alert("Bio updated successfully");
            } catch (err) {
                alert("There was an error updating the bio: " + err);
            }

            updatePage();
    };

    // update captions
    const updateCaption = async (id, caption_number) => {
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            const response = await fetch(`http://localhost:8081/user/caption/${id}/${caption_number}`, {
                method: "PUT",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to update gallery");

            }
                alert("Gallery updated successfully");
            } catch (err) {
                alert("There was an error updating the gallery: " + err);
            }

            updatePage();
    };

    // updates the page with the user's info. Called each time it changes. 
    const updatePage = async () => {
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
    }

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
                                src={`http://localhost:8081/images/noPhoto.jpg`}
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
                            {/* <div>
                            <button className="btn btn-outline-light px-4" type="button" style={{backgroundColor:'#7C2529'}}><a href="mailto: ${email}" style={{color:'white', textDecoration:'none'}}>Contact Me</a></button>
                            </div> */}
                            <div>
                            <button className="btn btn-outline-light px-4 my-2"  onClick={handleLogout} type="button" style={{backgroundColor:'#7C2529'}}>Logout</button>
                            </div>
                            <div>
                            <button className="btn btn-outline-light px-4 my-1"  onClick={() => deleteUser(userData[0].id)} type="button" style={{backgroundColor:'#4A4A4A'}}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7" id="aboutmetext" style={{textAlign:'left'}}>
                        <h2 className="fw-normal my-3">All About Me</h2>
                        <p>{userData[0].bio}</p>
                        <div class="input-group mb-3">
                            <input className="my-3 form-control" type="text" class="form-control"  onChange={(e) => setBio(e.target.value)} id="createBio" placeholder="Change your Bio" aria-label="Submit new bio"/>
                            <button className="btn btn-outline-secondary" type="button" onClick={()=>updateBio(userData[0].id, bio)} id="button-addon2">Submit</button>
                        </div>
                        <div className="container text-center">
                            <div className="row" id="image-gallery">
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
                                        <p class="mt-2">{userData[0].caption1}</p>
                                        <div class="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateGallery(userData[0].id, 1)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                        
                                    )}
                                    {!userData[0].gallery1 && ( <div>
                                        <img className="img-fluid"
                                        src={`http://localhost:8081/images/noPhoto.jpg`}
                                        alt={userData[0].user + '\'s gallery photo'}
                                        id="galleryphoto1"
                                        style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        /> 
                                        <p clasNames="mt-2">{userData[0].caption1}</p>
                                        <div className="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateGallery(userData[0].id, 1)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}" style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    {/* <p class="my-1">{userData[0].caption1}</p> */}
                                    <div className="input-group mb-3">
                                        <input className="my-3 form-control" type="text" class="form-control"  onChange={(e) => setCaption(e.target.value)} id="createCaption1" placeholder="Edit Caption" aria-label="Submit new caption"/>
                                        <button className="btn btn-outline-secondary" type="button" onClick={()=>updateCaption(userData[0].id, 1)} >Submit</button>
                                    </div>
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
                                        <p className="mt-2">{userData[0].caption2}</p>
                                        <div className="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateGallery(userData[0].id, 2)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                    )}
                                    {!userData[0].gallery2 && (
                                        <div>
                                            <img className="img-fluid"
                                            src={`http://localhost:8081/images/noPhoto.jpg`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto2"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <p className="mt-2">{userData[0].caption2}</p>
                                            <div className="input-group mb-3 my-4">
                                                <input type="file" className="form-control" onChange={handleImageChange} />
                                                <button type="button" onClick={()=>updateGallery(userData[0].id, 2)} className="btn btn-outline-secondary">Upload</button>
                                            </div>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}"  style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    {/* <p class="my-1">{userData[0].caption2}</p> */}
                                    <div className="input-group mb-3">
                                        <input className="my-3 form-control" type="text" class="form-control"  onChange={(e) => setCaption(e.target.value)} id="createCaption2" placeholder="Edit Caption" aria-label="Submit new caption"/>
                                        <button className="btn btn-outline-secondary" type="button" onClick={()=>updateCaption(userData[0].id, 2)} >Submit</button>
                                    </div>
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
                                        <p className="mt-2">{userData[0].caption3}</p>
                                        <div className="input-group mb-3 my-4">
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                            <button type="button" onClick={()=>updateGallery(userData[0].id, 3)} className="btn btn-outline-secondary">Upload</button>
                                        </div>
                                        </div>
                                    )}
                                    {!userData[0].gallery3 && (
                                        <div>
                                            <img className="img-fluid"
                                            src={`http://localhost:8081/images/noPhoto.jpg`}
                                            alt={userData[0].user + '\'s gallery photo'}
                                            id="galleryphoto3"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <p className="mt-2">{userData[0].caption3}</p>
                                            <div className="input-group mb-3 my-4">
                                                <input type="file" className="form-control" onChange={handleImageChange} />
                                                <button type="button" onClick={()=>updateGallery(userData[0].id, 3)} className="btn btn-outline-secondary">Upload</button>
                                            </div>
                                        </div>
                                    )}
                                    {/* <img class="img-fluid" src=${currentImage} id="image${i}"  style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}/> */}
                                    {/* <p class="my-1">{userData[0].caption3}</p> */}
                                    <div class="input-group mb-3">
                                        <input className="my-3 form-control" type="text" class="form-control"  onChange={(e) => setCaption(e.target.value)} id="createCaption3" placeholder="Edit Caption" aria-label="Submit new caption"/>
                                        <button className="btn btn-outline-secondary" type="button" onClick={()=>updateCaption(userData[0].id, 3)} >Submit</button>
                                    </div>
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