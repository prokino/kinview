import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
      height: 216,
      flexGrow: 1,
      maxWidth: 200,
    }
  }));

function KinTreeViewFunc(props) {
    const classes = useStyles();
    function handleNodeClick(e,node)
    {
      props.onCheckBoxesChanged(node,e.target.checked);
    }
    
    function makeTree(nodes) {
      const children = (members) => {
        if (members) {
          return makeTree(members);
        }
      }
      const checkBoxClicked = (event, checked, id) => {
        if (checked)
        alert("checked " + id);
        else
        alert("not checked " + id);
     };
      return nodes.map((node, index) => {
        return <div style={{ display: 'flex', alignItems: 'baseline' }}>   
          <Checkbox
            id={`checkbox-${node.id}`}
            color="primary"
            onChange={(e)=>handleNodeClick(e,node)}
            onClick={e => (e.stopPropagation())}
          />
      <TreeItem nodeId={ node.id } label={ node.value } >
          { children(node.nodes) }
        </TreeItem>
        </div>
      })
    }

    return (
      <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {
        makeTree(props.nodes)
          //   nodes.map(function(item, idx){
          //   return (<TreeItem nodeId={item.id} label={item.value}/>)
          // })}
      }
      {/* <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem> */}
    </TreeView>
    );
}
function memoize()
{
    //because we don't want to re-render the dendrogram
    return true;
}
const KinTreeView = React.memo(KinTreeViewFunc,memoize);
export default KinTreeView;