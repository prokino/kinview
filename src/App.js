//https://aspenmesh.io/2019/03/using-d3-in-react-a-pattern-for-using-data-visualization-at-scale/
import React, { useRef, useEffect, useState } from 'react';
import './App.css';
//import MuiTreeView from 'material-ui-treeview';
import tree from './data/classification.json';
import numberingjson from './data/numbering.json';
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
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// const rowWidth = 30, rowHeight = 120;
const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    marginLeft: 5,
    // maxWidth: "100% !important",
    // overflow: "hidden"
  },
  card: {
    width: 235,
    margin:5
  },
  paper: {
    padding: theme.spacing(0),
  },
  leftBox:
  {
    position: 'relative',
    // zIndex:'top'
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
    marginLeft: 55,
    width: 4863
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

  const [nodes,setNodes] = React.useState(tree.map((n)=>{n.checked=false;return n;}));
  const [selectedNode, setSelectedNode] = React.useState('');
  const [selectedNodes, setSelectedNodes] = React.useState([]);
  const [switchShowTreeChecked, setSwitchShowTreeChecked] = React.useState(true);
  const [switchDomainChecked, setSwitchDomainChecked] = React.useState(false);
  const [openResetDialog, setOpenResetDialog] = React.useState(false);



  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState([]);
  const [height, setHeight] = React.useState("100");
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
      if (e.target.id == "mut-checkbox-" + item.id )
        item.mutationChecked = e.target.checked;
      if (e.target.id == "ptm-checkbox-" + item.id )
        item.ptmChecked = e.target.checked;
      
      return item;
    });
    
    setSelectedNodes(modifiedNodes);
  }
  const SortableItem = SortableElement((item) =>
    <div>
      <KinWeblogo 
          value={item.value} 
          numbers={getCandidateNumbers(item.value)} 
          height={height} 
          onRemove={weblogoRemove(item.value)}
          onChange={weblogoCheckboxChanged}
          residueChecked={item.value.residueChecked} 
          mutationChecked={item.value.mutationChecked}
          ptmChecked={item.value.ptmChecked} />
    </div>
  );
  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {selectedNodes.map((item, index) => (
          <SortableItem key={`item-${item.id}`} index={index} value={item} />
          //     <KinWeblogo src={'weblogos/' + item.path} label={item.value} numbers={getCandidateNumbers(item)}/>

        ))}
      </ul>
    );
  });
  const onSortEnd = ({ oldIndex, newIndex }) => {

    setSelectedNodes(arrayMove(selectedNodes, oldIndex, newIndex));
  };

  // useEffect(() => {
  //   alert('han');
  // }, [selectedNodes]);


  function treeCheckboxChanged(node, checked) {
    console.log("id=" + node.id);
    console.log("checked=" + checked);
    console.log("treeCheckboxChanged:" + selectedNodes.length);

    if (checked) { //add the selection to selectedNodes
      setSelectedNode(node);
      node.residueChecked = true;
      node.ptmChecked = false;
      node.mutationChecked=false;
      setSelectedNodes(selectedNodes => [...selectedNodes, node]);
    }
    else //remvoe the Selection
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
  const handleDomainSwitchChange = () => {
    setSwitchDomainChecked(prev => !prev);
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
          <FormControlLabel label="Menu" control={<Switch checked={switchShowTreeChecked} onChange={handleTreeSwitchChange} />} />
      <Fade in={switchShowTreeChecked}>
<Grid item xs={12} className="parentgrid" >
          <Grid item key="leftTree" className={switchShowTreeChecked ? "treevisible" : "invisible"}>
          <Card className={`${classes.card} ${selectedNodes.length > 0 ? "treevisible" : "invisible"}`}>
      <CardActionArea>

        <CardContent>
          {/* <Typography gutterBottom variant="h6" component="h2">
            Settings
          </Typography> */}
        <FormControlLabel label="Domain Structure" control={<Switch checked={switchDomainChecked} onChange={handleDomainSwitchChange} />} />
        <br />
        <FormControlLabel label="Height" labelPlacement="start" control={
        <div style={{width:"100px"}}>
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
        } /> <br />
        {/* <FormControlLabel control={<Button variant="outlined" color="secondary" onClick={handleResetClick}>Reset</Button>} /> */}

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
      
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Button size="small" variant="outlined" color="primary" onClick={handleResetClick}>Reset</Button>
      </CardActions>
    </Card>
    <Card className={classes.card}>
          {/* <Typography gutterBottom variant="h6" component="h2">
            Selections
          </Typography> */}
      <CardActionArea>
      <CardContent>
      <KinTreeView nodes={nodes} selectedNodes={selectedNodes} onCheckBoxesChanged={treeCheckboxChanged} />
      </CardContent>

      </CardActionArea>
    </Card>
      
          </Grid>
          <Grid item key="rightContents">
            <div className={selectedNodes.length > 0 ? "mainBoxVisible" : "invisible"}>

              <img src={'img/KinView_Structure.png'} className={selectedNode && switchDomainChecked ? classes.structure : classes.hidden} />
              <Paper className={selectedNode ? classes.paper : classes.hidden} elevation={0}>
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
      </Fade>
      
    </div>
  );
}

export default App;
