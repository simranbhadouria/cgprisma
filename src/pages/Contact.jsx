import "./Contact.css";
import { MapPin, Phone, Mail } from "lucide-react";

function Contact() {
    return (
        <>
            <section className="contact-hero">
                <h1>Contact Us</h1>

                <p>
                    We'd love to hear from you. Get in touch with our cybersecurity
                    experts today.
                </p>
            </section>

            <section className="contact-container">

                <div className="contact-info">

                    <h2>Get In Touch</h2>

                    <p><MapPin size={18} /> Jharkhand, Delhi, Bangalore</p>

                    <p><Phone size={18} /> +91 7303347098</p>
                    <p><Phone size={18} /> +91 65779 645319</p>

                    <p><Mail size={18} /> support@cynoxsecurity.com</p>

                    <p>
                        Our team is available to help with cybersecurity,
                        compliance, SOC services, and cloud security.
                    </p>

                </div>

                <div className="contact-form">

                    <h2>Send a Message</h2>

                    <form>

                        <input
                            type="text"
                            placeholder="Your Name"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                        />

                        <textarea
                            rows="6"
                            placeholder="Your Message"
                        ></textarea>

                        <button type="submit">
                            Send Message
                        </button>

                    </form>

                </div>

            </section>
        </>
    );
}

export default Contact;