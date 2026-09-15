import "./WhyChooseUs.css";

import {
    ShieldCheck,
    BrainCircuit,
    Users,
    Building2
} from "lucide-react";


function WhyChooseUs() {


    const features = [

        {
            icon: <ShieldCheck size={40} />,
            title: "Advanced Security Operations",
            desc: "24/7 security operations with advanced threat monitoring."
        },


        {
            icon: <BrainCircuit size={40} />,
            title: "AI Powered Monitoring",
            desc: "Artificial intelligence driven threat detection and response."
        },


        {
            icon: <Users size={40} />,
            title: "Expert Security Team",
            desc: "Experienced cybersecurity professionals protecting your business."
        },


        {
            icon: <Building2 size={40} />,
            title: "Enterprise Protection",
            desc: "Complete cybersecurity solutions for modern enterprises."
        }

    ];



    return (


        <section className="why">


            <h2>Why Choose Cynox Global  ?</h2>

            <p className="why-subtitle">
                Enterprise-grade cybersecurity solutions powered by AI,
                24×7 SOC monitoring, and expert security professionals.
            </p>



            <div className="why-grid">


                {
                    features.map((item, index) => (


                        <div
                            className="why-card"
                            key={index}
                        >


                            <div className="why-icon">

                                {item.icon}

                            </div>



                            <h3>
                                {item.title}
                            </h3>



                            <p>
                                {item.desc}
                            </p>


                        </div>


                    ))
                }


            </div>


        </section>


    )


}


export default WhyChooseUs;