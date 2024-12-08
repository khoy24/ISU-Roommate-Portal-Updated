import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Profile({}){

    // implement profile logging in across all views 

    return (
        <div>
            <Navbar />
            <div class="row" >
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