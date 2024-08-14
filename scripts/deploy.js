const hre = require("hardhat");
async function main() {
  // 0x5FbDB2315678afecb367f032d93F642f64180aa3
  //  0x5FbDB2315678afecb367f032d93F642f64180aa3
  //  0x5FbDB2315678afecb367f032d93F642f64180aa3
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.deployed();

  console.log(` Crowdfunding deployed to ${crowdFunding.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
