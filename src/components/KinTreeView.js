import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { ArrowRight, ArrowDropDown, NoMeetingRoom } from '@material-ui/icons';
// import DarkIcon from '../img/kinase_dark.svg';
// import WellknownIcon from '../img/kinase_wellknown.svg';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.secondary,
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
            <img alt="Dark Kinase" src="img/kinase_dark.svg" width="20px" />
            :''
          }
          {
            nodeType == 'protein' && !isDark?
            // <WellknownIcon className={classes.labelIcon} />
            <img alt="Well-known Kinase" src="img/kinase_wellknown.svg" width="20px" />
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
  const classes = useStyles();
  const [nodes, setNodes] = React.useState(props.nodes);
  const [darkKinase, setDarkKinase] = React.useState(props.darkKinase);
  const filterInput = useRef(null);

  // useEffect(() => {
  //   setNodes(props.nodes)
  // }, [props.nodes]);

  function handleNodeClick(e, node) {
    props.onCheckBoxesChanged(node, e.target.checked);
  }

  function checkInSelectedNodes(node) {
    return props.selectedNodes.filter(n => n.id == node.id).length > 0;
  }

  function handleFilterChange(e,val) {
    console.log("val="+ val);
    //setNodes(props.nodes); //reset

    let filtered;
    //const val = e.target.value; //TextField
    //const val = e.currentTarget.innerText; //AutoComplete
    if (val) {
      filtered = props.nodes.filter(function iter(o) {
        var temp;
        if (o.value.toLowerCase().includes(val.toLowerCase())) {
          return true;
        }
        if (!Array.isArray(o.nodes)) {
          return false;
        }
        temp = o.nodes.filter(iter);
        if (temp.length) {
          o.nodes = temp;
          filtered = temp;

          return true;
        }
      });
      console.log(val);
      console.log(filtered);
      //setNodes(filtered);
    }
     else
       setNodes(props.nodes);

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
          onChange={(e) => handleNodeClick(e, node)}/>
          <StyledTreeItem nodeId={node.id} labelText={node.value} isDark={node.isDark} nodeType={node.type} >
            {children(node.nodes)}
          </StyledTreeItem>
      </div>
    })
  }

  return (

    <div>
          <Autocomplete
           size="small"
          //ref={filterInput}
          id="input-with-icon-grid" 
          options={darkKinase}
          getOptionLabel={option => option.value}
          onInputChange={handleFilterChange}
          style={{ width: 150 }}
          freeSolo
          renderInput={params => (
        <TextField {...params} label="Dark Kinase" variant="outlined" style = {{width: 150}}  />
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