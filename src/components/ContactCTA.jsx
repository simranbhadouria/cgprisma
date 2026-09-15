import "./ContactCTA.css";
import { Link } from "react-router-dom";

function ContactCTA() {
    return (
        <section className="cta">
            <div className="cta-content">
                <h2>Ready to Strengthen Your Cyber Security?</h2>

                <p>
                    Protect your business with 24×7 SOC Monitoring, Threat Intelligence,
                    Compliance, and Managed Security Services.
                </p>

                <div className="cta-buttons">

                    <Link to="/contact" className="primary-btn">
                        Get Started
                    </Link>

                    <Link to="/contact" className="secondary-btn">
                        Schedule a Demo
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default ContactCTA;