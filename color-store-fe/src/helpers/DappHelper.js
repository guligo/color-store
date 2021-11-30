import Web3 from 'web3';
import ColorStore from "../contracts/ColorStore.json";
import ColorCoin from "../contracts/ColorCoin.json";

const web3 = new Web3(window.ethereum);

let colorStoreContractInstance;
let colorCoinContractInstance;

const DappHelper = {

  isMetaMaskInstalled: () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  },

  connectMetaMask: async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  },

  getFirstActiveMetaMaskAccount: async () => {
    const accounts = await window.ethereum.request({method: 'eth_accounts'});
    return accounts && accounts[0];
  },

  getColorStoreContractInstance: async () => {
    if (!colorStoreContractInstance) {
      const networkId = await web3.eth.net.getId();
      colorStoreContractInstance = new web3.eth.Contract(
        ColorStore.abi,
        ColorStore.networks[networkId] && ColorStore.networks[networkId].address,
      );
    }
    return colorStoreContractInstance;
  },

  getColorCoinContractInstance: async () => {
    if (!colorCoinContractInstance) {
      const networkId = await web3.eth.net.getId();
      colorCoinContractInstance = new web3.eth.Contract(
        ColorCoin.abi,
        ColorCoin.networks[networkId] && ColorCoin.networks[networkId].address,
      );
    }
    return colorCoinContractInstance;
  },

  toWei: (amount) => {
    return web3.utils.toWei(amount, "wei")
  }
};

export default DappHelper;
