import "./Stats.css";

const stats = [
    {
        number: "500+",
        title: "Enterprises Protected",
    },
    {
        number: "24×7",
        title: "SOC Monitoring",
    },
    {
        number: "98%",
        title: "Client Retention",
    },
    {
        number: "200+",
        title: "Security Assessments",
    },
];

function Stats() {
    return (
        <section className="stats">

            {/* Section Heading */}
            <div className="stats-heading">

                <h1>
                    Trusted Security.
                    <strong> Proven Results.</strong>
                </h1>

                <p>
                    Delivering reliable cybersecurity solutions and continuous
                    protection for businesses across industries.
                </p>
            </div>

            {/* Statistics */}
            <div className="stats-container">
                {stats.map((item, index) => (
                    <div className="stat-card" key={index}>
                        <h2>{item.number}</h2>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Stats;