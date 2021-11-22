import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AccountDialog(props) {

  const [user, setUser] = React.useState(null);

  React.useEffect(async () => {
    var publicKey = await window.ethereum.request({method: 'eth_accounts'});
    fetch('http://localhost:8080/users/' + publicKey)
      .then(res => {
        return res.json();
      })
      .then(user => {
        setUser(user);
      })
      .catch(console.log);
  }, []);

  const handleSave = () => {
    fetch('http://localhost:8080/users/' + user.id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .catch(console.log);

    props.onClose();
  };

  const setAlias = (event) => {
    user.alias = event.target.value;
  };

  return (
    <Dialog
      open={ props.open }
      onClose={ props.onClose }
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <TextField
          label={ user?.id }
          defaultValue={ user?.alias }
          onChange={ setAlias }
          fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleSave }>Save</Button>
        <Button onClick={ props.onClose }>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
