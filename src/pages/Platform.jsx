import "./Platform.css";
import { Shield, Cloud, BarChart3, AlertTriangle } from "lucide-react";

function Platform() {
    return (
        <section className="platform-page">

            <div className="platform-header">
                <span className="platform-tag">Platform</span>

                <h1>
                    One Platform.
                    <br />
                    Complete Cyber Security.
                </h1>

                <p>
                    Manage security operations, compliance, monitoring,
                    threat intelligence and reporting from one unified dashboard.
                </p>
            </div>

            <div className="platform-grid">

                <div className="platform-card">

                    <Shield size={40} />

                    <h3>
                        SOC Dashboard
                    </h3>

                    <p>
                        Monitor threats 24×7 with real-time alerts.
                    </p>

                </div>

                <div className="platform-card">

                    <Cloud size={40} />

                    <h3>
                        Cloud Security
                    </h3>

                    <p>
                        Protect AWS, Azure and Google Cloud environments.
                    </p>

                </div>


                <div className="platform-card">

                    <BarChart3 size={40} />

                    <h3>
                        Compliance
                    </h3>

                    <p>
                        Track ISO 27001, SOC 2, RBI and GDPR compliance.
                    </p>

                </div>

                <div className="platform-card">

                    <AlertTriangle size={40} />

                    <h3>
                        Threat Intelligence
                    </h3>

                    <p>
                        Identify emerging threats before they affect your business.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default Platform;