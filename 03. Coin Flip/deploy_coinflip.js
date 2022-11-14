const hre = require('hardhat')

async function main() {
  const CoinFlip = await hre.ethers.getContractFactory('CoinFlip')
  const coinFlip = await CoinFlip.deploy()
  await coinFlip.deployed()
  console.log(`CoinFlip deployed to ${coinFlip.address}`)

  const Hack = await hre.ethers.getContractFactory('Hack')
  const hack = await Hack.deploy(coinFlip.address)
  await hack.deployed()

  console.log(`Hack deployed to ${hack.address}`)

  for (i = 0; i < 10; ++i) {
    hack.attack()
    console.log(await coinFlip.consecutiveWins())
  }

  console.log(await ethers.provider.getStorageAt(coinFlip.address, 0))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
