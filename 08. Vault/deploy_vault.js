const hre = require('hardhat')

async function main() {
  const Vault = await hre.ethers.getContractFactory('Vault')
  const vault = await Vault.deploy(ethers.utils.formatBytes32String('password'))
  await vault.deployed()
  console.log(`Vault deployed to ${vault.address}`)

  console.log(`Now contract locked = ${await vault.locked()}`)

  await vault.unlock(await ethers.provider.getStorageAt(vault.address, 1))

  console.log(`Now contract locked = ${await vault.locked()}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
