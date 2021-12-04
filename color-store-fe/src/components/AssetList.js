import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import AssetDialog from "./dialogs/AssetDialog"
import ApiHelper from '../helpers/ApiHelper';
import DappHelper from '../helpers/DappHelper';

const ASSET_LIST_REFRESH_INTERVAL = 20 * 1000; // ms

export default function AssetList(props) {

  const [assets, setAssets] = React.useState([]);

  const [assetDialogData, setAssetDialogData] = React.useState(null);

  const [assetDialogDisplayed, setAssetDialogDisplayed] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const colors = await ApiHelper.getColors();
      setAssets(colors);
      console.log('Color list updated');

      setTimeout(async function() {
        await fetchData();
      }, ASSET_LIST_REFRESH_INTERVAL);
    }

    fetchData();
  }, []);

  const handleViewAsset = (asset) => {
    setAssetDialogData(asset);
    setAssetDialogDisplayed(true);
  };

  const handleBuyAsset = async (asset) => {
    console.log(`Buying token with ID ${asset.tokenId}`);

    const colorStoreContractInstance = await DappHelper.getColorStoreContractInstance();

    await colorStoreContractInstance.methods.buyToken(asset.tokenId).send({
      from: props.account,
      value: DappHelper.toWei("100000000000")
    });
  };

  const handleSellAsset = async (asset) => {
    console.log(`Selling token with ID ${asset.tokenId}`);

    const colorCoinContractInstance = await DappHelper.getColorCoinContractInstance();
    const colorStoreContractInstance = await DappHelper.getColorStoreContractInstance();

    let operationApproved = await colorCoinContractInstance.methods.isApprovedForAll(props.account, colorStoreContractInstance.options.address).call();
    if (!operationApproved) {
      await colorCoinContractInstance.methods.setApprovalForAll(colorStoreContractInstance.options.address, true).send({from: props.account});
    }
    await colorStoreContractInstance.methods.sellToken(asset.tokenId).send({from: props.account});
  };

  const handleCloseAssetDialog = async () => {
    setAssetDialogDisplayed(false);
  }

  const renderOwner = (owner) => {
    return owner.alias ? owner.alias : owner.id.substring(0, 5) + '...' + owner.id.substring(owner.id.length - 3, owner.id.length)
  };

  const renderActionButtons = (asset) => {
    if (asset.owner.id === props.account) {
      return (
        <TableCell align="center">
          <Button variant="contained" onClick={_ => handleViewAsset(asset)} sx={{ marginLeft: '5px', marginTop: '5px'}}>View</Button>
          <Button variant="contained" onClick={_ => handleSellAsset(asset)} sx={{ marginLeft: '5px', marginTop: '5px'}}>Sell</Button>
        </TableCell>
      );
    } else if (asset.owner.alias === 'Color Store') {
      return (
        <TableCell align="center">
          <Button variant="contained" onClick={_ => handleBuyAsset(asset)}>Buy</Button>
        </TableCell>
      );
    } else {
      return (
        <TableCell>&nbsp;</TableCell>
      )
    }
  };

  return (
    <TableContainer sx={{ maxHeight: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: '33%', fontWeight: 'bold' }}>Color</TableCell>
            <TableCell align="center" sx={{ width: '33%', fontWeight: 'bold' }}>Owner</TableCell>
            <TableCell align="center" sx={{ width: '33%', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { assets.map((asset) => (
          <TableRow
            hover
            key={ asset.tokenId }
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center">
              <Tooltip title={ '#' + asset.tokenId.toString(16) }>
                <CircleIcon sx={{ color: '#' + asset.tokenId.toString(16) }} />
              </Tooltip>
            </TableCell>
            <TableCell align="center">{ renderOwner(asset.owner) }</TableCell>
            { renderActionButtons(asset) }
          </TableRow>
        ))}
        </TableBody>
      </Table>
      <AssetDialog open={ assetDialogDisplayed } data={ assetDialogData } onClose={ handleCloseAssetDialog } />
    </TableContainer>
  );
}
