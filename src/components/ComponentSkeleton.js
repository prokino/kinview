//This file is a template for cut and paste
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    mainBoxVisible:
    {
      marginLeft: 200,
      display: 'inline-block'
    },
    mainBoxInvisible:
    {
      marginLeft: 215,
      display: 'none'
    },
    hidden: 
    { 
      display:"none"
    }
  }));

function SelectionBox(props) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
              <Typography variant="h4">Hello</Typography>
      </div>
    );
}
export default SelectionBox;