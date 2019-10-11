import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: '#e8edf7',
      width:"auto"
    },
    visible:
    {
      display: 'inline-block'
    },
    hidden: 
    { 
      display:"none"
    },
    chip:
    {
        margin:3
    }
  }));

function SelectionBox(props) {
    const classes = useStyles();
    // const handleDelete = () => {
    //     alert('You clicked the delete icon.');
    //   };
    function handleDelete(nodeid) {
        // Here, we invoke the callback with the new value
        props.onDelete(nodeid);
      }
    return (
      <div className={classes.root}>
                   {/* <Box className={!props.items || props.items.length == 0 ? classes.visible:classes.hidden}>
          
                        Help text for the first time visitors go here. We can don't show it if a user revists the app.
          
                </Box>   */}
                <Box className={props.items && props.items.length>0 ? classes.visible:classes.hidden}>
                    {
                        props.items.map(function(item, idx){
                        return (<Chip size="small" label={item.value} onDelete={handleDelete.bind(this,item.id)} color="primary" className={classes.chip} />);
                    })}
          </Box>
      </div>
    );
}
export default SelectionBox;