import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import {sortableHandle} from 'react-sortable-hoc';
import ReorderIcon from '@material-ui/icons/Reorder';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
    },
    visible:
    {
      display: 'inline-block'
    },
    hidden: 
    { 
      display:"none"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'baseline',
      display:'block'
    },
    column: {
      // flexBasis: '33.33%',
    },
    leftside:{
      minWidth: 70
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
      margin: {
        margin: theme.spacing(1),
        clear:'none',

      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      formGroupRow :
      {
        verticalAlign:'middle',
      }
        
    },
  }));


const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    height: 44,
    minHeight: 44,
    maxHeight: 44,
    '&$expanded': {
      height: 44,
      minHeight: 44,
      maxHeight: 44,
    },
  },
  content: {
    '&$expanded': {
      // margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const StyledFormGroup = withStyles(theme => ({
  root: {
    display:'block',
  },
  
}))(FormGroup);

function showlabel(prefix,lbl)  
{
  if (lbl)
    return prefix + ': ' + lbl;
  return "";
}
// function renderOptions(numbers)
// {
//   if (!numbers)
//     return "N/A";
//   return numbers.map((item,i) => { return (<option key={i} value={item.name}>{item.name}</option>) });
// }  
  
function KinWeblogo(props)
{
    const [selectedNumbering, setNumbering] = React.useState(props && props.numbers?props.numbers[0]:'');
    const [selectedNumberingValue, setNumberingValue] = React.useState('');
    const [propChanged, setPropChanged] = React.useState(false);
    const [resudieChecked, setResudieChecked] = React.useState(true);
    const [mutationChecked, setMutationChecked] = React.useState(false);
    const [ptmChecked, setPtmChecked] = React.useState(false);
    const DragHandle = sortableHandle(() => <ReorderIcon />);
    const numberingclass = classNames({
  "numberingdiv":true,
  "hidden": !(resudieChecked || mutationChecked || ptmChecked)
});

    function toggleResidue() {
      setResudieChecked(prev => !prev);
    };
    function toggleMutation() {
      setMutationChecked(prev => !prev);
    };
    function togglePtm() {
      setPtmChecked(prev => !prev);
    };
    //componentDidMount
 
      useEffect( ()=>{
        //alert(selectedNumbering);
        //numberingChanged('init',props.numbers);
        // setNumberingValue('AKT1');
      }, [] );
   

    const numberingChanged = event => {
      if (props.numbers && event.target)
      {
      const val = props.numbers.filter(function(item){return item.name == event.target.value});
      let numbering = "N/A";
      if (val)
        numbering = val[0].value.map(n => n === null ? '- ' : <span className="v">{n}</span>);
      //showNumbers()
      setNumbering({"value":numbering});
      setPropChanged(true);
      setNumberingValue(event.target.value);
    }
    };
    
    const classes = useStyles();

    return(
     //<div className={classes.root}>
     <div>
     <ExpansionPanel square defaultExpanded>
       <ExpansionPanelSummary
         //expandIcon={<ExpandMoreIcon />}
         aria-controls="panel1d-content" id="panel1d-header">

<StyledFormGroup row className={classes.formGroupRow}>
<DragHandle />
<Button variant="outlined" color="secondary" className={classes.button}>
        {props.value.value}
      </Button>
      <NativeSelect
                value={selectedNumberingValue}
                onChange={numberingChanged}
                onClick={e => { e.stopPropagation(); }}
                inputProps={{
                  name: 'numbering',
                  id: 'numbering-native-label-placeholder',
                }}
              >
                {/* {renderOptions(props.numbers)} */}
                {props.numbers? props.numbers.map((item,i) => { return (<option key={i} value={item.name}>{item.name}</option>) }):""}
              

              </NativeSelect>

        <FormControlLabel
          control={<Switch checked={resudieChecked}  value="residue" onClick={e => { e.stopPropagation(); }} onChange={toggleResidue} />}
          label="Residue"
        />
        <FormControlLabel
          control={<Switch checked={mutationChecked} value="mutation" onClick={e => { e.stopPropagation(); }} onChange={toggleMutation}   />}
          label="Mutation"
        />
        <FormControlLabel
          control={ <Switch checked={ptmChecked} value="ptm" onClick={e => { e.stopPropagation(); }} onChange={togglePtm}   /> }          label="PTM"
        />
      </StyledFormGroup>
         
       </ExpansionPanelSummary>
       <ExpansionPanelDetails className={classes.details}>
         {/* <div className={classes.leftside}>
              <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="numbering-native-label-placeholder">
                Alignments
              </InputLabel>
          
            </FormControl>
         </div> */}
         <Box>
          <img id={`weblogo-${props.value.id}`} className={resudieChecked ? classes.visible: classes.hidden} src={`weblogos/${props.value.path}`} height={props.height?props.height:"188"} width={props.width ? props.width:"4875"}  />
          
         </Box>
         <Box className={mutationChecked ? classes.visible: classes.hidden}>
           <img id={`mutation-${props.value.id}`}  src={`mut_freq/${props.value.path}`} height={props.height?props.height:"188"} width={props.width ? props.width:"4875"}  />
         </Box>
         <Box className={ptmChecked ? classes.visible: classes.hidden}>
                PTM Data
         </Box>
         <div className={numberingclass}>
              {selectedNumbering?selectedNumbering.value.map((n,index) => n === null ? '- ' : <span key={`p${index}`} className="v">{n}</span>):""}
              </div>
     
         
      
       </ExpansionPanelDetails>
       {/* <Divider />
       <ExpansionPanelActions>
         <Button size="small">Cancel</Button>
         <Button size="small" color="primary">
           Save
         </Button>
       </ExpansionPanelActions> */}
     </ExpansionPanel>
   </div>
    
    );
}
function memoize()
{
    return false;
}
//export default KinWeblogo;
export default React.memo(KinWeblogo,memoize);