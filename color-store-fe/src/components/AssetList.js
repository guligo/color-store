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

export default function AssetList(props) {

  const renderOwner = (owner) => {
    return owner.alias ? owner.alias : owner.id.substring(0, 5) + '...' + owner.id.substring(owner.id.length - 3, owner.id.length)
  };

  const renderActionButtons = (asset) => {
    if (asset.owner.id === props.account) {
      return (
        <TableCell align="center">
          <Button variant="contained" onClick={_ => props.onViewAsset(asset)} sx={{ marginLeft: '5px', marginTop: '5px'}}>View</Button>
          <Button variant="contained" onClick={_ => props.onSellAsset(asset)} sx={{ marginLeft: '5px', marginTop: '5px'}}>Sell</Button>
        </TableCell>
      );
    } else if (asset.owner.alias === 'Color Store') {
      return (
        <TableCell align="center">
          <Button variant="contained" onClick={_ => props.onBuyAsset(asset)}>Buy</Button>
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
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: '33%' }}>Color</TableCell>
            <TableCell align="center" sx={{ width: '33%' }}>Owner</TableCell>
            <TableCell align="center" sx={{ width: '33%' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { props.assets.map((asset) => (
          <TableRow
            hover
            key={asset.tokenId}
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
    </TableContainer>
  );
}
