import "./CyberSecurity.css";
import { Shield, Laptop, Brain } from "lucide-react";


function CyberSecurity() {
    return (
        <section className="cyber">

            <div className="cyber-container">

                <span className="cyber-tag">
                    Cyber Security
                </span>

                <h1>
                    Protect Your Business
                    From Modern Cyber Threats
                </h1>

                <p>
                    Our cybersecurity experts provide proactive defense,
                    continuous monitoring, and rapid response to keep your
                    organization secure.
                </p>

                <div className="cyber-grid">

                    <div className="cyber-card">

                        <Shield size={40} />

                        <h3>
                            Network Security
                        </h3>

                        <p>
                            Secure your network infrastructure against attacks.
                        </p>

                    </div>

                    <div className="cyber-card">

                        <Laptop size={40} />

                        <h3>
                            Endpoint Protection
                        </h3>

                        <p>
                            Protect laptops, servers and mobile devices.
                        </p>

                    </div>

                    <div className="cyber-card">

                        <Brain size={40} />

                        <h3>
                            Threat Intelligence
                        </h3>

                        <p>
                            Identify and stop advanced cyber threats early.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default CyberSecurity;