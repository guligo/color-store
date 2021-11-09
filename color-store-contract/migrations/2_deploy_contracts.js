const ColorCoin = artifacts.require("ColorCoin");

module.exports = async function(deployer) {
  deployer.deploy(ColorCoin);
};
