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

  React.useEffect(() => {
    async function fetchData() {
      if (DappHelper.isMetaMaskInstalled()) {
        console.log('MetaMask is installed');
        const account = await DappHelper.getFirstActiveMetaMaskAccount();
        console.log('First active MetaMask account =', account);

        if (account) {
          const user = await ApiHelper.getUser(account);
          setUser(user);
        }
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    await ApiHelper.updateUser(user);
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
          inputProps={{ maxLength: 15 }}
          fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleSave }>Save</Button>
        <Button onClick={ props.onClose }>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
