import "./Clients.css";

function Clients() {
    const clients = [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM",
        "Oracle",
        "Cisco",
    ];

    return (
        <section className="clients">
            <h2>Trusted By Leading Companies</h2>

            <div className="client-grid">
                {clients.map((client, index) => (
                    <div className="client-card" key={index}>
                        {client}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Clients;