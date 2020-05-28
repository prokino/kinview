import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import treeKinase from '../kinase/data/classification.json';
import treeGta from '../gta/data/classification.json';

import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { ArrowRight, ArrowDropDown, NoMeetingRoom } from '@material-ui/icons';
import { getNodeMajorVersion } from 'typescript';
import Switch from '@material-ui/core/Switch';


const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.primary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      // paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.2, 0),
    margin: -5
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));


const useStyles = makeStyles(theme => ({
  root: {
    // height: 216,
    flexGrow: 1,
    maxWidth: 200,
    position: 'relative',
    marginLeft: -15
  }

}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { isDark, nodeType, labelText, labelIcon: LabelIcon, labelIconColor, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          {
            nodeType == 'protein' && isDark?
            <img alt="Select Dark Kinase" src="img/kinase_dark.svg" width="22px" />
            :''
          }
          {
            nodeType == 'protein' && !isDark?
            // <WellknownIcon className={classes.labelIcon} />
            <img alt="Well-known Kinase" src="img/kinase_wellknown.svg" width="22px" />
            :''
          }
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

// const useStyles = makeStyles({
//   root: {
//     height: 264,
//     flexGrow: 1,
//     maxWidth: 400,
//   },
// });

function KinTreeView(props) {
  const appname= process.env.REACT_APP_NAME;
  const rootid = appname === "kinase" ? "id@PK":"id@GTA";
  let tree = appname === "kinase" ? treeKinase:treeGta;
  if (appname === "kinase")
    tree = tree[0].concat(tree[1]);
  const originalNodes = tree.map((n)=>{n.checked=false;return n;});
  const nodesCopy = JSON.parse(JSON.stringify(originalNodes));
  
  const classes = useStyles();
  
  //const [nodes, setNodes] = React.useState(props.nodes);
  const [nodes,setNodes] = React.useState(originalNodes);
  const [darkKinase] = React.useState(props.darkKinase);
  const [switchOnlyDark, setSwitchOnlyDark] = React.useState(false);

  const filterInput = useRef(null);

  useEffect(() => {
    let node = originalNodes.filter(x=> x.id === rootid)[0];
    node.checked=true;    
    handleNodeClick(node,true);
  },[nodes]);

  function handleNodeClick(node,checked) {
    props.onCheckBoxesChanged(node, checked);
  }
  const handleOnlyDark = () => {
    setSwitchOnlyDark(prev => !prev);
  };
  function checkInSelectedNodes(node) {
    return props.selectedNodes.filter(n => n.id == node.id).length > 0;
  }

  function handleFilterChange(e,val) {
    console.log("val="+ val);
    let filtered;
    if (val) {
      filtered = nodesCopy.filter(function iter(o) {
        if (o.value.toLowerCase().includes(val.toLowerCase())) {
          return true;
        }
        if (!Array.isArray(o.nodes)) {
          return false;
        }
        let temp = o.nodes.filter(iter);
        if (temp.length) {
          o.nodes = temp;
          filtered = temp;

          return true;
        }
      });
      setNodes([...filtered]);
    }
    else
      setNodes(originalNodes);
    //filterInput.current.focus();

  }
  function makeTree(nodes) {
    const children = (members) => {
      if (members) {
        return makeTree(members);
      }
    }

if (nodes)    return nodes.map((node, index) => {
      return <div key={`node-${index}`} style={{ display: 'flex', alignItems: 'baseline' }}>
        <Checkbox
          id={`checkbox-${node.id}`}
          size='small'
          color="primary"
          checked={checkInSelectedNodes(node)}
          onChange={(e) => handleNodeClick(node,e.target.checked)}/>
          <StyledTreeItem nodeId={node.id} labelText={node.value} isDark={node.isDark} nodeType={node.type} >
            {children(node.nodes)}
          </StyledTreeItem>
      </div>
    })
  }

  return (

    <div>
        <FormControlLabel style={{width:'max-content'}} label="Only Dark Kinase" control={<Switch checked={switchOnlyDark} onChange={handleOnlyDark} />} />
          <Autocomplete
           size="small"
          //ref={filterInput}
          id="input-with-icon-grid" 
          options={switchOnlyDark?darkKinase:undefined}
          getOptionLabel={option => option.value}
          onInputChange={handleFilterChange}
          { ...( !switchOnlyDark && { freeSolo: true } ) } 
          renderInput={params => (
          <TextField {...params} label={`${switchOnlyDark? "Select Dark Kinas":"Search Kinaese"}`} variant="outlined" style = {{width:170}}  />
      )}
    />

      {/* <TextField autoFocus ref={filterInput}
          id="input-with-icon-grid" 
          label="Filter" 
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
      /> */}

      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDown />}
        defaultExpandIcon={<ArrowRight />}
      >
        {
          makeTree(nodes)
          //   nodes.map(function(item, idx){
          //   return (<TreeItem nodeId={item.id} label={item.value}/>)
          // })}
        }
      </TreeView>
    </div>
  );
}
function memoize() {
  //because we don't want to re-render the dendrogram
  return true;
}
//const KinTreeView = React.memo(KinTreeViewFunc,memoize);
export default KinTreeView;