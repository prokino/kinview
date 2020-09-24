//https://aspenmesh.io/2019/03/using-d3-in-react-a-pattern-for-using-data-visualization-at-scale/
import React, { useRef, useEffect, useState } from 'react';
import './App.css';
//import MuiTreeView from 'material-ui-treeview';

import darkKinase from './kinase/data/dark_list.json'
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
import {Helmet} from "react-helmet";
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



  const [rdbvalue, setRdbValue] = React.useState('rdbResidue');
  // const [firstLabel, setFirstLabel] = React.useState('');
  // const [secondLabel, setSecondLabel] = React.useState('');
  const [selectedNode, setSelectedNode] = React.useState('');
  const [checkboxes, setCheckboxes] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  const [selectedNodes, setSelectedNodes] = React.useState([]);
  // const [switchShowTreeChecked, setSwitchShowTreeChecked] = React.useState(true);
  // const [switchDomainChecked, setSwitchDomainChecked] = React.useState(false);
  // const [switchMotifChecked, setSwitchMotifChecked] = React.useState(false);
  const [switchHighResChecked, setHighResChecked] = React.useState(false);
  const [openResetDialog, setOpenResetDialog] = React.useState(false);
  const [viewMode, setViewMode] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState([]);
  const [height, setHeight] = React.useState(100);

  const appname= process.env.REACT_APP_NAME;
  let numberingjson = require(`./${appname}/data/numbering.json`);
  const settings = require(`./${appname}.settings.js`).settings;
  useEffect(()=>
  {
    setCheckboxes(settings.elements.filter(x=>x.type==="checkbox"));
    setOptions(settings.options.filter(x=>x.type==="checkbox"));
  }
  ,[settings,settings.elements,settings.options]);
    

  const weblogoRemove= node => e =>
  {
    handleDelete(node);
  }


  const weblogoCheckboxChanged = e =>
  {

    const el = e.target.id; //for example: negative-checkbox-id11@Axl
    const id = el.substring(el.lastIndexOf("-")+1); //for example: id11@Axl
    //const checkbox = el.substring(0,el.indexOf("-")); //for example: negative
    //let node = selectedNodes.find(k => k.id === el.substring(id));
    
    const modifiedNodes = selectedNodes.map((node,j)=>
    {
      if (node.id === id)
      {
        //if (node.checkboxes.length === 0) //not initialized
        node.checkboxes = node.checkboxes.length>0? JSON.parse(JSON.stringify(node.checkboxes)):settings.elements.filter(x=>x.type==="checkbox"); //a deep copy of checkboxes
        node.checkboxes.find( x=> x.id === e.target.defaultValue)["checked"] = e.target.checked;
      }
      return node;
    });

    // const modifiedNodes = selectedNodes.map((item,j)=>
    // {
    //   if (e.target.id === "res-checkbox-" + item.id )
    //     item.residueChecked = e.target.checked;
    //   if (e.target.id === "mutw-checkbox-" + item.id )
    //     item.mutationWeblogosChecked = e.target.checked;
    //   if (e.target.id === "mutb-checkbox-" + item.id )
    //     item.mutationBarchartChecked = e.target.checked;
    //   // if (e.target.id == "ptmw-checkbox-" + item.id )
    //   //   item.ptmWeblogosChecked = e.target.checked;
    //   if (e.target.id === "ptmb-checkbox-" + item.id )
    //     item.ptmBarchartChecked = e.target.checked;
      
      
    //   return item;
    // });
    
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
          checkboxes = {item.value.checkboxes}
          // residueChecked={item.value.residueChecked} 
          // mutationWeblogosChecked={item.value.mutationWeblogosChecked}
          // mutationBarchartChecked={item.value.mutationBarchartChecked}
          //ptmBarchartChecked={item.value.ptmBarchartChecked}
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

  //weblogo options (e.g., weblogo checkboxes) initialize here, when a node is selected
  function treeCheckboxChanged(node, checked) {

    let alreadyAdded =selectedNodes.some(item => item.id === node.id);
    
    if (checked && !alreadyAdded) { //add the selection to selectedNodes
      setSelectedNode(node);
      if (!node.checkboxes)
        node.checkboxes = JSON.parse(JSON.stringify(checkboxes));
      // let checkboxes = elements.reduce(function (res, item) {
      //   if (item.type === "checkbox") {
      //     // creating checkboxes from settings, for example:
      //     // node.residueChecked = true;
      //     // node.ptmChecked = false;
      //     let obj = {};
      //     obj[item.id] = {"checked":checked};
      //     res.push(obj);
      //   }
      //   return res;
      // }, []);
      // node.options = checkboxes;   
      setSelectedNodes(selectedNodes => [...selectedNodes, node]);
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
  // const handleTreeSwitchChange = () => {
  //   setSwitchShowTreeChecked(prev => !prev);
  // };
  const handleHighResChange = () => {
    setHighResChecked(prev => !prev);
  };
  const handleViewModechange = () => {
    setViewMode(prev => !prev);
  };
  
  
  // const handleDomainSwitchChange = () => {
  //   setSwitchDomainChecked(prev => !prev);
  // };
  // const handleMotifSwitchChange = () => {
  //   setSwitchMotifChecked(prev => !prev);
  // };

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
  const isEnabled = (id) => {
    return options.some(x => x.id === id && x.checked);
  }
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
  function toggleOptions(event)
  {    
    let id =event.target.value;
    let element = settings.options.find(x => x.id === id);
    element.checked = !element.checked;
    const modifiedOptions = options.map((item,j)=>
    {
      if (id === item.id)
        item.checked = event.target.checked;
      return item;
    });
    setOptions(modifiedOptions);
  }
  const classes = useStyles();

  let rendered_options = [];
  options.forEach((element,index) =>
  {
    if (element.visible) 
    {
      let checkbox = <FormControlLabel control={
        <Switch 
          id={`${element.id}-checkbox`} 
          //checked={checkboxes[x=>x.id === ""].visible} 
          checked={element.checked} 
          value={element.id} 
          onChange={toggleOptions} />} label={element.name} />
        
      rendered_options.push(checkbox);
    }
  });

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{settings.title?settings.title:"AppGen"}</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
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
          <Grid key="leftTree" className={isEnabled("hierarchy") ? classes.treeVisible : classes.treeInvisible} item>
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

        {/* <FormControlLabel label="High-Res" control={<Switch checked={switchHighResChecked} onChange={handleHighResChange} />} />         */}
        
        {/* <FormControlLabel label="Hierarchy" control={<Switch checked={switchShowTreeChecked} onChange={handleTreeSwitchChange} />} />
        <FormControlLabel label="Motif" control={<Switch checked={switchMotifChecked} onChange={handleMotifSwitchChange} />} />
        <FormControlLabel label="Domain Structure" control={<Switch checked={switchDomainChecked} onChange={handleDomainSwitchChange} />} /> */}
        {rendered_options}
        
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
          <Box className={settings.show_legend && (isEnabled("domain") || isEnabled("motif")) ? "" : classes.hidden}>
          <fieldset>
          <legend>Legend</legend>
            <Box display="flex" alignItems="flex-start">
              <Box component="span" 
                className={isEnabled("motif") ? "legend-motif" : classes.hidden}>
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Lysine</Typography>} control={<img alt="betasheet" src="img/legend/lysine.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Glutamic acid</Typography>} control={<img alt="betasheet" src="img/legend/glutamic.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>C-spine</Typography>} control={<img alt="betasheet" src="img/legend/cspine.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>R-spine</Typography>} control={<img alt="betasheet" src="img/legend/rspine.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>RD pocket</Typography>} control={<img alt="betasheet" src="img/legend/rdpocket.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Shell</Typography>} control={<img alt="betasheet" src="img/legend/shell.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>Gatekeeper</Typography>} control={<img alt="betasheet" src="img/legend/gatekeeper.png" />} />

              </Box>
              <Box component="span" className={isEnabled("domain") ? "legend-domain" : classes.hidden}>
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>&alpha;-helix</Typography>} control={<img alt="betasheet" src="img/legend/alphahelix.png" />} />
                <FormControlLabel labelPlacement='end' label={<Typography className={classes.legendLabel}>&beta;-sheet</Typography>} control={<img alt="betasheet" src="img/legend/betasheet.png" />} />
              </Box>
            </Box>
          
        </fieldset>
          </Box>
        </Box>
        </div>

          <img src={`${appname}/img/motif.png`} alt="Motif" style={{width:4840,marginLeft:43}} className={selectedNode && isEnabled("motif") ? classes.motif : classes.hidden} />
          <img src={`${appname}/img/structure.png`} alt="Domain Structure" 
                style={
                      {
                        width: isEnabled("domain") && options.filter(x => x.id === "domain")[0].width ? options.filter(x => x.id === "domain")[0].width:4840,
                        marginLeft: isEnabled("domain") && options.filter(x => x.id === "domain")[0].marginLeft ? options.filter(x => x.id === "domain")[0].marginLeft:43}}  
                        className={selectedNode && isEnabled("domain") ? classes.structure : classes.hidden} />
              {
                <SortableList items={selectedNodes} onSortEnd={onSortEnd} useDragHandle />
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