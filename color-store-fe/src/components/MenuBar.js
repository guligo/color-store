import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function MenuBar(props) {

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Welcome to the Color Store user { props.account }!
        </Typography>
      </Toolbar>
    </AppBar>
  );

}
