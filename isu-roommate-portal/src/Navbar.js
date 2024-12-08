
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";


function Navbar({dataF, setDataF, viewer, setViewer}) {

    const updateHooks = (number) =>{
        setViewer(number);
        setDataF(dataF);
        // console.log(number)
    };

    return (
        <div>
            {/* navigation bar */}
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <img src="myotherimages/isulogo-nobg.png" alt="Iowa State University Logo" style={{height: 28+'px', marginLeft: 2+'em'}}></img>
                    {/* <!-- margin-left auto in style make s it so that it floats to the right --> */}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{marginLeft:'auto'}}>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {/* <!-- add justify-content-end to the class to right align --> */}
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button class="nav-link" onClick={() => updateHooks(0)} aria-current="Home page">Home</button>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button class="nav-link" onClick={() => updateHooks(1)} >Housing</button>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button class="nav-link" onClick={() => updateHooks(2)}>Quiz</button>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button class="nav-link active" onClick={() => updateHooks(3)}>Authors</button>
                            </li>
                            <li class="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button class="nav-link" onClick={() => updateHooks(4)} id="p-icon"><img src="myotherimages/profileIcon.png" style={{height: 20 +'px', marginBottom: .5 +'em', marginRight: .5 +'em'}}></img></button>
                                <button class="nav-link d-none" onClick={() => updateHooks(4)} id="p-text"><span id="profile-text">Profile</span></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}


export default Navbar;