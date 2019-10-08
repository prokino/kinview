//https://aspenmesh.io/2019/03/using-d3-in-react-a-pattern-for-using-data-visualization-at-scale/
import React from 'react';
import './App.css';
//import MuiTreeView from 'material-ui-treeview';
import MuiTreeView from './components/MuiTreeView';
import tree from './data/classification.json';
import numberingjson from './data/numbering.json';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import * as d3 from "d3";
import KinWeblogo from './components/KinWeblogo'
import DendrogramMenu from './components/DendrogramMenu'
import SelectionBox from './components/SelectionBox'
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// const rowWidth = 30, rowHeight = 120;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  leftBox:
  {
    position: 'relative',
    // zIndex:'top'
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
  
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: "none",//theme.shadows[5],
    padding: theme.spacing(3, 10, 1),
    minWidth: 400,
    // maxHeight: 400, 
    overflow: 'auto'
  },
  hidden: 
  { 
    display:"none"
  },
  structure:
  {
    marginLeft: 188,
    width: 4863
  }
}));
// console.log(tree);
// const imgLogoStyle = {
//   width: '100px'
// };
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
  const [rdbvalue, setRdbValue] = React.useState('rdbResidue');
  // const [firstLabel, setFirstLabel] = React.useState('');
  // const [secondLabel, setSecondLabel] = React.useState('');
  const [selectedNode, setSelectedNode] = React.useState('');
  const [selectedNodes, setSelectedNodes] = React.useState([]);
  const [switchchecked, setSwitchChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  function handleChange(event) {
    setRdbValue(event.target.value);
  }
  // function nodeSelected(node)
  // {
    
  //   // if (rdbvalue === 'rdbfirst')
  //   //   setFirstLabel(node.value);
  //   // else if (rdbvalue === 'rdbsecond')
  //   //   setSecondLabel(node.value);
    
  // }
  function getCandidateNumbers(node)
  {
    let numbering = {numberingjson}
    //todo: members[0] should be a dropdown box
    if (!node || !node.members || node.members.length == 0 || !(node.members[0] in numbering.numberingjson))
        return null;
    
    let candidates = []
    node.members.forEach(function(n){
      if (numbering.numberingjson.hasOwnProperty(n))
        candidates.push({"name":n,"value":numbering.numberingjson[n]});
    });
    
    return candidates;
    //return numbering.numberingjson[node.members[0]];
  }
  function nodeClicked(node)
  {
    
    // const path = node.path;//leaves have node path

  }
  function handleChipDelete(nodeToDelete) {
    var filtered = selectedNodes.filter(function(value, index, arr){
      return value.id != nodeToDelete;
  });
    setSelectedNodes(filtered);
  }
  const handleSwitchChange = () => {
    setSwitchChecked(prev => !prev);
    if (switchchecked)
    {
      
    }
  };

  function labelClicked(node)
  {
    //alert('label clicked');
    setSelectedNode(node);
    if (!selectedNodes.includes(node))
    {
      setSelectedNodes(selectedNodes => [...selectedNodes, node]);
    }
    // setSelectedNodes([
    //   ...selectedNodes,
    //   selectedNodes
    // ]);
  }
  
//   function renderWeblogos()
// {
//   if (selectedNodes.length == 0)
//     return "N/A";
//   return selectedNodes.map((item,i) => { return (
//     <KinWeblogo src={'weblogos/' + item.path} label={item.value} numbers={getCandidateNumbers(item)}/>
//   ) });
// }
  // function getImage(lbl)
  // {
  //   console.log(lbl)
  //   let src = '';
  //   if (lbl !== '')
  //     src = 'weblogos/PK_' + lbl + '.png';
    
  //   return src;
  // }
  
  // function drawd()
  // {
  //   var img = document.getElementById("firstImage");
  //   if (img!==null && img.src!=='')
  //   {  
     
  //     var cnvs = document.getElementById("firstCanvas");
  //    console.log(cnvs);
  //     cnvs.style.position = "absolute";
  //     cnvs.style.left = img.offsetLeft + "px";
  //     cnvs.style.top = img.offsetTop + "px";
      
  //     var ctx = cnvs.getContext("2d");
  //     ctx.beginPath();
  //     ctx.arc(250, 210, 200, 0, 2 * Math.PI, false);
  //     ctx.lineWidth = 3;
  //     ctx.strokeStyle = '#00ff00';
  //     ctx.stroke();
  //   }
  // }
  

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
        <FormControlLabel
        control={<Switch checked={switchchecked} onChange={handleSwitchChange} />}
        label="Show Hierarchy"/>
          <Fade in={switchchecked}>
              <div>
              <Grid  item>
                <SelectionBox items={selectedNodes} onDelete={handleChipDelete} />
              </Grid>
              <Grid  item>
              <DendrogramMenu width={720} height={400} onLabelClick={labelClicked} />
              </Grid>
              </div>
          </Fade>
        </Grid>


        <div>
        </div>

        <Grid id="sequences" item xs={10} >
          <div className={1===1 ? classes.mainBoxVisible:classes.mainBoxInvisible}>

        <img src={'img/KinView_Structure.png'} className={selectedNode ? classes.structure:classes.hidden} />
          <Paper className={selectedNode ? classes.paper:classes.hidden} elevation="0">
          {
            selectedNodes.map(function(item, idx){
            return (<KinWeblogo src={'weblogos/' + item.path} label={item.value} numbers={getCandidateNumbers(item)}/>)
          })}
       
          
            {/* {renderWeblogos()} */}
            {/* <KinWeblogo className={selectedNode ? "":classes.hidden} src={'weblogos/' + selectedNode.path} label={selectedNode.value} numbers={getCandidateNumbers(selectedNode)}/> */}
          </Paper>
          <div id="sstruct"></div>
          {/* <Paper className={classes.paper}>
            <KinWeblogo src={getImage(secondLabel)} label={secondLabel} numbers={[22,33,33,55,null,66,77,12]}/>
          </Paper> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
