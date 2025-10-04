import React from "react";
import HeroSection from "../components/HeroSection";
import TeamMembers from "./home/components/TeamMembers";
import JoinGraceRouteCard from "../components/JoinUsCard";

const Managements = () => {
  return (
    <section className=" bg-gray-50">
      <HeroSection
        title="Our Management Team"
        sub_title="Meet Our "
        highlight=" Management Team"
        quote="At Grace Route Limited, our strength lies in the vision, integrity, and
    dedication of our leadership team. Together, we are committed to guiding
    clients through every stage of their real estate journey with expertise and
    trust."
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
      />
      <TeamMembers />
      <JoinGraceRouteCard />
    </section>
  );
};

export default Managements;
