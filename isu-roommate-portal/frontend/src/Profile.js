import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect, useState } from "react";


export default function Profile({userData, setUserData, viewer, setViewer, setEmail, setPassword}){

    const [image, setImage] = useState(null);
    const [bio, setBio] = useState("");
    const [caption, setCaption] = useState(null);
    const [selectedHouses, setSelectedHouses] = useState(null);
    const [expanded, setExpanded] = useState({});

    const [houses, setHouses] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // implemented logout 
    const handleLogout = async (e) => {
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
            } catch (err) {
                alert("There was an error deleting the user: " + err);
            }
            updatePage();
    };

    // change gallery photos
    const updateGallery = async (id, gallery_number) => {
        try {
            const formData = new FormData();
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
            } catch (err) {
                alert("There was an error updating the gallery: " + err);
            }

            updatePage();
    };

     // change bio 
     const updateBio = async (id, bio) => {
        try {
            const formData = new FormData();
            formData.append("bio", bio);
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
            getPreferences();
        } catch (err){
            alert("There was an Error finding the user: "+err);
        }
    }


    const getPreferences = async () => {
        try {
            const getinfo = await fetch(`http://localhost:8081/housingPreferences/${encodeURIComponent(userData[0].id)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            });
            if (!getinfo.ok) {
                throw new Error("Failed to fetch preferences");
            }
            const data = await getinfo.json();
            data.map( (housing) => {
                getHouse(housing.housing_id);
            });
            setSelectedHouses(data);
        } catch (err){
            alert("There was an Error fetching the user's housing preferences: "+err);
        }
    }

    
  // get houses for the search bar
  const getHouse = async (id) => {


        try {
            const response = await fetch(`http://localhost:8081/house/id/${encodeURIComponent(id)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            });
            if (!response.ok) { 
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            // "some" prevented duplicate houses from being added to the array. Have to use prevHouses obj 
            setHouses((prevHouses) => {
                if (!prevHouses.some((house) => house.id === data[0].id)) {
                    return [...prevHouses, data[0]];  
                }
                return prevHouses; 
            });

        } catch (err) {
            alert("There was an Error loading one user "+err);
        }
    };

    useEffect(() => {
        if (selectedHouses===null){
            updatePage();
        }
    }, [selectedHouses]);

    const toggleDescription = (id) => {
        setExpanded((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
    };

    const handleRemoveSelection = (housing) => {
        removePreference(housing);
        // removes the house from the list instantly
        setHouses((prevHouses) => prevHouses.filter(house => house.id !== housing.id));
    };

        
    const removePreference = async (housing) => {
        try {
        const response = await fetch(`http://localhost:8081/user/${userData[0].id}/${housing.id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const errorData = await response.json(); 
            alert("Error: " + errorData.error);
        } else {
            const successMessage = await response.text(); 
            alert(successMessage);
            updatePage();
        }
        } catch (err) {
        alert("An error occurred :"+err)
        }
    };

    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
            <div className="container p-5 my-4" id="profilePageDisplay">
                <div className="row" >
                    <div class="col-lg-4" style={{textAlign:'center'}}>
                        {/*profile photo */}
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
                                    <div class="input-group mb-3">
                                        <input className="my-3 form-control" type="text" class="form-control"  onChange={(e) => setCaption(e.target.value)} id="createCaption3" placeholder="Edit Caption" aria-label="Submit new caption"/>
                                        <button className="btn btn-outline-secondary" type="button" onClick={()=>updateCaption(userData[0].id, 3)} >Submit</button>
                                    </div>
                                    
                                </div>
                                <div>
                                    <h2 className="fw-normal my-3">Housing Preferences</h2>
                                    <div className="container">
                                    <div className="row">
                                    {selectedHouses && houses.map((housing) => {
                                        const isExpanded = expanded[housing.id] || false;

                                        return (
                                            
                                        <div key={housing.id} className="div col-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <div className="card shadow-sm col" style={{ position: "relative"}}>
                                            <img src={`http://localhost:8081${housing.URL}`} className="card-img-top" alt={housing.name} />
                                            <div className="card-body">
                                                <p className="card-text">
                                                <strong>{housing.name}</strong>, ${housing.price} <br />
                                                Air Conditioned: {housing.airConditioned} <br />
                                                Open for Winter Break: {housing.OpenDuringWinterBreak} <br />

                                                {/* Button to toggle description */}
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <button onClick={() => toggleDescription(housing.id)} className="btn btn-link">
                                                    {isExpanded ? "Show Less" : "Show More"}
                                                    </button>
                                                    <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveSelection(housing)}
                                                    style={{
                                                        borderRadius: "5px",  
                                                        padding: "6px 14px",  
                                                        backgroundColor:"#7C2529",
                                                        border: "none",
                                                        fontSize: "12px", 
                                                        cursor: "pointer",
                                                    }}
                                                    >
                                                    Remove
                                                    </button>
                                                </div>
                                                {/* Expandable Description */}
                                                <div
                                                    className="expanded-description"
                                                    style={{
                                                    padding: isExpanded ? "10px" : "0",
                                                    height: isExpanded ? "auto" : "0",
                                                    overflow: "hidden",
                                                    transition: "height 0.3s ease-out",
                                                    }}
                                                >
                                                    {housing.Description}
                                                </div>
                                                </p>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        );
                                        
                                    })}
                                    </div>
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