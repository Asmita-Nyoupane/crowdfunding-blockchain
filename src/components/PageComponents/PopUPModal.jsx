import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const PopUPModal = ({
  setOpenModel,
  donate,
  getDonation,
  donateFunction,
  setDonate,
}) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setAllDonationData] = useState([]);

  const createDonation = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      console.log("Invalid donation amount");
      return;
    }
    try {
      const data = await donateFunction(donate.pId, amount);
      console.log("🚀 ~ createDonation ~ data:", data);
      setAllDonationData((prev) => [...prev, data]);
    } catch (error) {
      console.log("🚀 ~ createDonation ~ error:", error);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      const donationData = await getDonation(donate.pId);
      setAllDonationData(donationData);
    };

    fetchDonations();
  }, [getDonation, donate.pId]);

  return (
    <Modal
      title={donate.title}
      visible={true}
      onCancel={() => setOpenModel(false)}
      footer={[
        <Button key="close" onClick={() => setOpenModel(false)}>
          Close
        </Button>,
        <Button
          key="donate"
          type="primary"
          onClick={createDonation}
          disabled={!amount || isNaN(amount) || parseFloat(amount) <= 0}
        >
          Donate
        </Button>,
      ]}
      closeIcon={<CloseOutlined />}
    >
      <p>{donate.description}</p>
      <Input
        placeholder="Enter donation amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <div className="donation-list mt-4">
        <h3>Previous Donations</h3>
        {console.log("AllDonawtionData", allDonationData)}
        {allDonationData.length > 0 ? (
          allDonationData.map((donation, i) => (
            <p key={i}>
              <strong className="text-blue-700   font-semibold ml-4">
                Donation {i + 1} :
              </strong>{" "}
              <span className="text-green-800 font-medium">
                {" "}
                {donation.donation}{" "}
              </span>{" "}
              ETH from {donation.donator.slice(0, 35)}...
            </p>
          ))
        ) : (
          <p>No donations yet.</p>
        )}
      </div>
    </Modal>
  );
  console.log("🚀 ~ allDonationData:", allDonationData);
};

export default PopUPModal;
