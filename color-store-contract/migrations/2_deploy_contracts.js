const ColorCoin = artifacts.require("ColorCoin");

module.exports = async function(deployer) {
  deployer.deploy(ColorCoin);

  let instance = await ColorCoin.deployed();
  await instance.createColor("0x87939FB60BBa17210b840044BC380B98754af28d", 1); // Account 2 in MM
};
