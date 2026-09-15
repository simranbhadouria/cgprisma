import "./SecurityCards.css";
import { Shield, Bug, FileCheck } from "lucide-react";

const cards = [
    {
        icon: <Shield size={32} />,
        title: "Defensive Security",
        description:
            "Relentless protection through real-time threat detection, automated response, and continuous monitoring powered by SIEM, SOAR, and endpoint security integrations.",
    },
    {
        icon: <Bug size={32} />,
        title: "Offensive Security",
        description:
            "Think like an attacker. Simulate breaches, hunt threats, and monitor the dark web to identify vulnerabilities before hackers do.",
    },
    {
        icon: <FileCheck size={32} />,
        title: "Compliance & Governance",
        description:
            "Be audit-ready with ISO 27001, SOC 2, PCI-DSS, GDPR, RBI, and other compliance frameworks from one centralized platform.",
    },
];

function SecurityCards() {
    return (
        <section className="security-section">

            {/* Section Heading */}
            <div className="security-heading">
                <h1>
                    Comprehensive Security for a
                    <br />
                    <strong>Safer Digital World</strong>
                </h1>

                <p>
                    Protect your organization with proactive cybersecurity,
                    advanced threat detection, and continuous security
                    monitoring.
                </p>
            </div>

            {/* Security Cards */}
            <div className="security-container">
                {cards.map((card, index) => (
                    <div className="security-card" key={index}>

                        <div className="security-icon">
                            {card.icon}
                        </div>

                        <h2>{card.title}</h2>

                        <p>{card.description}</p>

                    </div>
                ))}
            </div>

        </section>
    );
}

export default SecurityCards;