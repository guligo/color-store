const ColorCoin = artifacts.require("ColorCoin");

module.exports = async function(deployer) {
  await deployer.deploy(ColorCoin);

  let instance = await ColorCoin.deployed();
  await instance.createColor("0x5C116a3B0f0c62025e997848627F7aAcB3EAD907", 0xf0c05a); // Account 2 in MM
  await instance.createColor("0xeF9cBff74240AF0b4457DD917b610AFb7A9d2A63", 0x88b04b); // Account 2 in MM
  await instance.createColor("0xc5Da37F370d430ae5beeF43611422f0b6eCf5C0b", 0xdd4124); // Account 2 in MM
};
