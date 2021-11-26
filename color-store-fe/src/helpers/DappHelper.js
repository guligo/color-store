const DappHelper = {
  isMetaMaskInstalled: () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  },

  connectMetaMask: async () => {
    try {
      const { ethereum } = window;
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  },

  getFirstActiveMetaMaskAccount: async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({method: 'eth_accounts'});
    return accounts && accounts[0];
  }
}

export default DappHelper;
