//https://aspenmesh.io/2019/03/using-d3-in-react-a-pattern-for-using-data-visualization-at-scale/
import React, { useRef, useEffect, useState } from 'react';
import './App.css';
//import MuiTreeView from 'material-ui-treeview';

import darkKinase from './kinase/data/dark_list.json'
//import numberingjson from "./%appname%/data/numbering.json";
// import numberingKinase from './kinase/data/numbering.json';
// import numberingGta from './gta/data/numbering.json';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
//import * as d3 from "d3";
import KinWeblogo from './components/KinWeblogo'
import KinTreeView from './components/KinTreeView'
import Switch from '@material-ui/core/Switch';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Box from '@material-ui/core/Box';
// const rowWidth = 30, rowHeight = 120;
const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    marginLeft: 30,
  },
  paper: {
    padding: theme.spacing(0),
  },
  leftBox:
  {
    position: 'relative',
    // zIndex:'top'
  },
  mainBoxVisible:
  {
    //marginLeft: 200,
    display: 'inline-block'
  },
  mainBoxInvisible:
  {
    // marginLeft: 215,
    display: 'none'
  },
  treeVisible:
  {
    display: 'inline-block',
    marginRight: 40
  },
  treeInvisible:
  {
    //marginLeft: 0,
    display: 'none'
  },
  nowrap:
  {
    flexWrap: "nowrap !important",
  },

  paper: {
    // backgroundColor: theme.palette.background.paper,
    // border: '0px solid #000',
    // boxShadow: "none",//theme.shadows[5],
    // padding: theme.spacing(3, 10, 1),
    // minWidth: 400,
    // overflow: 'auto'
  },
  hidden:
  {
    display: "none"
  },
  structure:
  {
    marginLeft: -20,
  },
  motif:
  {
    marginLeft: 15,
  },
  legendLabel:
  {
    fontSize: '0.8rem',
  }
}));
// console.log(tree);
// const imgLogoStyle = {
//   width: '100px'
// };
const imgUgaLogoStyle = {
  float: 'right',
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
  const appname= process.env.REACT_APP_NAME;
  //let numberingjson = appname === "kinase" ? numberingKinase:numberingGta;
  let numberingjson = require(`./${appname}/data/numbering.json`);
  
  const [rdbvalue, setRdbValue] = React.useState('rdbResidue');
  // const [firstLabel, setFirstLabel] = React.useState('');
  // const [secondLabel, setSecondLabel] = React.useState('');
  const [selectedNode, setSelectedNode] = React.useState('');
  const [selectedNodes, setSelectedNodes] = React.useState([]);
  const [switchShowTreeChecked, setSwitchShowTreeChecked] = React.useState(true);
  const [switchDomainChecked, setSwitchDomainChecked] = React.useState(false);
  const [switchMotifChecked, setSwitchMotifChecked] = React.useState(false);
  const [switchHighResChecked, setHighResChecked] = React.useState(false);
  const [openResetDialog, setOpenResetDialog] = React.useState(false);
  const [viewMode, setViewMode] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState([]);
  const [height, setHeight] = React.useState(100);
  const weblogoRemove= node => e =>
  {
    handleDelete(node);
  }
  const weblogoCheckboxChanged = e =>
  {
    //let node = selectedNodes.filter(k => k.id == val.id);
    const modifiedNodes = selectedNodes.map((item,j)=>
    {
      if (e.target.id == "res-checkbox-" + item.id )
        item.residueChecked = e.target.checked;
      if (e.target.id == "mutw-checkbox-" + item.id )
        item.mutationWeblogosChecked = e.target.checked;
      if (e.target.id == "mutb-checkbox-" + item.id )
        item.mutationBarchartChecked = e.target.checked;
      // if (e.target.id == "ptmw-checkbox-" + item.id )
      //   item.ptmWeblogosChecked = e.target.checked;
      if (e.target.id == "ptmb-checkbox-" + item.id )
        item.ptmBarchartChecked = e.target.checked;
      
      
      return item;
    });
    
    setSelectedNodes(modifiedNodes);
  }
  const SortableItem = SortableElement((item) =>
    <div>
      <KinWeblogo 
          value={item.value}
          highres={switchHighResChecked} 
          numbers={getCandidateNumbers(item.value)} 
          height={height} 
          onRemove={weblogoRemove(item.value)}
          onChange={weblogoCheckboxChanged}
          residueChecked={item.value.residueChecked} 
          mutationWeblogosChecked={item.value.mutationWeblogosChecked}
          mutationBarchartChecked={item.value.mutationBarchartChecked}
          //ptmWeblogosChecked={item.value.ptmWeblogosChecked}
          ptmBarchartChecked={item.value.ptmBarchartChecked}
          viewMode = {viewMode}
           />
    </div>
  );
  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {selectedNodes.map((item, index) => (
          <SortableItem key={`item-${item.id}`} index={index} value={item} />
          //     <KinWeblogo src={'weblogos/' + item.path} label={item.value} numbers={getCandidateNumbers(item)}/>
        ))}
      </div>
    );
  });
  const onSortEnd = ({ oldIndex, newIndex }) => {

    setSelectedNodes(arrayMove(selectedNodes, oldIndex, newIndex));
  };


  function treeCheckboxChanged(node, checked) {
    console.log("id=" + node.id);
    console.log("checked=" + checked);
    console.log("treeCheckboxChanged:" + selectedNodes.length);

    let alreadyAdded =selectedNodes.some(item => item.id === node.id);
    
    if (checked && !alreadyAdded) { //add the selection to selectedNodes
      setSelectedNode(node);
      node.residueChecked = true;
      node.ptmChecked = false;
      node.mutationWeblogosChecked=false;
      node.mutationBarchart=false;
      setSelectedNodes(selectedNodes => [...selectedNodes, node]);
      console.log(selectedNodes);
    }
    else if(!checked) //remvoe the Selection
    {
      //setSelectedNode('');
      handleDelete(node);
    }

  }
  // function nodeSelected(node)
  // {

  //   // if (rdbvalue === 'rdbfirst')
  //   //   setFirstLabel(node.value);
  //   // else if (rdbvalue === 'rdbsecond')
  //   //   setSecondLabel(node.value);

  // }
  function getCandidateNumbers(node) {
    let numbering = { numberingjson }
    //todo: members[0] should be a dropdown box
    if (!node || !node.members || node.members.length == 0 || !(node.members[0] in numbering.numberingjson))
      return null;

    let candidates = []
    node.members.forEach(function (n) {
      if (numbering.numberingjson.hasOwnProperty(n))
        candidates.push({ "name": n, "value": numbering.numberingjson[n] });
    });

    return candidates;
    //return numbering.numberingjson[node.members[0]];
  }

  function handleDelete(nodeToDelete) {
    var filtered = selectedNodes.filter(function (value, index, arr) {
      return value.id != nodeToDelete.id;
    });
    setSelectedNodes(filtered);
  }
  const handleTreeSwitchChange = () => {
    setSwitchShowTreeChecked(prev => !prev);
  };
  const handleHighResChange = () => {
    setHighResChecked(prev => !prev);
  };
  const handleViewModechange = () => {
    setViewMode(prev => !prev);
  };
  
  
  const handleDomainSwitchChange = () => {
    setSwitchDomainChecked(prev => !prev);
  };
  const handleMotifSwitchChange = () => {
    setSwitchMotifChecked(prev => !prev);
  };

  const handleResetClick = () => {
    setOpenResetDialog(true);
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

  const handleCloseYes = () => {
    setOpenResetDialog(false);
    setSelectedNodes([]);
    setViewMode(false);
  };

  const handleCloseNo = () => {
    setOpenResetDialog(false);
  };
  const heightChanged = (event,value) => {
    setHeight(value);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item>
        <Dialog
          open={openResetDialog}
          onClose={handleCloseNo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to remove all of the selections?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseYes} color="primary">
              Yes
          </Button>
            <Button onClick={handleCloseNo} color="primary" autoFocus>
              No
          </Button>
          </DialogActions>
        </Dialog>


        {/* <SelectionBox items={selectedNodes} onDelete={handleDelete} /> */}
      </Grid>


      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={1} className={classes.nowrap}>
          <Grid key="leftTree" className={switchShowTreeChecked ? classes.treeVisible : classes.treeInvisible} item>
            <KinTreeView darkKinase={darkKinase} selectedNodes={selectedNodes} 
            onCheckBoxesChanged={treeCheckboxChanged} />
          </Grid>
          <Grid key="rightContents" item>
            <div className={selectedNodes.length > 0 ? classes.mainBoxVisible : classes.mainBoxInvisible}>

              <Paper id="mainPaper" className={selectedNode ? classes.paper : classes.hidden} elevation={0}>
              <div className="settings">
        
        <Box  display="flex" alignItems="flex-start" p={1} m={1}>
          <Box>
          <fieldset>
                <legend>Settings</legend>

        <FormControlLabel label="Hierarchy" control={<Switch checked={switchShowTreeChecked} onChange={handleTreeSwitchChange} />} />
        
         {/* <Switch checked={viewMode} onChange={handleViewModechange} />} /> */}
        {/* <FormControlLabel label="High-Res" control={<Switch checked={switchHighResChecked} onChange={handleHighResChange} />} />         */}
        <FormControlLabel label="Motif" control={<Switch checked={switchMotifChecked} onChange={handleMotifSwitchChange} />} />
        <FormControlLabel label="Domain Structure" control={<Switch checked={switchDomainChecked} onChange={handleDomainSwitchChange} />} />
        <FormControlLabel label="View Mode" control={<VisibilityIcon color={viewMode? "primary":"action"} fontSize="small" onClick={handleViewModechange} style={{ cursor: "pointer" }} />} />
        <FormControlLabel label="Height " labelPlacement="start" control={
        <div className="sliderHeight">
            <Slider
            onChange={heightChanged}
            defaultValue={height}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={5}
            min={50}
            max={150}
          />
       </div>
        } />
        <FormControlLabel style={{float:'right', marginLeft: '30px'}} control={<Button size="small" color="secondary" onClick={handleResetClick}>Reset</Button>} />

        </fieldset>
          </Box>
          <Box className={switchDomainChecked || switchMotifChecked ? "" : classes.hidden}>
          <fieldset>
          <legend>Legend</legend>
            <Box display="flex" alignItems="flex-start">
              <Box component="span" className={switchMotifChecked ? "legend-motif" : classes.hidden}>
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Lysine</Typography>} control={<img alt="betasheet" src="img/legend/lysine.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Glutamic acid</Typography>} control={<img alt="betasheet" src="img/legend/glutamic.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>C-spine</Typography>} control={<img alt="betasheet" src="img/legend/cspine.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>R-spine</Typography>} control={<img alt="betasheet" src="img/legend/rspine.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>RD pocket</Typography>} control={<img alt="betasheet" src="img/legend/rdpocket.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Shell</Typography>} control={<img alt="betasheet" src="img/legend/shell.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Gatekeeper</Typography>} control={<img alt="betasheet" src="img/legend/gatekeeper.png" />} />

              </Box>
              <Box component="span" className={switchDomainChecked ? "legend-domain" : classes.hidden}>
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>&alpha;-helix</Typography>} control={<img alt="betasheet" src="img/legend/alphahelix.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>&beta;-sheet</Typography>} control={<img alt="betasheet" src="img/legend/betasheet.png" />} />
              </Box>
            </Box>
          
        </fieldset>
          </Box>
        </Box>
        
        
        </div>

        <img src={`${appname}/img/motif.png`} alt="Motif" style={{width:4840,marginLeft:43}} className={selectedNode && switchMotifChecked ? classes.motif : classes.hidden} />
        <img src={`${appname}/img/structure.png`} alt="Domain Structure" style={{width:4840,marginLeft:43}}  className={selectedNode && switchDomainChecked ? classes.structure : classes.hidden} />

                {
                  <SortableList items={selectedNodes} onSortEnd={onSortEnd} useDragHandle />
                  // selectedNodes.map(function (item, idx) {
                  //   return //(<KinWeblogo src={'weblogos/' + item.path} height="140"  label={item.value} numbers={getCandidateNumbers(item)} />)
                  // })
                }

              </Paper>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;