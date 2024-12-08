import Navbar from "./Navbar";
import "./styles/housing.css";
import Footer from "./Footer";

export default function Housing({dataF, setDataF, viewer, setViewer}) {



    return (
        <div>
        <body class="housing prevent-select" style={{backgroundColor: '#F5F5F5'}}>

    {/* // <!-- navigation bar --> */}
    <Navbar dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>

    <header>
        <div class="mx-auto" style={{padding: 20 +'px', margin: 'auto', backgroundColor: '#C8102E', color: '#F5F5F5', overflow: 'hidden', textAlign: 'center', marginBottom: 20+'px'}}>
            <h1 class="mx-auto" style={{fontSize: 50 +'px', fontFamily: 'Merriweather, serif'}}>University Housing</h1>
        </div>
    </header>

    <div class="card-columns">
        <div class="container">
                <div id="col" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                </div>
            
        </div>
    </div>

    {/* // <!-- footer --> */}
    <Footer/>

     <script src="./index.js"></script>
    <script>
        document.getElementById("col").addEventListener("load", getHalls())
   </script>
    </body>
    </div>
    )

}