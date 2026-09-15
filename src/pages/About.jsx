import "./About.css";
import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();

    return (
        <section className="about-page">

            <div className="about-container">

                <div className="about-left">
                    <span className="about-tag">About Us</span>

                    <h1>
                        Empowering Businesses with
                        <span> Cyber Security</span>
                    </h1>

                    <p>
                        We help organizations strengthen their cybersecurity through
                        managed SOC services, cloud security, compliance, vulnerability
                        assessments, and continuous monitoring.
                    </p>

                    <p>
                        Our mission is to simplify cybersecurity while protecting
                        businesses against modern cyber threats.
                    </p>

                    <button
                        className="about-learn-btn"
                        onClick={() => navigate("/contact")}
                    >
                        Learn More
                    </button>
                </div>

                <div className="about-right">
                    <div className="about-card">
                        <h2>500+</h2>
                        <p>Businesses Protected</p>
                    </div>

                    <div className="about-card">
                        <h2>24×7</h2>
                        <p>SOC Monitoring</p>
                    </div>

                    <div className="about-card">
                        <h2>99%</h2>
                        <p>Customer Satisfaction</p>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default About;