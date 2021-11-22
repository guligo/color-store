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

  const renderActionButtons = (asset) => {
    if (asset.owner.id === props.account) {
      return (
        <TableCell align="center">
          <Button variant="contained" onClick={_ => props.onViewAsset(asset)}>View</Button>
          <Button variant="contained" onClick={_ => props.onSellAsset(asset)} sx={{ marginLeft: '5px' }}>Sell</Button>
        </TableCell>
      );
    }

    return (
      <TableCell align="center">
        <Button variant="contained" onClick={_ => props.onBuyAsset(asset)}>Buy</Button>
      </TableCell>
    );
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
            <TableCell align="center">
              { asset.owner.alias ? asset.owner.alias : asset.owner.id }
            </TableCell>
            { renderActionButtons(asset) }
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
