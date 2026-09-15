import "./Monitoring.css";
import { Activity, Bell, LayoutDashboard, FileText } from "lucide-react";

function Monitoring() {
    return (
        <section className="monitoring">

            <div className="monitoring-container">

                <span className="monitoring-tag">
                    Monitoring
                </span>

                <h1>
                    Real-Time Security Monitoring
                </h1>

                <p>
                    Gain complete visibility into your infrastructure with
                    continuous monitoring, instant alerts, and actionable
                    security insights.
                </p>

                <div className="monitoring-grid">

                    <div className="monitor-card">

                        <Activity size={40} />

                        <h3>
                            24×7 Monitoring
                        </h3>

                        <p>
                            Continuous monitoring of your network and systems.
                        </p>

                    </div>

                    <div className="monitor-card">

                        <Bell size={40} />

                        <h3>
                            Instant Alerts
                        </h3>

                        <p>
                            Receive notifications for suspicious activities.
                        </p>

                    </div>

                    <div className="monitor-card">

                        <LayoutDashboard size={40} />

                        <h3>
                            Security Dashboard
                        </h3>

                        <p>
                            View security events from one centralized dashboard.
                        </p>

                    </div>

                    <div className="monitor-card">

                        <FileText size={40} />

                        <h3>
                            Reports & Analytics
                        </h3>

                        <p>
                            Generate reports and monitor security performance.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Monitoring;