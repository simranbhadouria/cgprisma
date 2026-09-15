import { Link } from "react-router-dom";
import "./Footer.css";


function Footer() {

    return (

        <footer className="footer">


            <div className="footer-container">


                {/* Company */}

                <div className="footer-column">


                    <h2>
                        Cynox Global
                    </h2>


                    <p>
                        Advanced cybersecurity solutions
                        for modern enterprises.
                    </p>


                </div>



                {/* Company Links */}

                <div className="footer-column">


                    <h3>
                        Company
                    </h3>


                    <Link to="/about">About</Link>

                    <Link to="/careers">Careers</Link>

                    <Link to="/contact">Contact</Link>



                </div>



                {/* Solutions */}

                <div className="footer-column">


                    <h3>
                        Solutions
                    </h3>


                    <Link to="/soc-service">SOC Services</Link>

                    <Link to="/cloud-security">Cloud Security</Link>

                    <Link to="/cyber-security">Cyber Security</Link>


                </div>




                {/* Resources */}

                <div className="footer-column">


                    <h3>
                        Resources
                    </h3>


                    <Link to="/blog">Blog</Link>

                    <Link to="/datasheets">Datasheets</Link>


                    <Link to="/datasheets">Case Study</Link>


                </div>




                {/* Contact */}

                <div className="footer-column">


                    <h3>
                        Contact
                    </h3>

                    <p>
                        Contact: +91 7303347098
                    </p>


                    <p>
                        Email: support@cynoxsecurity.com
                    </p>


                    <p>
                        India
                    </p>


                </div>


            </div>




            <div className="footer-bottom">


                © 2026 All rights reserved - Cynox Global


            </div>


        </footer>

    )

}


export default Footer;