import React from 'react';
import './App.css';
//import MuiTreeView from 'material-ui-treeview';
import MuiTreeView from './MuiTreeView';
import tree from './data/classification.json';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography, Drawer } from '@material-ui/core';
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
  function setPath(path)
  {
    if (rdbvalue === 'rdbfirst')
      setFirstLabel(path);
    else if (rdbvalue === 'rdbsecond')
      setSecondLabel(path);
  }
  function leafClicked(node)
  {
    const path = node.path;//leaves have node path
    console.log(path);
    setPath(path);
  }
  function nodeClicked(node)
  {
    let path =[] //non-leaves don't have path, so we should build one
    if (node.parent!=null)
      path.push(node.parent.value);
    path.push(node.value);
    
    setPath(path);
    //node => alert(`${node} clicked`)

  }
  function getImage(lbl)
  {
    console.log(lbl)
    let src = '';
    if (lbl !== '')
      src = 'weblogo/family/ePKf_' + lbl + '.png';
    
    return src;
    
    //return 'weblogo/family/ePKf_TKL_TKL-Unique.png';
  }
  function drawd()
  {
    var img = document.getElementById("firstImage");
    if (img!=null && img.src!='')
    {  
     
      var cnvs = document.getElementById("firstCanvas");
     console.log(cnvs);
      cnvs.style.position = "absolute";
      cnvs.style.left = img.offsetLeft + "px";
      cnvs.style.top = img.offsetTop + "px";
      
      var ctx = cnvs.getContext("2d");
      ctx.beginPath();
      ctx.arc(250, 210, 200, 0, 2 * Math.PI, false);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00ff00';
      ctx.stroke();
    }
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
                labelPlacement="end"
              />
              
              <FormControlLabel
                value="rdbsecond"
                control={<Radio color="primary" />}
                label="Second"
                labelPlacement="end"
              />
          </RadioGroup>
          </FormControl>
          <MuiTreeView tree={tree} onParentClick={nodeClicked} onLeafClick={leafClicked} />
          </Box>  
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant="h6" id="modal-title">{firstLabel}</Typography>
            {/* <canvas id='firstCanvas'></canvas> */}
            <img id='firstImage' src={getImage(firstLabel)} />
          </Paper>
          
          <Paper className={classes.paper}>
            <Typography variant="h6" id="modal-title">{secondLabel}</Typography>
            <img id='secondImage' src={getImage(secondLabel)} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
