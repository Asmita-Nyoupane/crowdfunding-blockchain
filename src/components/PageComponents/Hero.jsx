"use client";
import React, { useState } from "react";
import Featured from "./Featured";
import CreateCampaignForm from "./Form/CreateCampaignForm";

const Hero = ({ titleData, createCampaign }) => {
  return (
    <div className=" min-h-screen grid  grid-cols-1 md:grid-cols-2 gap-10 w-11/12 mx-auto py-10">
      <div>
        <Featured />
      </div>
      <div>
        <CreateCampaignForm createCampaign={createCampaign} />
      </div>
    </div>
  );
};

export default Hero;
