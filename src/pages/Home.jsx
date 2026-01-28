import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import SocialProof from '../components/SocialProof'
import ProblemStatement from '../components/ProblemStatement'
import ServicePillars from '../components/ServicePillars'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import ThemeController from '../components/ThemeController'

function Home() {
    return (
        <>
            <ThemeController />
            <Navbar />
            <Hero />
            <SocialProof />
            <ProblemStatement />
            <ServicePillars />
            <FAQ />
            <CTA />
            <Footer />
        </>
    )
}

export default Home
