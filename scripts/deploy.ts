import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying SaveERC20 contract with the account:", deployer.address);

  const SaveERC20 = await ethers.getContractFactory("SaveERC20");
  const savingTokenAddress = "<YOUR_ERC20_TOKEN_ADDRESS>"; // Replace with your ERC20 token address
  const saveERC20 = await SaveERC20.deploy(savingTokenAddress);

  await saveERC20.deployed();

  console.log(
    `SaveERC20 deployed with saving token address ${savingTokenAddress} at address: ${saveERC20.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

