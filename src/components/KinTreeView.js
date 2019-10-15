import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Checkbox from '@material-ui/core/Checkbox';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      // height: 216,
      flexGrow: 1,
      maxWidth: 200,
      position: 'relative'
    }
  }));

function KinTreeView(props) {
    const classes = useStyles();
    const [filter, setFilter] = React.useState('');
    function handleNodeClick(e,node)
    {
      props.onCheckBoxesChanged(node,e.target.checked);
    }
    function handleFilterChange(e)
    {
      setFilter(e.target.value);
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

<div>
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>
        <Search />
      </Grid>
      <Grid item>
        <TextField id="input-with-icon-grid" label="Filter" onChange={handleFilterChange} />
      </Grid>
    </Grid>
              
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
    </TreeView>
    </div>
    );
}
function memoize()
{
    //because we don't want to re-render the dendrogram
    return false;
}
//const KinTreeView = React.memo(KinTreeViewFunc,memoize);
export default KinTreeView;