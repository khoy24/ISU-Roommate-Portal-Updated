
import React, { useState } from "react";
import Navbar from './Navbar';
import Homepage from "./Homepage";


function App() {

    const [dataF,setDataF] = useState({});
    const [viewer,setViewer] = useState(0);

    return(
    <div>
        {/* <Payment dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer} /> */}

        {/* {viewer===0 && <Payment dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer} />}
        {viewer === 1 && <Summary dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>} */}
        {/* <Navbar/> */}
        <Homepage/>
    </div>
  );

}

export default App;
