
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";


function Navbar({userData, setUserData, viewer, setViewer}) {

    const updateHooks = (number) =>{
        setViewer(number);
        setUserData(userData);
        // console.log(number)
    };

    // let navbarToggler = document.querySelector('.navbar-toggler');
    // let profileIcon = document.getElementById('p-icon');
    // let profileText = document.getElementById('p-text');
    //     // checks to change profile vs icon when clicked
    // navbarToggler.addEventListener('click', () => {

    //     // keep track of the clicks of the toggle to see whether it is expanded or not
    //     if (navbarToggler.getAttribute('aria-expanded') === "true") {
    //         console.log("expanded");
    //         // expanded (hide profile icon and show profile text)
    //         profileIcon.classList.add('d-none');
    //         profileText.classList.remove('d-none');
    //     } else {
    //         console.log("not expanded");
    //         // not expanded (show profile icon and hide profile text)
    //         profileIcon.classList.remove('d-none');
    //         profileText.classList.add('d-none');
    //     }
    //     // d-none is bootstraps way of doing display: none
    //     // by doing this we add it to the class list, so we can change what is displayed when the
    //     // toggler is expanded

    // });

    return (
        <div>
            {/* navigation bar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img src="myotherimages/isulogo-nobg.png" alt="Iowa State University Logo" style={{height: 28+'px', marginLeft: 2+'em'}}></img>
                    {/* <!-- margin-left auto in style make s it so that it floats to the right --> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{marginLeft:'auto'}}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <!-- add justify-content-end to the class to right align --> */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item" style={{display: 'flex', justifyContent: 'flex-end', marginTop:.5 + 'em', marginRight:1 + 'em'}}>
                                <button className={`nav-link ${viewer === 0 ? 'active' : ''}`} onClick={() => updateHooks(0)} aria-current="Home page">Home</button>
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
                                <button className={`nav-link ${(viewer >= 4 && viewer <= 6) ? 'active' : ''}`} onClick={() => updateHooks(4)} id="p-icon"><img src="myotherimages/profileIcon.png" style={{height: 20 +'px', marginBottom: .5 +'em', marginRight: .5 +'em'}}></img></button>
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