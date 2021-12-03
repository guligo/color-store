const fs = require('fs').promises;
require('dotenv').config({path: "../.env"});

const ColorCoin = artifacts.require('ColorCoin');
const ColorStore = artifacts.require('ColorStore');

module.exports = async function(deployer) {
  console.log(`Deploying contracts with following metafile base URI: ${process.env.META_URI}`);
  await deployer.deploy(ColorCoin, process.env.META_URI);
  await deployer.deploy(ColorStore, ColorCoin.address, 100000000000);

  console.log('Creating application-dev.yaml file');
  await fs.writeFile(
    '../color-store-be/src/main/resources/application-dev.yaml',
    `blockchain.contracts.color-coin.address: "${ColorCoin.address}"\n` +
    `blockchain.contracts.color-store.address: "${ColorStore.address}"\n`
  );

  // this will just modify mapping of balances in ERC721 token, it does not transfer
  // anything to ColorStore.address
  console.log('Creating tokens');
  let instance = await ColorCoin.deployed();
  await instance.createColor(ColorStore.address, 0x9BB7D4);
  await instance.createColor(ColorStore.address, 0xC74375);
  await instance.createColor(ColorStore.address, 0xBF1932);
  await instance.createColor(ColorStore.address, 0x7BC4C4);
  await instance.createColor(ColorStore.address, 0xE2583E);
  await instance.createColor(ColorStore.address, 0x53B0AE);
  await instance.createColor(ColorStore.address, 0xDECDBE);
  await instance.createColor(ColorStore.address, 0x9B1B30);
  await instance.createColor(ColorStore.address, 0x5A5B9F);
  await instance.createColor(ColorStore.address, 0xF0C05A);
};
