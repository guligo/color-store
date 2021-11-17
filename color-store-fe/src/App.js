import './App.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ColorStore from "./contracts/ColorStore.json";
import ColorCoin from "./contracts/ColorCoin.json";
import Web3 from 'web3';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      publicKey: null,
      colors: [],
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

  handleBuyToken = async (tokenId) => {
    console.log(`Buying token with ID ${tokenId}`);

    await this.colorStoreContractInstance.methods.buyToken(tokenId).send({from: this.accounts[0], value: this.web3.utils.toWei("100000000000", "wei")});
  }

  handleSellToken = async (tokenId) => {
    console.log(`Selling token with ID ${tokenId}`);

    let operationApproved = await this.colorCoinContractInstance.methods.isApprovedForAll(this.state.publicKey, ColorStore.networks[this.networkId].address).call();
    if (!operationApproved) {
      await this.colorCoinContractInstance.methods.setApprovalForAll(ColorStore.networks[this.networkId].address, true).send({from: this.accounts[0]});
    }
    await this.colorStoreContractInstance.methods.sellToken(tokenId).send({from: this.accounts[0]});
  }

  renderActionButtons(color) {
      if (color.owner.id === this.state.publicKey) {
        return (
          <TableCell align="center">
            <Button variant="contained">View</Button>
            <Button variant="contained" onClick={_ => this.handleSellToken(color.tokenId)}>Sell</Button>
          </TableCell>
        );
      }
      return (
        <TableCell align="center">
          <Button variant="contained" onClick={_ => this.handleBuyToken(color.tokenId)}>Buy</Button>
        </TableCell>
      )
  };

  render() {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <AppBar position="static" sx={{ textAlighn: 'center' }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Welcome to the Color Store user { this.state.publicKey }!
            </Typography>
          </Toolbar>
        </AppBar>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Owner</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.colors.map((color) => (
                <TableRow
                  hover
                  key={color.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    <Tooltip title={ '#' + color.tokenId.toString(16) }>
                      <CircleIcon sx={{ color: '#' + color.tokenId.toString(16) }} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">{ color.owner.alias ? color.owner.alias : color.owner.id }</TableCell>
                  { this.renderActionButtons(color) }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };
}

export default App;
