import Hero from "../components/Hero";
import SecurityCards from "../components/SecurityCards";
import TrustedCompanies from "../components/TrustedCompanies";
import Services from "../components/Services";
import Stats from "../components/Stats";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";

function Home() {
    return (
        <>

            <Hero />
            <SecurityCards />
            <TrustedCompanies />
            <Services />
            <Stats />
            <ContactCTA />
            <Footer />
        </>
    );
}

export default Home;