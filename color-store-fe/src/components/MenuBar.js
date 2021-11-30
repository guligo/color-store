import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountDialog from './dialogs/AccountDialog';
import AboutDialog from './dialogs/AboutDialog';
import DappHelper from '../helpers/DappHelper';
import ApiHelper from '../helpers/ApiHelper';

export default function MenuBar(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [accountDialogDisplayed, setAccountDialogDisplayed] = React.useState(false);

  const [colorStoreContractAddress, setColorStoreContractAddress] = React.useState('0x0');

  const [colorCoinContractAddress, setColorCoinContractAddress] = React.useState('0x0');

  const [colorStoreContractDialogDisplayed, setColorStoreContractDialogDisplayed] = React.useState(false);

  const [colorCoinContractDialogDisplayed, setColorCoinContractDialogDisplayed] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const config = await ApiHelper.getConfig();
      setColorCoinContractAddress(config.colorCoinContractAddress);
      setColorStoreContractAddress(config.colorStoreContractAddress);
    }
    fetchData();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConnectMetaMask = async () => {
    await DappHelper.connectMetaMask();
    handleClose();
  };

  const handleOpenAccountDialog = () => {
    setAccountDialogDisplayed(true);
    handleClose();
  };

  const handleCloseAccountDialog = () => {
    setAccountDialogDisplayed(false);
  };

  const handleOpenColorStoreContractDialog = () => {
    setColorStoreContractDialogDisplayed(true);
    handleClose();
  };

  const handleCloseColorStoreContractDialog = () => {
    setColorStoreContractDialogDisplayed(false);
  };

  const handleOpenColorCoinContractDialog = () => {
    setColorCoinContractDialogDisplayed(true);
    handleClose();
  };

  const handleCloseColorCoinContractDialog = () => {
    setColorCoinContractDialogDisplayed(false);
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
          Welcome to the Color Store!
        </Typography>
        <IconButton
          size="large"
          onClick={ handleMenu }
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={ anchorEl }
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={ Boolean(anchorEl) }
          onClose={ handleClose }
        >
          <MenuItem onClick={ handleConnectMetaMask }>Connect MetaMask</MenuItem>
          <MenuItem onClick={ handleOpenAccountDialog }>My Account</MenuItem>
          <MenuItem onClick={ handleOpenColorStoreContractDialog }>About Color Store Contract</MenuItem>
          <MenuItem onClick={ handleOpenColorCoinContractDialog }>About Color Coin Contract</MenuItem>
        </Menu>
      </Toolbar>
      <AccountDialog open={ accountDialogDisplayed } onClose={ handleCloseAccountDialog } />
      <AboutDialog
        label="Color Store Contract Address"
        contractAddress={ colorStoreContractAddress }
        open={ colorStoreContractDialogDisplayed }
        onClose={ handleCloseColorStoreContractDialog } />
      <AboutDialog
        label="Color Coin Contract Address"
        contractAddress={ colorCoinContractAddress }
        open={ colorCoinContractDialogDisplayed }
        onClose={ handleCloseColorCoinContractDialog } />
    </AppBar>
  );
}
