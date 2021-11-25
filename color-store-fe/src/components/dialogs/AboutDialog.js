import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import QRCode from 'qrcode.react';

export default function AboutDialog(props) {

  const [colorCoinContractAddress, setColorCoinContractAddress] = React.useState(null);

  const [colorStoreContractAddress, setColorStoreContractAddress] = React.useState(null);

  React.useEffect(() => {
    fetch('http://192.168.178.20:8080/config')
      .then(res => {
        return res.json();
      })
      .then(config => {
        setColorCoinContractAddress(config.colorCoinContractAddress);
        setColorStoreContractAddress(config.colorStoreContractAddress);
      })
      .catch(console.log);
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
