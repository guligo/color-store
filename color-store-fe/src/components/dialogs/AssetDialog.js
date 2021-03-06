import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function AssetDialog(props) {

  return (
    <Dialog
      open={ props.open }
      onClose={ props.onClose }
    >
      <DialogContent sx={{ textAlign: 'center' }}>
        <img src={ props.data?.metadata.image } alt={ props.data?.metadata.name } style={{ width: '50%' }} />
        <DialogContentText sx={{ marginTop: '10px' }}>
          { props.data?.metadata.description }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={ props.onClose }>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
