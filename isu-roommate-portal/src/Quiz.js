import Navbar from "./Navbar";
import "./styles/Quiz.css";
import Footer from "./Footer";

export default function Quiz({userData, setUserData, viewer, setViewer}) {

    return (
        <div>

            <body style={{backgroundColor: '#f5f5f5'}} className="prevent-select">
                <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer}/>

                <header>
                    <div className="mx-auto" style={{padding: 20+'px', margin: 'auto', backgroundColor: '#C8102E', color: '#F5F5F5', overflow: 'hidden', textAlign: 'center', marginBottom: 20+'px'}}>
                        <h1 className="mx-auto" style={{fontSize: 50+'px', fontFamily: 'Merriweather serif'}}>Roommate Quiz</h1>
                    </div>
                </header>

                <div className="container" style={{marginBottom: 20+'px'}}>
                    <form id="QuizBody">
                        
                    </form>

                    <a href="./index.html"><button type="button" id="submitBtn" className="btn btn-outline-danger" style={{marginTop: 30+'px'}}>Submit Quiz</button></a>
                    
                    <p className="my-3" style={{fontSize: 15+'px'}}>In the future, all values will be saved, and will be able to be edited at a later date</p>
                </div>

                <Footer/>
            </body>

        </div>
    )
}