import "./SocService.css";
import { Activity, Search, ShieldCheck } from "lucide-react";

function SocService() {
    return (
        <section className="soc">

            <div className="soc-container">

                <span className="soc-tag">
                    SOC Services
                </span>

                <h1>
                    24×7 Security Operations Center
                </h1>

                <p>
                    Detect, investigate and respond to cyber threats
                    around the clock with our managed SOC services.
                </p>

                <div className="soc-grid">

                    <div className="soc-card">

                        <Activity size={40} />

                        <h3>
                            24×7 Monitoring
                        </h3>

                        <p>
                            Continuous monitoring of your IT infrastructure.
                        </p>

                    </div>

                    <div className="soc-card">

                        <Search size={40} />

                        <h3>
                            Threat Detection
                        </h3>

                        <p>
                            AI-powered threat detection and rapid response.
                        </p>

                    </div>
                    <div className="soc-card">

                        <ShieldCheck size={40} />

                        <h3>
                            Incident Response
                        </h3>

                        <p>
                            Fast investigation and remediation of security incidents.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SocService;