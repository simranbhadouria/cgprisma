import "./Datasheets.css";

function Datasheets() {
    return (
        <section className="datasheets-page">

            <div className="datasheets-header">

                <span className="datasheets-tag">
                    Resources
                </span>

                <h1>
                    Download Security
                    <br />
                    Datasheets
                </h1>

                <p>
                    Learn more about our cybersecurity solutions, SOC services,
                    cloud security, compliance, and managed security offerings.
                </p>

            </div>

            <div className="datasheet-grid">

                <div className="datasheet-card">
                    <h3>SOC Services</h3>
                    <p>24×7 Managed Security Operations Center.</p>
                    <a
                        href="/datasheets/soc.pdf"
                        download
                        className="download-btn"
                    >
                        Download PDF
                    </a>
                </div>

                <div className="datasheet-card">
                    <h3>Cloud Security</h3>
                    <p>Protect AWS, Azure and Google Cloud.</p>
                    <a
                        href="/datasheets/cloud.pdf"
                        download
                        className="download-btn"
                    >
                        Download PDF
                    </a>
                </div>

                <div className="datasheet-card">
                    <h3>Compliance</h3>
                    <p>ISO 27001, SOC2, RBI & GDPR solutions.</p>
                    <a
                        href="/datasheets/compliance.pdf"
                        download
                        className="download-btn"
                    >
                        Download PDF
                    </a>
                </div>

                <div className="datasheet-card">
                    <h3>Threat Intelligence</h3>
                    <p>Advanced cyber threat monitoring.</p>
                    <a
                        href="/datasheets/threat.pdf"
                        download
                        className="download-btn"
                    >
                        Download PDF
                    </a>
                </div>

            </div>

        </section>
    );
}

export default Datasheets;