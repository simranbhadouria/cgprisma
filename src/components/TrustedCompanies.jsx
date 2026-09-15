import "./TrustedCompanies.css";
import { motion } from "framer-motion";

import securex from "../assets/logos/securex.png";
import netguard from "../assets/logos/netguard.png";
import cloudvault from "../assets/logos/cloudvault.png";
import threatpoint from "../assets/logos/threatpoint.png";
import cybernexus from "../assets/logos/cybernexus.png";
import sectrio from "../assets/logos/sectrio.png";

function TrustedCompanies() {

    const companies = [
        { logo: securex, name: "SecureX" },
        { logo: netguard, name: "NetGuard" },
        { logo: cloudvault, name: "CloudVault" },
        { logo: threatpoint, name: "ThreatPoint" },
        { logo: cybernexus, name: "CyberNexus" },
        { logo: sectrio, name: "Sectrio" },
    ];

    return (

        <section className="trusted">

            <h2>
                Trusted By Leading Organizations
            </h2>

            <p className="trusted-text">
                Businesses worldwide trust Cynox Global   to protect
                their digital infrastructure.
            </p>

            <div className="company-logos">

                {companies.map((company, index) => (

                    <motion.div
                        className="company-card"
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.12
                        }}
                        whileHover={{
                            scale: 1.05,
                            y: -8
                        }}
                        viewport={{ once: true }}
                    >

                        <img
                            src={company.logo}
                            alt={company.name}
                        />

                    </motion.div>

                ))}

            </div>

        </section>

    );
}

export default TrustedCompanies;