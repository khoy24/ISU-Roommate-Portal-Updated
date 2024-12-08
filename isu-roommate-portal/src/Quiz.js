import Navbar from "./Navbar";
import "./styles/Quiz.css";
import Footer from "./Footer";

export default function Quiz({dataF, setDataF, viewer, setViewer}) {

    return (
        <div>

            <body style={{backgroundColor: '#f5f5f5'}} class="prevent-select">
                <Navbar dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>

                <header>
                    <div class="mx-auto" style={{padding: 20+'px', margin: 'auto', backgroundColor: '#C8102E', color: '#F5F5F5', overflow: 'hidden', textAlign: 'center', marginBottom: 20+'px'}}>
                        <h1 class="mx-auto" style={{fontSize: 50+'px', fontFamily: 'Merriweather serif'}}>Roommate Quiz</h1>
                    </div>
                </header>

                <div class="container" style={{marginBottom: 20+'px'}}>
                    <form id="QuizBody">
                        
                    </form>

                    <a href="./index.html"><button type="button" id="submitBtn" class="btn btn-outline-danger" style={{marginTop: 30+'px'}}>Submit Quiz</button></a>
                    
                    <p class="my-3" style={{fontSize: 15+'px'}}>In the future, all values will be saved, and will be able to be edited at a later date</p>
                </div>

                <Footer/>
            </body>

        </div>
    )
}