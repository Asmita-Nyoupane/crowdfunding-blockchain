"use client";
import React, { useEffect, useContext, useState } from "react";
import { CrowdFundingContext } from "@/Context/CrowdFunding";
import Hero from "@/components/PageComponents/Hero";
import { CustomCard } from "@/components/PageComponents/Card";
import PopUPModal from "@/components/PageComponents/PopUPModal";
import Loading from "./loading";

export default function Home() {
  const {
    titleData,
    createCampaign,
    getCampaigns,
    getUserCampaign,
    donate,
    getDonation,
  } = useContext(CrowdFundingContext);
  const [allCampaigns, setAllCampaigns] = useState();
  const [userCampaign, setUserCampaign] = useState();
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const getCampaignsData = getCampaigns();
  //   const userCampaignData = getUserCampaign();
  //   return async () => {
  //     const allData = await getCampaignsData;
  //     const userData = await userCampaignData;
  //     setAllCampaigns(allData);
  //     setUserCampaign(userData);
  //   };
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaign();
        console.log("All Campaigns Data:", allData);
        console.log("User Campaign Data:", userData);
        setAllCampaigns(allData);
        setUserCampaign(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getCampaigns, getUserCampaign]);
  // Donate popup Model
  console.log("🚀 ~ Home ~ donateCampaign:", donateCampaign);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <CustomCard
            title="All listed Campaign"
            allCampaigns={allCampaigns}
            setOpenModel={setOpenModel}
            setDonate={setDonateCampaign}
          />
          <CustomCard
            title="Your Created Campaign "
            allCampaigns={userCampaign}
            setOpenModel={setOpenModel}
            setDonate={setDonateCampaign}
          />
        </>
      )}

      {openModel && (
        <PopUPModal
          setOpenModel={setOpenModel}
          getDonation={getDonation}
          donate={donateCampaign}
          donateFunction={donate}
          setDonate={setDonateCampaign}
        />
      )}
    </>
  );
}
