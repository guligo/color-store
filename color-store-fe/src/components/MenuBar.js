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
import DappHelper from '../helpers/DappHelper'

export default function MenuBar(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [accountDialogDisplayed, setAccountDialogDisplayed] = React.useState(false);

  const [aboutDialogDisplayed, setAboutDialogDisplayed] = React.useState(false);

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

  const handleOpenAboutDialog = () => {
    setAboutDialogDisplayed(true);
    handleClose();
  };

  const handleCloseAboutDialog = () => {
    setAboutDialogDisplayed(false);
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
          <MenuItem onClick={ handleOpenAboutDialog }>About Color Store</MenuItem>
        </Menu>
      </Toolbar>
      <AccountDialog open={ accountDialogDisplayed } onClose={ handleCloseAccountDialog } />
      <AboutDialog open={ aboutDialogDisplayed } onClose={ handleCloseAboutDialog } />
    </AppBar>
  );
}
