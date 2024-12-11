
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";


function Navbar({userData, setUserData, viewer, setViewer}) {

    const updateHooks = (number) =>{
        setViewer(number);
        setUserData(userData);
    };


    return (
        <div>
            {/* navigation bar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img  src={`http://localhost:8081/images/isulogo-nobg.png`} alt="Iowa State University Logo" style={{height: 28+'px', marginLeft: 2+'em'}}></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{marginLeft:'auto'}}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button className={`nav-link ${viewer === 0 ? 'active' : ''}`} onClick={() => updateHooks(0)} aria-current="Home page">Home</button>
                            </li>
                            <li className="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button className={`nav-link ${viewer === 7 ? 'active' : ''}`} onClick={() => updateHooks(7)} aria-current="Home page">Find a Roommate</button>
                            </li>
                            <li className="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button className={`nav-link ${viewer === 1 ? 'active' : ''}`} onClick={() => updateHooks(1)} >Housing</button>
                            </li>
                            <li className="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button className={`nav-link ${viewer === 2 ? 'active' : ''}`} onClick={() => updateHooks(2)}>Quiz</button>
                            </li>
                            <li className="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button className={`nav-link ${viewer === 3 ? 'active' : ''}`} onClick={() => updateHooks(3)}>Authors</button>
                            </li>
                            <li className="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button className={`nav-link ${(viewer >= 4 && viewer <= 6) ? 'active' : ''}`} onClick={() => updateHooks(4)} id="p-icon"><img  src={`http://localhost:8081/images/profileIcon.png`} style={{height: 20 +'px', marginBottom: .5 +'em', marginRight: .5 +'em'}}></img></button>
                                <button className="nav-link d-none"  id="p-text"><span id="profile-text">Profile</span></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}


export default Navbar;