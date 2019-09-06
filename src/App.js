import React from 'react';
import './App.css';
import MuiTreeView from 'material-ui-treeview';
import tree from './data/classification.json';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
// console.log(tree);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid>
        <Paper className={classes.paper}>Kinview</Paper>
      </Grid>
      <Grid width={1/8}>
        <Paper className={classes.paper}>
          <Box>
            <MuiTreeView tree={tree} onLeafClick={node => alert(`${node} clicked`)} />
         </Box>
        </Paper>
      </Grid>
      <Grid width={7/8}>
        <Paper className={classes.paper}>ss</Paper>
      </Grid>
      {/* <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid> */}
    </Grid>
  </div>
  //   <React.Fragment>
  //   <Container>
  //       <Box width={1/6}>
  //         <MuiTreeView tree={tree} onLeafClick={node => alert(`${node} clicked`)} />
  //     </Box>
      
  //   </Container>
  // </React.Fragment>

  );
}

export default App;
