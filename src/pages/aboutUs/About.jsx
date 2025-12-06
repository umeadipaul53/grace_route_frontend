import HeroSection from "../../components/HeroSection";
import AboutContent from "./components/AboutContent";
import AboutSection from "./components/AboutSection";
import TeamMembers from "../home/components/TeamMembers";
import TrustedPartners from "./components/TrustedPartners";
import Results from "./components/Results";
import JoinGraceRouteCard from "../../components/JoinUsCard";
import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>About Grace Route Ltd – Real Estate & Property Experts</title>
        <meta
          name="description"
          content="Learn about Grace Route Ltd, our mission, vision, achievements and commitment to delivering secure, transparent and profitable real estate solutions in Nigeria."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 text-slate-900 antialiased">
        <HeroSection
          title="About us"
          sub_title="Trust &"
          highlight="Integrity"
          quote="We don’t just build houses; we build lasting relationships founded on trust, transparency, and excellence."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/services_f1kdbd.png"
        />
        <AboutSection />
        <Results />
        <AboutContent />
        <TeamMembers />
        <JoinGraceRouteCard />
        <TrustedPartners />
      </div>
    </>
  );
}

export default About;
