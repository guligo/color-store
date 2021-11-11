const ColorCoin = artifacts.require("ColorCoin");

module.exports = async function(deployer) {
  await deployer.deploy(ColorCoin);

  let instance = await ColorCoin.deployed();
  await instance.createColor("0x2b14E2F50f6c7c9aaF64d0c3C66295f7180E9042", 0xf0c05a); // Account 8 in MM
  await instance.createColor("0x2b14E2F50f6c7c9aaF64d0c3C66295f7180E9042", 0x88b04b); // Account 8 in MM
  await instance.createColor("0x2b14E2F50f6c7c9aaF64d0c3C66295f7180E9042", 0xdd4124); // Account 8 in MM
};
