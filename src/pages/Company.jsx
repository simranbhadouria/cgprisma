import "./Company.css";
import { motion } from "framer-motion";
import {
    Building2,
    Target,
    Eye,
    HeartHandshake,
    ShieldCheck,
    Users,
    ArrowRight
} from "lucide-react";

function Company() {

    const values = [
        {
            icon: <Target size={40} />,
            title: "Our Mission",
            desc: "Deliver enterprise-grade cybersecurity solutions that protect organizations from evolving cyber threats."
        },
        {
            icon: <Eye size={40} />,
            title: "Our Vision",
            desc: "Become one of the world's most trusted cybersecurity companies through innovation and excellence."
        },
        {
            icon: <HeartHandshake size={40} />,
            title: "Our Values",
            desc: "Integrity, transparency, innovation, and customer success are at the heart of everything we do."
        },
        {
            icon: <ShieldCheck size={40} />,
            title: "Trusted Security",
            desc: "Providing 24×7 security monitoring, threat detection, compliance, and incident response."
        },
        {
            icon: <Users size={40} />,
            title: "Expert Team",
            desc: "Our experienced cybersecurity professionals help businesses stay protected every day."
        },
        {
            icon: <Building2 size={40} />,
            title: "Enterprise Solutions",
            desc: "Scalable security services designed for startups, SMEs, and global enterprises."
        }
    ];

    return (
        <section className="company">

            <motion.div
                className="company-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >

                <motion.span
                    className="company-tag"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    About Cynox Global
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Building Trust Through
                    <br />
                    Cyber Security
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .3 }}
                >
                    Cynox Global   delivers advanced cybersecurity services,
                    managed SOC, cloud security, threat intelligence,
                    compliance, and security consulting to organizations
                    worldwide.
                </motion.p>

            </motion.div>

            <div className="company-grid">

                {values.map((item, index) => (

                    <motion.div
                        className="company-card"
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: .5,
                            delay: index * .1
                        }}
                        whileHover={{
                            y: -10,
                            scale: 1.03
                        }}
                        viewport={{ once: true }}
                    >

                        <div className="company-icon">
                            {item.icon}
                        </div>

                        <h3>{item.title}</h3>

                        <p>{item.desc}</p>

                    </motion.div>

                ))}

            </div>

            <motion.div
                className="company-cta"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .7 }}
                viewport={{ once: true }}
            >

                <h2>Protect Your Business with Confidence</h2>

                <p>
                    Partner with Cynox Global   to strengthen your cybersecurity
                    strategy with industry-leading technologies and expert support.
                </p>

                <button className="company-btn">
                    Contact Us
                    <ArrowRight size={18} />
                </button>

            </motion.div>

        </section>
    );
}

export default Company;