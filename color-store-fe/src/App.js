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
  }

  renderActionButtons(color) {
      if (color.owner.id === this.state.publicKey) {
        return (
          <TableCell align="center">
            <Button variant="contained">View</Button>
            <Button variant="contained">Sell</Button>
          </TableCell>
        );
      }
      return (
        <TableCell align="center">
          <Button variant="contained">Buy</Button>
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
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">RGB</TableCell>
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
                  <TableCell align="center">{ color.metadata.name }</TableCell>
                  <TableCell align="center">
                    <CircleIcon sx={{ color: color.rgb }} />
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
