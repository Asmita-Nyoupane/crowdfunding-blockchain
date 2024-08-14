import React from "react";
import { Card, Button } from "antd";
import Image from "next/image";

export function CustomCard({ title, allCampaigns, setOpenModel, setDonate }) {
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  return (
    <div className="space-y-4 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h2 className="text-2xl md:text-4xl font-semibold text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allCampaigns?.map((campaign, i) => (
          <Card
            key={i + 1}
            hoverable
            title={campaign.title.toUpperCase()}
            extra={`Days Left: ${daysLeft(campaign.deadline)}`}
            style={{ minWidth: "300px" }}
            onClick={() => (setDonate(campaign), setOpenModel(true))}
          >
            <Image
              src={
                campaign.image ||
                "https://images.unsplash.com/photo-1722082839802-18b18cb23a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
              }
              height={200}
              width={300}
              className="object-cover w-full h-48 rounded-2xl"
              alt="Campaign Image"
            />
            <p className="text-gray-600 font-semibold capitalize">
              {campaign.description}
            </p>
            <div className="flex justify-between mt-4">
              <Button type="link" danger>
                Target: {campaign.target} ETH
              </Button>
              <Button type="link" style={{ color: "green" }}>
                Raised: {campaign.amountCollected} ETH
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
