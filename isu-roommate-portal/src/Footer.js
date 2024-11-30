import "bootstrap/dist/css/bootstrap.css";

function Footer() {

    return (
        <div>
            <footer class="text-body-secondary py-5">
                <div class="container">
                    <img src="./myotherimages/isulogo-nobg.png" alt="Iowa State University Logo" style={{height: 16+'px', marginLeft: 3+'em'}}></img>
                    <ul style={{overflow: 'hidden', listStyleType: 'none', alignItems: 'center', marginBottom:0+'px', paddingBottom: 0+'px'}}>
                        <li style={{float: 'left', padding: 16+'px', paddingBottom: 0+'px'}}><p>Ames, IA 50011-2103</p></li>
                    </ul>
                    <ul style={{overflow: 'hidden', listStyleType: 'none', alignItems: 'center', marginBottom:0+'px', paddingBottom: 0+'px'}}>
                        <li style={{float: 'left', padding: 16+'px', paddingBottom: 0+'px', paddingTop: 0+'px'}}><p>Phone: 515-294-2900</p></li>
                    </ul>
                    <ul style={{overflow: 'hidden', listStyleType: 'none', alignItems: 'center'}}>
                        <li style={{float: 'left', padding: 16+'px', paddingTop:0}}>
                            <p>© Iowa State University Roommate Portal</p>
                        </li>
                        <p class="float-end mb-1" style={{marginRight: 2+'em', padding: 16+'px', paddingTop:0}}>
                            <a href="mailto: khoyme@iastate.edu" style={{color:'black'}}>Contact Us</a>
                            <a href="#" style={{marginLeft: 2+'em', color:'black'}}>Back to top</a>
                        </p>
                    </ul>
                
                </div>
            </footer>
        </div>
    )
}

export default Footer;