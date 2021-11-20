import './App.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuBar from "./components/MenuBar"
import AssetList from "./components/AssetList"
import AssetDialog from "./components/AssetDialog"
import ColorStore from "./contracts/ColorStore.json";
import ColorCoin from "./contracts/ColorCoin.json";
import Web3 from 'web3';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      publicKey: null,
      colors: [],
      assetDialogData: null,
      assetDialogDisplayed: false
    };
  }

  async componentDidMount() {
    var publicKey = await window.ethereum.request({method: 'eth_accounts'});

    fetch('http://localhost:8080/colors')
     .then(res => {
       return res.json();
     })
     .then(colors => this.setState({colors: colors, publicKey: publicKey[0]}))
     .catch(console.log)

    try {
      this.web3 = new Web3(window.ethereum);

      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance
      this.networkId = await this.web3.eth.net.getId();

      this.colorStoreContractInstance = new this.web3.eth.Contract(
        ColorStore.abi,
        ColorStore.networks[this.networkId] && ColorStore.networks[this.networkId].address,
      );

      this.colorCoinContractInstance = new this.web3.eth.Contract(
        ColorCoin.abi,
        ColorCoin.networks[this.networkId] && ColorCoin.networks[this.networkId].address,
      );
    } catch (err) {
      console.error(err);
    }
  }

  handleViewAsset = (asset) => {
    this.setState({
      assetDialogData: asset,
      assetDialogDisplayed: true
    });
  };

  handleBuyAsset = async (asset) => {
    console.log(`Buying token with ID ${asset.tokenId}`);

    await this.colorStoreContractInstance.methods.buyToken(asset.tokenId).send({from: this.accounts[0], value: this.web3.utils.toWei("100000000000", "wei")});
  };

  handleSellAsset = async (asset) => {
    console.log(`Selling token with ID ${asset.tokenId}`);

    let operationApproved = await this.colorCoinContractInstance.methods.isApprovedForAll(this.state.publicKey, ColorStore.networks[this.networkId].address).call();
    if (!operationApproved) {
      await this.colorCoinContractInstance.methods.setApprovalForAll(ColorStore.networks[this.networkId].address, true).send({from: this.accounts[0]});
    }
    await this.colorStoreContractInstance.methods.sellToken(asset.tokenId).send({from: this.accounts[0]});
  };

  handleCloseAssetDialog = async () => {
    this.setState({
      assetDialogData: null,
      assetDialogDisplayed: false
    });
  }

  render() {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <MenuBar account={ this.state.publicKey } />
        <AssetList
          assets={ this.state.colors }
          account={ this.state.publicKey }
          onViewAsset={ this.handleViewAsset }
          onBuyAsset={ this.handleBuyAsset }
          onSellAsset={ this.handleSellAsset} />
        <AssetDialog
          open={ this.state.assetDialogDisplayed }
          data={ this.state.assetDialogData }
          onClose={ this.handleCloseAssetDialog } />
      </Paper>
    );
  };
}

export default App;
