import React from "react";
import HeroSection from "../components/HeroSection";
import TeamMembers from "./home/components/TeamMembers";
import JoinGraceRouteCard from "../components/JoinUsCard";
import { Helmet } from "react-helmet";

const Managements = () => {
  return (
    <>
      <Helmet>
        <title>Management Team – Grace Route Ltd</title>
        <meta
          name="description"
          content="Meet the experienced management team behind Grace Route Ltd, driving excellence in real estate development and property investment."
        />
      </Helmet>
      <section className=" bg-gray-50">
        <HeroSection
          title="Our Management Team"
          sub_title="Meet Our "
          highlight=" Management Team"
          quote="At Grace Route Limited, our strength lies in the vision, integrity, and
    dedication of our leadership team. Together, we are committed to guiding
    clients through every stage of their real estate journey with expertise and
    trust."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/services_f1kdbd.png"
        />
        <TeamMembers />
        <JoinGraceRouteCard />
      </section>
    </>
  );
};

export default Managements;
