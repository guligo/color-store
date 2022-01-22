import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DappHelper from '../../helpers/DappHelper';
import ApiHelper from '../../helpers/ApiHelper';

export default function AccountDialog(props) {

  const [user, setUser] = React.useState(null);

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (DappHelper.isMetaMaskInstalled()) {
      console.log('MetaMask is installed');
      const account = await DappHelper.getFirstActiveMetaMaskAccount();
      console.log('First active MetaMask account:', account);

      if (account) {
        const user = await ApiHelper.getUser(account);
        setUser(user);
      }
    }
  };

  const setAlias = (event) => {
    user.alias = event.target.value;
  };

  const handleSave = async () => {
    try {
      setError(null);
      await ApiHelper.updateUser(user);
      props.onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = async () => {
    props.onClose();
    setError(null);
    fetchData();
  };

  return (
    <Dialog
      open={ props.open }
      onClose={ handleClose }
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <TextField
          label={ user?.id }
          defaultValue={ user?.alias }
          onChange={ setAlias }
          inputProps={{ maxLength: 15 }}
          error={ error != null }
          helperText={ error }
          fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleSave }>Save</Button>
        <Button onClick={ handleClose }>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
