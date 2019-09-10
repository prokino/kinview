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
}));
// console.log(tree);
const imgLogoStyle = {
  width: '100px'
};

function App() {
  const [rdbvalue, setRdbValue] = React.useState('rdbfirst');
  const [firstLabel, setFirstLabel] = React.useState('');
  const [secondLabel, setSecondLabel] = React.useState('');
  const [structureDrew,setStructureDrew] = React.useState(false)
  function handleChange(event) {
    setRdbValue(event.target.value);
  }
  function setPath(path)
  {
    rdbvalue === 'rdbfirst' ? setFirstLabel(path) : setSecondLabel(path);
    // if (rdbvalue === 'rdbfirst')
    //   setFirstLabel(path);
    // else if (rdbvalue === 'rdbsecond')
    //   setSecondLabel(path);
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
  function draw_ptms(topbot) {
    //define variables
        let data = topbot.ptmData, nRows = data.getNumberOfRows(),
        nCols = data.getNumberOfColumns(),
        positions = data.getDistinctValues(0),
        i, current, minpos = 0, dmax = 0,
        sums = {},counts = {}, height = 10,
        posn = [], pos = 0, total = 0, rcounts = {},
        vis, letter, label, tlabel, ndata = {}, text, p2 = [];
        //sort data & log to console
        //data.sort([{column:0},{column:1},{column:2}]);
        data.addColumn('number'); //total
        data.addColumn('number'); //letter height - 4
        data.addColumn('number'); //yvalue of letter bottom - 5
        //redistribute to new container
        //assumes y-scroll
        let row = 1, dis = {},mean=0,std=0,total=0;
      //reset to profile numbering
      //find total counts for each position
      for (i=0; i<nRows; i+=1) {
        if (!(data.getValue(i,0) in rcounts)) {
          rcounts[data.getValue(i,0)] = 0;
        }
        if (!(data.getValue(i,0) in counts)) {
          counts[data.getValue(i,0)] = {};
        }
        if (!(data.getValue(i,1) in counts[data.getValue(i,0)])) {
          counts[data.getValue(i,0)][data.getValue(i,1)] = 0
        }
        if (!(data.getValue(i,0) in dis)) {
          dis[data.getValue(i,0)] = {};
        }
        if (!(data.getValue(i,1) in dis[data.getValue(i,0)])) {
          dis[data.getValue(i,0)][data.getValue(i,1)] = data.getValue(i,3)
        //post.attr("transform", "translate("+(10+(p2[i]-1)*rowWidth)+","+b+")");
        }
        counts[data.getValue(i,0)][data.getValue(i,1)] += data.getValue(i,2)
              rcounts[data.getValue(i,0)] += data.getValue(i,2)
      }
      let cmt = '', mmax=0, mmin=100;
      data.setValue(0,5,0);
      //adjust for multiple lines
      for (let pos in counts) {
              if (rcounts[pos] > mmax) {
                  mmax = rcounts[pos];
              }
              if (rcounts[pos] < mmin) {
                  mmin = rcounts[pos]
              }
        if (!(pos in ndata)) {
          ndata[pos] = []
        }
        for (let res in counts[pos]) {
          ndata[pos].push([res,counts[pos][res],dis[pos][res]]);
        }
        ndata[pos].sort(function(f,s) { return s[1]-f[1]; });
      }
      for (let pos in ndata) {
        let k = ndata[pos].length;
        for (let res in ndata[pos]) {
          ndata[pos][res].push(k);
          k -= 1;
        }
      }
  
      let nd1 = {}, nd2 = {};
      for (let pos in ndata) {
        if (!(pos in nd2)) {
          nd2[pos] = [];
        }
        if (!(pos in nd1)) {
          nd1[pos] = [];
        }
        for (let res in ndata[pos]) {
          if (!(ndata[pos][res] == null)) {
            nd2[pos].push(ndata[pos][res][0]);
            nd1[pos].push({ 'res':ndata[pos][res][0], 
              'cnt':ndata[pos][res][1], 
              'type':ndata[pos][res][2], 
              'y':15*ndata[pos][res][3] });
          }
        }
      }
      
        //find std of totals
              //visualization
        //for each position, select current display and add
        //ptm overlay
        let vis = d3.selectAll("#sequences #annotations #"+topbot.locale);
        for (i=0; i<positions.length; i+=1) {
          let temp = " #p"+positions[i], tempv = " #f"+positions[i];
          vis.append("g")
            .attr("id","f"+positions[i])
            //.attr("transform", function(d) {
              //return "translate("+(p2[i]*rowWidth)+","+300+")";
            //})
            .style("opacity", 0);
          let scale = 0, tscale = Math.min(100,mmax)
                  let scval = 0.6+(2-0.6)*(Math.min(tscale,rcounts[positions[i]]) - mmin)/(tscale-mmin)
          scale = scval
          let circ = d3.selectAll("#sequences #"+topbot.locale+temp)
            .select("#data-ffeats")
            .append("circle")
            //.attr("cx", function (d) { return this.parentNode.parentNode.getBBox().x + this.parentNode.parentNode.getBBox().width/2; })
            .attr("cx", function (d) { return rowWidth/2 +2} )
            .attr("cy", "13")
            .attr("r", function (d) {  return scale*7; }) //max radius of 20
            //.attr("transform", "translate(0,45)")
            .attr("fill", "green");
          //draw letters
          let svg = d3.selectAll("#sequences #annotations #"+topbot.locale+tempv);
          svg.selectAll("svg").data(nd1[positions[i]])
            .enter()
            .append("text")
            .attr("transform", function(d) {
              return "translate(0,"+(-d.y)+")";
            })
            .text(function (d) { return d.res; })
            .attr("font-family", "monospace")
            .attr("font-size", "16px")
            .attr("cursor", "default")
            .attr("fill", function (d) { return colorSchemes["classic"][d.res]; });
  
          svg.selectAll("svg").data(nd1[positions[i]])
            .enter()
            .append("text")
            .attr("transform", function(d) {
              return "translate(20,"+(-d.y)+")";
            })
            .text(function (d) { return " - "+d.cnt+" - "+d.type })
            .attr("font-family", "monospace")
            .attr("font-size", "12px")
            .attr("cursor", "default");
  
          //svg.append("rect")
            //.attr("id","r"+positions[i])
            //.attr("rx", "10")
            //.attr("ry", "10")
            //.attr("width", function (d) {  return this.parentNode.getBBox().width+10; })
            //.attr("height", function (d) { return this.parentNode.getBBox().height; })
            //.attr("x", function (d) { return this.parentNode.getBBox().x-5; })
            //.attr("y", function (d) { return this.parentNode.getBBox().y; })
            //.attr("fill-opacity", 0)
            //.attr("stroke", "green")
            //.attr("stroke-width",3);
  
          let test = d3.selectAll("#sequences #"+topbot.locale+temp+" #data-ffeats")
            .on("mouseover", function() { 
              let vartem = "f"+this.parentNode.id.slice(1), seq_div = $("#sequences"), offset = seq_div.scrollLeft(), seq_width = seq_div.width(), vtemp = d3.selectAll("#sequences #annotations #"+topbot.locale+" #"+vartem), vheight = vtemp.node().getBBox().height, vwidth = vtemp.node().getBBox().width;
              vtemp.attr("transform", "translate(" + Math.max(offset+10,(offset+(seq_width-vwidth)/2)) + ","+(vheight+20)+")")
                .transition().duration(100).style("opacity",1); })
            .on("mouseout", function() { 
              let vartem = "f"+this.parentNode.id.slice(1);
              d3.selectAll("#sequences #annotations #"+topbot.locale+" #"+vartem).transition().duration(100).style("opacity",0); })
            .on("click", function (d) { 
              let temp_aas = [];
              for (var j=0; j<nd1[d.pos].length; j+=1) {
                if (nd1[d.pos][j].cnt > 0) {
                temp_aas.push(nd1[d.pos][j].res);
                }
              }
              position_clicked(topbot, d.pos, temp_aas, "ptms"); });
              //return "translate("+(p2[i]*rowWidth)+","+300+")";
          //var a = svg.node().getBBox();
          //var b = a.height+20;
          //svg.attr("transform", "translate("+(10+(positions[i]-1)*rowWidth)+","+b+")");
        }
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
    //setStructureDrew()
    if (!structureDrew)
    {
    var betas_start = [1,14,25,60,69,115,125,133,142], betas_end = [9,20,33,65,75,116,127,135,143], helix_start = [39,82,93,173,198,212,233], helix_end = [51,89,112,188,207,221,236], betas = [1,2,3,4,5,6,7,8,9], alphas = ['C','D','E','F','G','H','I'];
        //generate svg window	
        var sstruct = d3.select("#sstruct")
          .append("svg")
          .attr("width",242*rowWidth)
          .attr("height",70);
        //loops
        sstruct.append("rect")
          .attr("width", rowWidth*242)
          .attr("height", "2")
          .attr("x", "0")
          .attr("y", "20")
          //.attr("x", function (d) { return this.parentNode.getBBox().x; })
          //.attr("y", function (d) { return this.parentNode.getBBox().y; })
          .attr("stroke", "black")
          .attr("stroke-width",2);
  
        //Separate each beta strand/helix and apply mouseover labels
        for (let i=0; i<betas_start.length; i+=1) {
          sstruct.append("rect")
            .attr("width", function (d) { return (betas_end[i]-betas_start[i])*rowWidth} )
            .attr("height", "4")
            .attr("x", function (d) { return (betas_start[i]-1)*rowWidth; })
            .attr("y", "19")
            .attr("stroke", "blue")
            .attr("fill", "blue")
            .attr("stroke-width","10");
          sstruct.append("text")
            .attr("font-family", "monospace")
            .attr("font-size", "12pt")
            .attr("stroke", "blue")
            .attr("fill", "blue")
            .attr("transform", function (d) { return "translate("+(betas_start[i]-1+0.5*(betas_end[i]-betas_start[i]))*rowWidth+",45)"})
            .text('\u03B2'+betas[i]);
        }
  
        for (let i=0; i<betas_end.length; i+=1) {
          sstruct.append("path")
            .attr("d", function (d) { var temp = (betas_end[i]-1)*rowWidth;
                    return "M "+(temp+10)+" 21 L "+temp+" 32 L "+temp+" 10 L "+(temp+10)+" 21"})
            //.attr("d", "M 20 61 L 0 75 L 0 48 L 20 61")
            .attr("stroke", "blue")
            .attr("fill", "blue")
            .attr("stroke-width",3);
        }
  
        for (let i=0; i<helix_start.length; i+=1) {
          sstruct.append("rect")
            .attr("width", function (d) { return (helix_end[i]-helix_start[i]+1)*rowWidth} )
            .attr("height", "20")
            .attr("x", function (d) { return helix_start[i]*rowWidth; })
            .attr("y", "12")
            //.attr("height", function (d) { return this.parentNode.getBBox().height+18; })
            //.attr("x", function (d) { return this.parentNode.getBBox().x; })
            //.attr("y", function (d) { return this.parentNode.getBBox().y+50; })
            .attr("stroke", "green")
            .attr("fill", "green")
            .attr("stroke-width",3);
          sstruct.append("text")
            .attr("font-family", "monospace")
            .attr("font-size", "12pt")
            .attr("stroke", "green")
            .attr("fill", "green")
            .attr("transform", function (d) { return "translate("+(helix_start[i]+0.5*(helix_end[i]-helix_start[i]))*rowWidth+",45)"})
            .text('\u03B1'+alphas[i]);
  
        }
        setStructureDrew(true);
      }
        
  };
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
            <img id="logo" src='img/kinview-logo.png' style={imgLogoStyle} />
          </Paper>
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
        <Grid id="sequences" item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant="h6" id="modal-title">{firstLabel}</Typography>
            {/* <canvas id='firstCanvas'></canvas> */}
            <img id='firstImage' src={getImage(firstLabel)} />
          </Paper>
          {draw_sstructure()}
          {annotations()}
          <div id="sstruct"></div>
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
