import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect, useState } from "react";

export default function Profile({dataF, setDataF, viewer, setViewer, username, setUsername, password, setPassword, email, setEmail}){

    // implement profile logging in across all views 

    useEffect(() => {

        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:8081/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch contacts");
                }
                const data = await response.json();
                setDataF(data);
                console.log(dataF);
            } catch (error) {
                alert("There was an Error loading contacts "+error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div>
            <Navbar dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>
            <div className="row" >
                {/* <div class="col-lg-4" style={{textAlign:'center'}}>
                    <img src={profilephotopath} id="profPhoto" style="position: relative; width: 15em; height: 15em; border-radius: 50%; overflow:hidden; object-fit: cover;"></img>
                    <h2 class="fw-normal my-3">${username}</h2>
                    <p>${firstname} ${lastname}</p>
                    <button class="btn btn-outline-light" type="button" style="background-color:#7C2529"><a href="mailto: ${email}" style="color:white; text-decoration:none;">Contact Me</a></button>
                </div>
                <div class="col-lg-7" id="aboutmetext" style="text-align:left">
                    <h2 class="fw-normal my-3">All About Me</h2>
                    <p>${bio}</p>
                    <div class="container text-center">
                        <div class="row" id="image-gallery">
                        </div>
                    </div>
                </div> */}
            </div>
            <Footer/>
        </div>
    )
}