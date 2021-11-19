import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function AssetDialog(props) {

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          <img src={props.data?.metadata.image} style={{ width: 320 }} />
          <p>{props.data?.metadata.description}</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );

}
