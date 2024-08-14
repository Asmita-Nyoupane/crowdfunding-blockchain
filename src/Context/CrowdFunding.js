"use client";
import React, { useState, useEffect, createContext, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// internal import
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";

// fetching smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";
  const [currentAccount, setCurrentAccount] = useState("");

  const createCampaign = async (campaign) => {
    const { title, description, amount, deadline } = campaign;
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    console.log("Current account", currentAccount);

    try {
      const transaction = await contract.createCampaign(
        currentAccount, // owner
        title, // title
        description, // description
        ethers.utils.parseUnits(amount, 18), // amount
        new Date(deadline).getTime() // deadline
      );
      await transaction.wait();
      console.log("Contract call success", transaction);
    } catch (error) {
      console.log("🚀 ~ createCampaign ~ error:", error);
    }
  };

  const getCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const campaigns = await contract.getCampaigns();
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      pId: i,
    }));
    return parsedCampaigns;
  };

  const getUserCampaign = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const allCampaigns = await contract.getCampaigns();
    const account = await window.ethereum.request({ method: "eth_accounts" });
    const currentUser = account[0];
    // console.log("Current User:", currentUser);
    // console.log("All Campaigns:", allCampaigns);
    const filteredCampaigns = allCampaigns.filter((campaign) => {
      const campaignOwner = campaign.owner.toLowerCase();
      const userAddress = currentUser.toLowerCase();
      return campaignOwner === userAddress;
    });
    // console.log("🚀 ~ getUserCampaign ~ filteredCampaigns:", filteredCampaigns);

    const userData = filteredCampaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      pId: i,
    }));
    return userData;
  };

  const donate = async (pId, amount) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });
      await transaction.wait();
      location.reload();
      return transaction;
    } catch (error) {
      console.log("🚀 ~ donate ~ error:", error);
    }
  };

  const getDonation = async (pId) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const donations = await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  const checkIfWalletConnect = async () => {
    try {
      if (!window.ethereum) {
        console.log("Install MetaMask");
        return setOpenError(true), setError("Install MetaMask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnect();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log("Install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("🚀 Error while connecting to wallet:", error);
    }
  };

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaign,
        donate,
        getDonation,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
