const hre = require("hardhat");

async function main() {

  const Privacy = await hre.ethers.getContractFactory("Privacy");
  const privacy = await Privacy.deploy([
    ethers.utils.formatBytes32String("password1"),
    ethers.utils.formatBytes32String("password2"),
    ethers.utils.formatBytes32String("password3"),
  ]); 
  await privacy.deployed();
  console.log(`Privacy deployed to ${privacy.address}`);

  console.log(`locked = ${await privacy.locked()}`);

  console.log(`${await ethers.provider.getStorageAt(privacy.address, 5)}`);

  console.log(`${
    ethers.utils.parseBytes32String(
      await ethers.provider.getStorageAt(privacy.address, 5)
    )}`);
  
  await privacy.unlock(
    ethers.utils.hexDataSlice(
      await ethers.provider.getStorageAt(privacy.address, 5), 0, 16 
      )
    );
  console.log(`locked = ${await privacy.locked()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



