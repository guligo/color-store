const ColorCoin = artifacts.require("ColorCoin");

module.exports = async function(deployer) {
  await deployer.deploy(ColorCoin);

  let instance = await ColorCoin.deployed();
  await instance.createColor("0x87939FB60BBa17210b840044BC380B98754af28d", 0xf0c05a); // Account 2 in MM
  await instance.createColor("0x87939FB60BBa17210b840044BC380B98754af28d", 0x88b04b); // Account 2 in MM
  await instance.createColor("0x87939FB60BBa17210b840044BC380B98754af28d", 0xdd4124); // Account 2 in MM
};
