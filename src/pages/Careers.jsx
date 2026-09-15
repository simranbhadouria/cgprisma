import "./Careers.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Careers() {
    const navigate = useNavigate();
    return (
        <section className="careers">

            <div className="careers-container">

                <span className="careers-tag">
                    Careers
                </span>

                <h1>
                    Join Our Growing Team
                </h1>

                <p>
                    We're looking for passionate professionals to help us
                    build the future of cybersecurity. Explore exciting
                    opportunities and grow your career with us.
                </p>

                <div className="job-grid">

                    {[
                        {
                            title: "Security Analyst",
                            desc: "Monitor threats and respond to security incidents."
                        },
                        {
                            title: "Cloud Security Engineer",
                            desc: "Secure AWS, Azure and Google Cloud environments."
                        },
                        {
                            title: "Frontend React Developer",
                            desc: "Build beautiful dashboards and modern web applications."
                        }
                    ].map((job, index) => (

                        <motion.div
                            className="job-card"
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ scale: 1.03 }}
                        >

                            <h3>{job.title}</h3>

                            <p>{job.desc}</p>

                            <button
                                className="apply-btn"
                                onClick={() => navigate("/contact")}
                            >
                                Apply Now
                            </button>
                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Careers;