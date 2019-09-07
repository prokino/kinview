import React from 'react';
import './App.css';
import MuiTreeView from 'material-ui-treeview';
import tree from './data/classification.json';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';
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
  

  const [rdbvalue, setRdbValue] = React.useState('rdbfirst');
  const [firstLabel, setFirstLabel] = React.useState('');
  const [secondLabel, setSecondLabel] = React.useState('');

  function handleChange(event) {
    setRdbValue(event.target.value);
  }
  function leafClicked(node)
  {
    const path = node.path;//.split("/");
    console.log(path);
    if (rdbvalue === 'rdbfirst')
      setFirstLabel(path);
    else if (rdbvalue === 'rdbsecond')
      setSecondLabel(path);
  }
  function nodeClicked(node)
  {
    let path =[]
    
    if (node.parent!=null)
      path.push(node.parent.value);
    path.push(node.value);
    console.log(path);
    //node => alert(`${node} clicked`)

  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>KinView</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
          <Box>
          <FormControl component="fieldset">
      {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
          <RadioGroup aria-label="position" name="position" value={rdbvalue} onChange={handleChange} row>
              <FormControlLabel
                value="rdbfirst"
                control={<Radio color="primary" />}
                label="First"
                labelPlacement="start"
              />
              
              <FormControlLabel
                value="rdbsecond"
                control={<Radio color="primary" />}
                label="Second"
                labelPlacement="start"
              />
          </RadioGroup>
          </FormControl>
          <MuiTreeView tree={tree} onParentClick={nodeClicked} onLeafClick={leafClicked} />
          </Box>  
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6" id="modal-title">{firstLabel}</Typography>
          <Paper className={classes.paper}>weblogo first</Paper>
          <Typography variant="h6" id="modal-title">{secondLabel}</Typography>
          <Paper className={classes.paper}>weblogo second</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
