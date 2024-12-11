import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateAccount({userData, setUserData, viewer, setViewer, username, setUsername, password, setPassword, email, setEmail}) {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [bio, setBio] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const { register, formState: { errors } } = useForm();


    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Show preview

    };
    
    const addOneUser = async () => {
        try {
        // Create a FormData object to hold the fields and the file
        const formData = new FormData();
        formData.append("email", email);
        formData.append("user", username);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("password", password);
        // optional bio
        if (!bio===""){
            formData.append("bio", bio);
        }
        formData.append("profile_photo", image); // Add the file to the form data

        // Send the FormData object to the backend
        const response = await fetch("http://localhost:8081/user", {
        method: "POST",
        body: formData, 
        });
        if (!response.ok) {
            // Handle errors (status code 4xx or 5xx)
            const errorData = await response.json(); // Parse JSON error response
            alert("Error: " + errorData.error);
        } else {
            // Status code 201 indicates success
            const successMessage = await response.text(); // Handle plain text response
            alert(successMessage);
        }
        } catch (err) {
        alert("An error occurred :"+err)
        }

        // login the user in immediately if successful
        try {
            const getinfo = await fetch(`http://localhost:8081/user/${encodeURIComponent(email)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            });
            if (!getinfo.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await getinfo.json();
            setUserData(data);
            setViewer(5);
        } catch (err){
            alert("There was an Error finding the user: "+err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            
            // Call this function to fetch backend with method POST
            addOneUser();
            // Clean hooks to start again
            setImage(null);
            setPreview(null);
            setBio(null);
            setFirstName(null);
            setLastName(null);

        } catch (err){

        }
        
    };


    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
            {/* <!-- sign in / sign up --> */}
                <main className="form-signin w-100 m-auto" id="formContainer">
                <h1 className="h3 mb-3 fw-normal my-5">Create a New Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i})} type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control"  {...register("username", { required: true })} onChange={(e) => setUsername(e.target.value)} placeholder="Username" id="createNewUsername" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First name</label>
                        <input type="text"  {...register("first_name", { required: true })} className="form-control" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" id="createFirstName" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text"  {...register("last_name", { required: true })} className="form-control" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" id="createLastName" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="text"   {...register("password", { required: true })} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="createPassword" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Bio</label>
                        <input type="text" placeholder="Add a Bio" onChange={(e) => setBio(e.target.value)} className="form-control" id="createBio"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Profile Picture</label>
                        <input type="file" className="form-control" onChange={handleImageChange} />
                        {preview && (<img src={preview} alt="Preview" className="mt-3" style={{position: 'relative', width: 15+'em', height: 15+'em', borderRadius: 50+'%', overflow:'hidden', objectFit: 'cover'}} /> )}
                    </div>
                        <button className="btn btn-primary w-100 py-2 gy-2 my-2 " type="submit" style={{backgroundColor:'#7C2529'}}>Create Account</button>
                        <p className="my-3">Already have an account?</p>
                        <button className="btn btn-primary w-100 py-2" onClick={() => setViewer(4)} id="loginButton" style={{backgroundColor:'#7C2529'}}>Back to sign in</button>
                 </form>
                </main>

            <Footer />
        </div>
    );

}