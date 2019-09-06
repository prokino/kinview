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
import FormLabel from '@material-ui/core/FormLabel';
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
  const [value, setValue] = React.useState('rdbfirst');

  function handleChange(event) {
    setValue(event.target.value);
  }
  function treeClicked(node)
  {
    let path =[]
    path.push(node.value);
    while (node!=null)
    {
      if (node.parent!=null)
        path.push(node.parent.value);
      node = node.parent;
    }
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
          <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
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
            <MuiTreeView tree={tree} onParentClick={treeClicked} onLeafClick={treeClicked} />
          </Box>  
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>weblogo</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
