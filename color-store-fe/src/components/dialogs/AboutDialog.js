import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import QRCode from 'qrcode.react';

export default function AboutDialog(props) {

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
          label={ props.label }
          defaultValue={ props.contractAddress }
          fullWidth />
        <QRCode value={ props.contractAddress } style={{ marginTop: '10px' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={ props.onClose }>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
