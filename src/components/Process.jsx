import "./Process.css";

function Process() {
    const steps = [
        {
            number: "01",
            title: "Assessment",
            description: "Analyze your infrastructure and identify security risks."
        },
        {
            number: "02",
            title: "Implementation",
            description: "Deploy cybersecurity solutions tailored to your business."
        },
        {
            number: "03",
            title: "Monitoring",
            description: "24×7 SOC monitoring with AI-powered threat detection."
        },
        {
            number: "04",
            title: "Response",
            description: "Rapid incident response and continuous improvement."
        }
    ];

    return (
        <section className="process">
            <h2>How We Protect Your Business</h2>

            <div className="process-grid">
                {steps.map((step, index) => (
                    <div className="process-card" key={index}>
                        <span>{step.number}</span>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Process;