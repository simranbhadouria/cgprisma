import "./Testimonials.css";

const testimonials = [
    {
        name: "John Smith",
        company: "ABC Technologies",
        logo: "/logos/abc.png",
        review:
            "Cynox helped us improve our security posture with 24×7 SOC monitoring and rapid incident response.",
    },
    {
        name: "Priya Sharma",
        company: "FinSecure Pvt Ltd",
        logo: "/logos/abc.png",
        review:
            "Excellent support team and seamless compliance guidance. Their platform is easy to use.",
    },
    {
        name: "David Wilson",
        company: "CloudX Solutions",
        logo: "/logos/abc.png",
        review:
            "The threat intelligence and managed security services have significantly reduced our response time.",
    },
];

function Testimonials() {
    return (
        <section className="testimonials">
            <div className="testimonial-title">
                <h2>What Our Clients Say</h2>
                <p>Trusted by organizations across multiple industries.</p>
            </div>

            <div className="testimonial-grid">
                {testimonials.map((item, index) => (
                    <div className="testimonial-card" key={index}>

                        <img
                            src={item.logo}
                            className="company-logo"
                            alt={item.company}
                        />

                        <p className="review">"{item.review}"</p>

                        <h3>{item.name}</h3>

                        <span>{item.company}</span>

                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;