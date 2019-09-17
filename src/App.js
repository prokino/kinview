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
import * as d3 from "d3";
import { red } from '@material-ui/core/colors';

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
  // function draw_sstructure() {
  //   d3.selectAll("#sstruct").html('');
  //   var betas_start = [1,14,25,60,69,115,125,133,142], betas_end = [9,20,33,65,75,116,127,135,143], helix_start = [39,82,93,173,198,212,233], helix_end = [51,89,112,188,207,221,236], betas = [1,2,3,4,5,6,7,8,9], alphas = ['C','D','E','F','G','H','I'];
  //       //generate svg window	
  //       var sstruct = d3.select("#sstruct")
  //         .append("svg")
  //         .style("margin-left",70)
  //         .attr("width",242*rowWidth)
  //         .attr("height",70);
  //       //loops
  //       sstruct.append("rect")
  //         .attr("width", rowWidth*242)
  //         .attr("height", "2")
  //         .attr("x", "0")
  //         .attr("y", "20")
  //         //.attr("x", function (d) { return this.parentNode.getBBox().x; })
  //         //.attr("y", function (d) { return this.parentNode.getBBox().y; })
  //         .attr("stroke", "black")
  //         .attr("stroke-width",2);
  
  //       //Separate each beta strand/helix and apply mouseover labels
  //       for (let i=0; i<betas_start.length; i+=1) {
  //         sstruct.append("rect")
  //           .attr("width", function (d) { return (betas_end[i]-betas_start[i])*rowWidth} )
  //           .attr("height", "4")
  //           .attr("x", function (d) { return (betas_start[i]-1)*rowWidth; })
  //           .attr("y", "19")
  //           .attr("stroke", "blue")
  //           .attr("fill", "blue")
  //           .attr("stroke-width","10");
  //         sstruct.append("text")
  //           .attr("font-family", "monospace")
  //           .attr("font-size", "12pt")
  //           .attr("stroke", "blue")
  //           .attr("fill", "blue")
  //           .attr("transform", function (d) { return "translate("+(betas_start[i]-1+0.5*(betas_end[i]-betas_start[i]))*rowWidth+",45)"})
  //           .text('\u03B2'+betas[i]);
  //       }
  
  //       for (let i=0; i<betas_end.length; i+=1) {
  //         sstruct.append("path")
  //           .attr("d", function (d) { var temp = (betas_end[i]-1)*rowWidth;
  //                   return "M "+(temp+10)+" 21 L "+temp+" 32 L "+temp+" 10 L "+(temp+10)+" 21"})
  //           //.attr("d", "M 20 61 L 0 75 L 0 48 L 20 61")
  //           .attr("stroke", "blue")
  //           .attr("fill", "blue")
  //           .attr("stroke-width",3);
  //       }
  
  //       for (let i=0; i<helix_start.length; i+=1) {
  //         sstruct.append("rect")
  //           .attr("width", function (d) { return (helix_end[i]-helix_start[i]+1)*rowWidth} )
  //           .attr("height", "20")
  //           .attr("x", function (d) { return helix_start[i]*rowWidth; })
  //           .attr("y", "12")
  //           //.attr("height", function (d) { return this.parentNode.getBBox().height+18; })
  //           //.attr("x", function (d) { return this.parentNode.getBBox().x; })
  //           //.attr("y", function (d) { return this.parentNode.getBBox().y+50; })
  //           .attr("stroke", "green")
  //           .attr("fill", "green")
  //           .attr("stroke-width",3);
  //         sstruct.append("text")
  //           .attr("font-family", "monospace")
  //           .attr("font-size", "12pt")
  //           .attr("stroke", "green")
  //           .attr("fill", "green")
  //           .attr("transform", function (d) { return "translate("+(helix_start[i]+0.5*(helix_end[i]-helix_start[i]))*rowWidth+",45)"})
  //           .text('\u03B1'+alphas[i]);
  
  //       }
        
  // };
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
            <Typography variant="h6" id="modal-title">{firstLabel}</Typography>
            {/* <canvas id='firstCanvas'></canvas> */}
            <img id='firstImage' src={getImage(firstLabel)} />
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
