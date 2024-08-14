import { ChevronRight } from "lucide-react";
import React from "react";

const Featured = () => {
  return (
    <div className=" flex flex-col gap-6  place-content-center h-full">
      <h1 className="text-white font-bold  text-3xl   text-center md:text-5xl">
        DreamFund: Blockchain-Powered Crowdfunding for Your Dreams
      </h1>
      <p className=" md:font-semibold text-white text-center leading-6">
        DreamFund is a blockchain-based crowdfunding platform, ensuring secure,
        transparent, and fair project funding. Join us to support and realize
        innovative dreams worldwide
      </p>
      <p className="text-white flex justify-center items-center ">
        Learn More <ChevronRight className="text-white ml-1" size={24} />
      </p>
    </div>
  );
};

export default Featured;
