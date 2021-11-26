import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import QRCode from 'qrcode.react';
import ApiHelper from '../../helpers/ApiHelper';

export default function AboutDialog(props) {

  const [colorCoinContractAddress, setColorCoinContractAddress] = React.useState('0x0');

  const [colorStoreContractAddress, setColorStoreContractAddress] = React.useState('0x0');

  React.useEffect(async () => {
    const config = await ApiHelper.getConfig();
    setColorCoinContractAddress(config.colorCoinContractAddress);
    setColorStoreContractAddress(config.colorStoreContractAddress);
  }, []);

  return (
    <Dialog
      open={ props.open }
      onClose={ props.onClose }
      fullWidth
      maxWidth="sm"
    >
      <DialogContent sx={{ textAlign: 'center' }} >
        <TextField
          disabled
          id="outlined-basic"
          label="Color Coin Contract Address"
          defaultValue={ colorCoinContractAddress }
          fullWidth />
        <TextField
          disabled
          id="outlined-basic"
          label="Color Store Contract Address"
          defaultValue={ colorStoreContractAddress }
          sx={{ marginTop: '15px' }}
          fullWidth />
        <QRCode value={ colorStoreContractAddress } style={{ marginTop: '10px' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={ props.onClose }>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
