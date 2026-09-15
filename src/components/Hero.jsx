import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import securityshield from "../assets/logos/security-shield.png";
function Hero() {

    return (

        <section className="hero">


            {/* Left Content */}

            <motion.div
                className="hero-content"

                initial={{
                    opacity: 0,
                    x: -50
                }}

                whileInView={{
                    opacity: 1,
                    x: 0
                }}

                transition={{
                    duration: .8
                }}

            >

                <h1>
                    Empowering Security.
                    <br />
                    Enabling Innovation.
                </h1>


                <p>
                    Advanced cybersecurity solutions
                    for modern enterprises.
                </p>


                <div className="hero-buttons">

                    <Link to="/solutions" className="primary-btn">
                        Explore Solutions
                    </Link>

                    <Link to="/contact" className="secondary-btn">
                        Contact Us
                    </Link>

                </div>


            </motion.div>



            {/* Right Illustration */}

            <motion.div

                className="hero-image"

                initial={{
                    opacity: 0,
                    scale: .7
                }}

                whileInView={{
                    opacity: 1,
                    scale: 1
                }}

                transition={{
                    duration: .8
                }}

            >

                <div className="glow-circle">


                    <img
                        src={securityshield}
                        alt="Cyber Security"
                        className="hero-img"
                    />


                </div>


            </motion.div>



        </section>

    )

}


export default Hero;