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
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from "d3";
import { red } from '@material-ui/core/colors';
import KinWeblogo from './KinWeblogo'
const rowWidth = 30, rowHeight = 120;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  leftBox:
  {
    position: 'fixed'
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
  text:
  {
    color:red
  }
}));
// console.log(tree);
const imgLogoStyle = {
  width: '100px'
};
const imgUgaLogoStyle= {
  float:'right',
  width: '120px',
  marginTop: '-40px'
};

// const treeStyles = {
//   control: styles => ({ ...styles, color: 'red' }),
//   text: (styles, { text, childPanel }) => {
//     //const color = chroma(data.color);
//     return {
//       ...styles,
//       backgroundColor: 'blue',
//       color: 'green',
//     };
//   },
// };


function App() {
  const [rdbvalue, setRdbValue] = React.useState('rdbfirst');
  const [firstLabel, setFirstLabel] = React.useState('');
  const [secondLabel, setSecondLabel] = React.useState('');
  function handleChange(event) {
    setRdbValue(event.target.value);
  }
  function nodeSelected(lbl,weblogoPath)
  {
    if (rdbvalue === 'rdbfirst')
      setFirstLabel(lbl);
    else if (rdbvalue === 'rdbsecond')
      setSecondLabel(lbl);
  }
  function leafClicked(node)
  {
    const path = node.path;//leaves have node path
    console.log(path);
    nodeSelected(node.value, node.path);
  }
  function nodeClicked(node)
  {
    // let path =[] //non-leaves don't have path, so we should build one
    // if (node.parent!=null)
    //   path.push(node.parent.value);
    // path.push(node.value);
    
    nodeSelected(node.value, node.path);
    //node => alert(`${node} clicked`)

  }
  function getImage(lbl)
  {
    console.log(lbl)
    let src = '';
    if (lbl !== '')
      src = 'weblogos/PK_' + lbl + '.png';
    
    return src;
    
    //return 'weblogo/family/ePKf_TKL_TKL-Unique.png';
  }
  
  function drawd()
  {
    var img = document.getElementById("firstImage");
    if (img!==null && img.src!=='')
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
  function draw_sstructure() {
    var imgStyle = {
      marginLeft: 15,
      width: 4863
    };
    return <img src={'img/KinView_Structure.png'} style={imgStyle} />;
}
 
function annotations()
{
  let pdata = [];
        for (let i=1; i<=241; i+=1) {
          pdata.push({'pos':i,
              'x':rowWidth*(i-1),
              'y':120});
        }
        const locale = "firstImage"
        const vis = d3.selectAll("#sequences #"+locale);
        const letterbox = vis.selectAll("png")
        .data(pdata)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate("+(d.x+5)+","+d.y+")"; })
        .attr("id", function (d) { return "p"+d.pos; });
      console.log(vis);
      letterbox.append("g")
        .attr("id", "data-seq")
        .attr("transform", "translate(3,-10)");
      letterbox.append("g")
        .attr("transform", "translate(8,-10)")
        .attr("id", "data-num");
      letterbox.append("g")
        .attr("id", "data-ffeats");
  
}
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">KinView</Typography>
            {/* <img id="logo" src='img/kinview-logo.png' style={imgLogoStyle} /> */}
            <img id="ugalogo" src='img/uga-logo.png' style={imgUgaLogoStyle} />
          </Paper>
        </Grid>
        <Grid item xs={2} className={classes.leftBox}>
          <Paper className={classes.paper}>
          <Box>
          <FormControl component="fieldset">
      {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
          <RadioGroup aria-label="position" name="position" value={rdbvalue} onChange={handleChange} row>
              <FormControlLabel
                value="rdbfirst"
                control={<Radio color="primary" />}
                label="Top"
                labelPlacement="end"
              />
              
              <FormControlLabel
                value="rdbsecond"
                control={<Radio color="primary" />}
                label="Bottom"
                labelPlacement="end"
              />
          </RadioGroup>
          </FormControl>
          <MuiTreeView tree={tree} onParentClick={nodeClicked} onLeafClick={leafClicked} />
          </Box>  
          </Paper>
        </Grid>
        <Grid id="sequences" item xs={10} >
          <div className={firstLabel != ''? classes.mainBoxVisible:classes.mainBoxInvisible}>
        {draw_sstructure()}
          <Paper className={classes.paper}>
            <KinWeblogo src={getImage(firstLabel)} label={firstLabel}/>
          </Paper>
          <div id="sstruct"></div>
          <Paper className={classes.paper}>
            <Typography variant="h6" id="modal-title">{secondLabel}</Typography>
            <img id='secondImage' src={getImage(secondLabel)} />
          </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
