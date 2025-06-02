import React from "react";
import Header from "@/components/Header";
import Steps from "@/components/Steps";
import Description from "@/components/Description";
import Testimonials from "@/components/Testimonials";
import GenerateButton from "@/components/GenerateButton";
const HomePage = () => {
    return (
        <div>
            <Header />
            <Steps />
            <Description />
            <Testimonials />
            <GenerateButton />
        </div>
    );
};

export default HomePage;