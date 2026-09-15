import "./CloudSecurity.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Cloud,
    Shield,
    Lock,
    Server,
    Database,
    Globe,
    ArrowRight
} from "lucide-react";

function CloudSecurity() {

    const services = [
        {
            icon: <Cloud size={40} />,
            title: "Multi-Cloud Security",
            desc: "Protect AWS, Microsoft Azure, and Google Cloud environments with enterprise-grade security."
        },
        {
            icon: <Shield size={40} />,
            title: "Cloud Threat Protection",
            desc: "Detect and respond to threats in real time using AI-powered monitoring."
        },
        {
            icon: <Lock size={40} />,
            title: "Identity & Access",
            desc: "Secure user identities with MFA, IAM, and Zero Trust access controls."
        },
        {
            icon: <Server size={40} />,
            title: "Workload Protection",
            desc: "Protect virtual machines, containers, and Kubernetes workloads."
        },
        {
            icon: <Database size={40} />,
            title: "Data Security",
            desc: "Encrypt sensitive information and prevent unauthorized access."
        },
        {
            icon: <Globe size={40} />,
            title: "Compliance",
            desc: "Meet ISO 27001, GDPR, SOC 2, PCI DSS, and industry regulations."
        }
    ];

    return (
        <section className="cloud">

            <motion.div
                className="cloud-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >

                <motion.span
                    className="cloud-tag"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Cloud Security
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Secure Your Cloud
                    <br />
                    Infrastructure
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Protect your cloud applications, workloads, identities,
                    and sensitive data with enterprise-grade cloud security
                    solutions designed for modern businesses.
                </motion.p>

            </motion.div>

            <div className="cloud-grid">

                {services.map((service, index) => (

                    <motion.div
                        key={index}
                        className="cloud-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.12
                        }}
                        viewport={{ once: true }}
                        whileHover={{
                            y: -10,
                            scale: 1.03
                        }}
                    >

                        <div className="cloud-icon">
                            {service.icon}
                        </div>

                        <h3>{service.title}</h3>

                        <p>{service.desc}</p>

                        <Link to="/contact" className="learn-btn">
                            Learn More
                            <ArrowRight size={18} />
                        </Link>

                    </motion.div>

                ))}

            </div>

            <motion.div
                className="cloud-cta"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >

                <h2>
                    Ready to Secure Your Cloud?
                </h2>


                <p>
                    Let our cybersecurity experts protect your cloud
                    infrastructure with continuous monitoring, threat detection,
                    compliance, and managed security services.
                </p>
                <Link to="/contact" className="cta-btn">
                    Talk to Our Experts
                </Link>

            </motion.div>

        </section>
    );
}

export default CloudSecurity;