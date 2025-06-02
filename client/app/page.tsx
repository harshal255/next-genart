import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Steps from "@/components/Steps";
import Description from "@/components/Description";
import Testimonials from "@/components/Testimonials";
import GenerateButton from "@/components/GenerateButton";

const Home = () => {

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

export default Home;