import "./Solutions.css";

function Solutions() {
    const services = [
        {
            title: "SOC as a Service",
            description:
                "24×7 Security Operations Center with continuous monitoring, detection, and response.",
        },
        {
            title: "Threat Intelligence",
            description:
                "Monitor emerging threats, vulnerabilities, and attack trends in real time.",
        },
        {
            title: "Vulnerability Assessment & Penetration Testing",
            description:
                "Identify security gaps before attackers exploit them.",
        },
        {
            title: "Managed Detection & Response",
            description:
                "Advanced endpoint monitoring and incident response for modern organizations.",
        },
        {
            title: "Compliance & Governance",
            description:
                "ISO 27001, SOC 2, PCI-DSS, GDPR, RBI and other compliance frameworks.",
        },
        {
            title: "Cloud Security",
            description:
                "Secure AWS, Azure and Google Cloud infrastructure with continuous monitoring.",
        },
    ];

    return (
        <>
            <section className="solution-hero">
                <h1>Cyber Security Solutions</h1>

                <p>
                    Comprehensive cybersecurity services designed to protect your
                    organization from evolving cyber threats.
                </p>
            </section>

            <section className="solution-services">
                <div className="solution-grid">
                    {services.map((item, index) => (
                        <div className="solution-card" key={index}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Solutions;