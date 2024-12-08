
import React, { useState } from "react";
import Navbar from './Navbar';
import Homepage from "./Homepage";
import Housing from "./Housing";
import Authors from "./Authors";
import Quiz from "./Quiz";
import Login from "./Login";
import Profile from "./Profile";


function App() {

    const [dataF,setDataF] = useState({});
    const [viewer,setViewer] = useState(0);

    return(
    <div>

        {viewer ===0 && <Homepage dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer} />}
        {viewer === 1 && <Housing dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>}
        {viewer === 2 && <Quiz dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>}
        {viewer === 3 && <Authors dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>}
        {viewer === 4 && <Login dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>}
        {viewer === 5 && <Profile dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>}


    </div>
  );

}

export default App;
