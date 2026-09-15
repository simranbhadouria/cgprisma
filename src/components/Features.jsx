import "./Features.css";
import { ShieldCheck, Radar, Cloud } from "lucide-react";

function Features() {
    return (
        <section className="features">

            <h2>Why Choose Cynox Global  ?</h2>

            <div className="feature-grid">

                {/* Card 1 */}
                <div className="feature-card">

                    <ShieldCheck className="feature-icon" size={45} />

                    <h3>24×7 SOC Monitoring</h3>

                    <p>
                        Continuous monitoring to detect and respond to cyber threats.
                    </p>

                </div>

                {/* Card 2 */}
                <div className="feature-card">

                    <Radar className="feature-icon" size={45} />

                    <h3>Threat Intelligence</h3>

                    <p>
                        Real-time intelligence to identify emerging cyber risks.
                    </p>

                </div>

                {/* Card 3 */}
                <div className="feature-card">

                    <Cloud className="feature-icon" size={45} />

                    <h3>Cloud Security</h3>

                    <p>
                        Protect AWS, Azure and Google Cloud infrastructure.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default Features;