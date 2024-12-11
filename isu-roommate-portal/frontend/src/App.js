
import React, { useState } from "react";
import Navbar from './Navbar';
import Homepage from "./Homepage";
import Housing from "./Housing";
import Authors from "./Authors";
import Quiz from "./Quiz";
import Login from "./Login";
import Profile from "./Profile";
import CreateAccount from "./CreateAccount";
import FindUsers from "./FindUsers";
import OtherProfile from "./OtherProfile";

function App() {

    const [userData,setUserData] = useState({});
    const [viewer,setViewer] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otherUserData, setOtherUserData] = useState({});

    return(
    <div>

        {viewer ===0 && <Homepage userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} />}
        {viewer === 1 && <Housing userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>}
        {viewer === 2 && <Quiz userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>}
        {viewer === 3 && <Authors userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>}
        {viewer === 4 && <Login userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>}
        {viewer === 5 && <Profile userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} setEmail={setEmail} setPassword={setPassword}/>}
        {viewer === 6 && <CreateAccount userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>}
        {viewer === 7 && <FindUsers userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} otherUserData={otherUserData} setOtherUserData={setOtherUserData}/>}
        {viewer === 8 && <OtherProfile userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} otherUserData={otherUserData}/>}

    </div>
  );

}

export default App;
