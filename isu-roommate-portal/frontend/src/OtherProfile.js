import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState, useEffect } from "react";

export default function OtherProfile({userData, setUserData, viewer, setViewer, otherUserData}){

    const [selectedHouses, setSelectedHouses] = useState(null);
    const [expanded, setExpanded] = useState({});

    const [houses, setHouses] = useState([]);
    
    const toggleDescription = (id) => {
        setExpanded((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
    };
    
    const updatePage = async () => {
        try {
            getPreferences();
        } catch (err){
            alert("There was an Error finding the user: "+err);
        }
    }


    const getPreferences = async () => {
        try {
            const getinfo = await fetch(`http://localhost:8081/housingPreferences/${encodeURIComponent(otherUserData.id)}`, {
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

    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
            <div className="container p-5 my-4" id="profilePageDisplay">
                <div className="row" >
                    <div class="col-lg-4" style={{textAlign:'center'}}>
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
                                src={`http://localhost:8081/images/noPhoto.jpg`}
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
                                        src={`http://localhost:8081/images/noPhoto.jpg`}
                                        alt={otherUserData.user + '\'s gallery photo'}
                                        id="galleryphoto1"
                                        style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                        /> 
                                        <p clasNames="mt-2">{otherUserData.caption1}</p>
                                        </div>
                                    )}
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
                                            src={`http://localhost:8081/images/noPhoto.jpg`}
                                            alt={otherUserData.user + '\'s gallery photo'}
                                            id="galleryphoto2"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <p className="mt-2">{otherUserData.caption2}</p>
                                        </div>
                                    )}
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
                                            src={`http://localhost:8081/images/noPhoto.jpg`}
                                            alt={otherUserData.user + '\'s gallery photo'}
                                            id="galleryphoto3"
                                            style={{ margin:0, position: 'relative', width: 200+'px', height: 200+'px', overflow:'hidden', objectFit: 'cover'}}
                                            />
                                            <p className="mt-2">{otherUserData.caption3}</p>
                                        </div>
                                    )}
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
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}