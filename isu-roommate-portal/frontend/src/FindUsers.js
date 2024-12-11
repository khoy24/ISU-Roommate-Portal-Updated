import Footer from "./Footer"
import Navbar from "./Navbar"
import { useState } from "react";


export default function FindUsers({userData, setUserData, viewer, setViewer, otherUserData, setOtherUserData}){


    const [begunSearch, setBegunSearch] = useState(0);
    const [userName, setUserName] = useState("");
    const [userQuery, setUserQuery] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchAllUsers = async () => {

        try {
            const response = await fetch(`http://localhost:8081/users`, {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            });
            if (!response.ok) { 
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
            // console.log(data);
        } catch (err) {
            alert("There was an Error loading one user "+err);
        }

    }
    if (begunSearch===0){
        fetchAllUsers();
        setBegunSearch(1);
    }
    // fetchAllUsers();


    const fetchUsers = async () => {
        setBegunSearch(2)
        // console.log("fetch");
        // console.log(userName);
        if (!userName.trim()) {
            alert("Please enter a user's username");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/user/username/${encodeURIComponent(userName)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            });
            if (!response.ok) { 
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUserQuery(data);
            // console.log(data);
        } catch (err) {
            alert("There was an Error loading one user "+err);
        }
    };

    const viewUserProfile = async (otherUserData) => {
        setOtherUserData(otherUserData);
        // setEmail(otherUserData.email);
        // console.log(otherUserData.email);
        
        setViewer(8);
        // setOtherUserData(otherUserData);

    }

    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>
                <div className="container">
                    <h2 className="text-center mt-4">Search For a Roommate</h2>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter username" value={userName}
                        onChange={(e) => setUserName(e.target.value.toLowerCase())}
                        />
                        <button className="btn btn-primary" onClick={fetchUsers}>
                        Search
                        </button>
                    </div>
                    {/* List the result */}
                    <ul className="list-group gap-2">
                    {begunSearch===1 && users.map((user) =>(
                        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2 w-100">
                            {user.profile_photo && (
                            <img src={`http://localhost:8081${user.profile_photo}`}
                            alt={user.user}
                            style={{ width: "50px", height: "50px", marginRight: "15px", objectFit: "cover" }}
                            />
                            )}
                            <div className="flex-grow-1">
                                <strong>{user.user}</strong>
                                <p>{user.first_name} {user.last_name}</p>
                            </div>
                            <div class="gap-2 d-md-flex justify-content-center">
                                <button onClick={(e)=> viewUserProfile(user)} class="btn btn-primary me-md-2 align-self-end"  type="button">View Profile</button>
                            </div>
                        </div>
                    </li>   
                    ))}
                    {begunSearch===2 && userQuery.map((user) => (
                        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {/* need w-100 so it takes up the whole width */}
                        <div className="d-flex align-items-center w-100">
                            {user.profile_photo && (
                            <img src={`http://localhost:8081${user.profile_photo}`}
                            alt={user.user}
                            style={{ width: "50px", height: "50px", marginRight: "15px", objectFit: "cover" }}
                            />
                            )}
                            {/* flexgrow1 takes up remaining space, pushes buttons right */}
                            <div className="flex-grow-1">
                                <strong>{user.user}</strong>
                                <p>{user.first_name} {user.last_name}</p>
                            </div>
                            <div class="gap-2 d-md-flex justify-content-center">
                                <button onClick={(e)=>viewUserProfile(user)} class="btn btn-primary me-md-2 align-self-end"  type="button">View Profile</button>
                            </div>
                        </div>
                    </li>   
                    ))}
                    </ul>
                </div>
            <Footer />
        </div>
    )
}