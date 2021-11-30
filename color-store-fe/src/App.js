import './App.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuBar from "./components/MenuBar"
import AssetList from "./components/AssetList"
import DappHelper from './helpers/DappHelper';

export default function App(props) {

  const [account, setAccount] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const account = await DappHelper.getFirstActiveMetaMaskAccount();
      setAccount(account);
    }
    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <MenuBar account={ account } />
      <AssetList account={ account } />
    </Paper>
  );
}
