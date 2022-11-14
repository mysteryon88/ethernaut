const hre = require('hardhat')

async function main() {
  const [owner] = await ethers.getSigners()

  const GatekeeperTwo = await hre.ethers.getContractFactory('GatekeeperTwo')
  const gatekeeperTwo = await GatekeeperTwo.deploy()
  await gatekeeperTwo.deployed()
  console.log(`GatekeeperTwo deployed to ${gatekeeperTwo.address}`)

  const HackGates = await hre.ethers.getContractFactory('HackGates')
  const hackGates = await HackGates.deploy(gatekeeperTwo.address)
  await hackGates.deployed()
  console.log(`HackGates deployed to ${hackGates.address}`)

  if (owner.address == (await gatekeeperTwo.entrant())) console.log('Done!')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
