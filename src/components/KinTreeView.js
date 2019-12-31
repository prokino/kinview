import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Checkbox from '@material-ui/core/Checkbox';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
  const filterInput = useRef(null);
  function handleNodeClick(e, node) {
    props.onCheckBoxesChanged(node, e.target.checked);
  }

  function checkInSelectedNodes(node) {
    return props.selectedNodes.filter(n => n.id == node.id).length > 0;
  }
  function handleFilterChange(e) {
    let filtered;
    if (e.target.value) {
      filtered = props.nodes.filter(function iter(o) {
        var temp;
        if (o.value.toLowerCase().includes(e.target.value.toLowerCase())) {
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
      setNodes(filtered);
    }
    else
      setNodes(props.nodes);

    filterInput.current.focus();

  }
  function makeTree(nodes) {
    const children = (members) => {
      if (members) {
        return makeTree(members);
      }
    }

    return nodes.map((node, index) => {
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
      <TextField autoFocus ref={filterInput} 
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
      />

      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
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