import "./Services.css";
import { Shield, Lock, Cloud, Activity } from "lucide-react";
import { motion } from "framer-motion";


function Services() {

    const services = [

        {
            icon: <Shield size={40} />,
            title: "Security Monitoring",
            desc: "24/7 monitoring and protection against cyber threats."
        },


        {
            icon: <Lock size={40} />,
            title: "Threat Detection",
            desc: "Advanced AI powered threat detection solutions."
        },


        {
            icon: <Cloud size={40} />,
            title: "Cloud Security",
            desc: "Secure your cloud infrastructure and applications."
        },


        {
            icon: <Activity size={40} />,
            title: "SOC Services",
            desc: "Expert security operations center support."
        }

    ];


    return (

        <section className="services">


            <h2>
                Our Cybersecurity Solutions
            </h2>


            <div className="service-grid">


                {
                    services.map((service, index) => (


                        <motion.div

                            className="service-card"

                            key={index}


                            initial={{
                                opacity: 0,
                                y: 40
                            }}


                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}


                            transition={{
                                duration: .5,
                                delay: index * 0.15
                            }}

                        >


                            <div className="service-icon">

                                {service.icon}

                            </div>


                            <h3>
                                {service.title}
                            </h3>


                            <p>
                                {service.desc}
                            </p>


                            <a href="#">
                                Learn More →
                            </a>


                        </motion.div>


                    ))
                }


            </div>


        </section>

    )

}


export default Services;