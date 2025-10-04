import HeroSection from "../../components/HeroSection";
import AboutContent from "./components/AboutContent";
import AboutSection from "./components/AboutSection";
import TeamMembers from "../home/components/TeamMembers";
import TrustedPartners from "./components/TrustedPartners";
import Results from "./components/Results";
import JoinGraceRouteCard from "../../components/JoinUsCard";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 antialiased">
      <HeroSection
        title="About us"
        sub_title="Trust &"
        highlight="Integrity"
        quote="We don’t just build houses; we build lasting relationships founded on trust, transparency, and excellence."
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
      />
      <AboutSection />
      <Results />
      <AboutContent />
      <TeamMembers />
      <TrustedPartners />
      <JoinGraceRouteCard />
    </div>
  );
}

export default About;
