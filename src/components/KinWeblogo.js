import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      flexWrap: 'wrap',
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
    },
    column: {
      flexBasis: '33.33%',
    },
    leftside:{
      minWidth: 80
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
        
    },
  }));
function showlabel(prefix,lbl)  
{
  if (lbl)
    return prefix + ': ' + lbl;
  return "";
}
function renderOptions(numbers)
{
  if (!numbers)
    return "N/A";
  return numbers.map((item,i) => { return (<option key={i} value={item.name}>{item.name}</option>) });
}  
  
function KinWeblogo(props)
{
    const [selectedNumbering, setNumbering] = React.useState(props && props.numbers?props.numbers:'');
    const [selectedNumberingValue, setNumberingValue] = React.useState('');
    const [propChanged, setPropChanged] = React.useState(false);
    
    //componentDidMount
 
      useEffect( ()=>{
        //alert(selectedNumbering);
        //numberingChanged('init',props.numbers);
        // setNumberingValue('AKT1');
      }, [] );
   
    
    // props.numbers? 
    // props.numbers.map(n => n === null ? '- ' : <span class="v">{n}</span>)
    // :''
    // const showNumbers = candidates =>
    // {
    //   const numbering = "N/A";
    //   if (candidates && candidates.length>0)
    //     numbering = candidates[0].value.map(n => n === null ? '- ' : <span class="v">{n}</span>);
    //   //return "N/A";
    //   setNumbering(numbering);
    //   //return candidates? candidates.map(n => n === null ? '- ' : <span class="v">{n}</span>): "N/A";
    // }
    
    //init:
    // if (props.numbers)
    //   setNumbering(props.numbers.map(n => n === null ? '- ' : <span class="v">{n}</span>));
    const numberingChanged = event => {
      if (props.numbers && event.target)
      {
      const val = props.numbers.filter(function(item){return item.name == event.target.value});
      let numbering = "N/A";
      if (val)
        //numbering = JSON.parse('[' + val + ']').map(n => n === null ? '- ' : <span class="v">{n}</span>);
        numbering = val[0].value.map(n => n === null ? '- ' : <span class="v">{n}</span>);
      //showNumbers()
      setNumbering(numbering);
      setPropChanged(true);
      setNumberingValue(event.target.value);
    }
    };
    // const setNumberingState = candidates =>
    // {
    //   const numbering = "N/A";
    //    if (candidates && candidates.length>0)
    //       numbering = candidates[0].value.map(n => n === null ? '- ' : <span class="v">{n}</span>);
    //   setNumbering(numbering);

    // }

    
    const classes = useStyles();

    return(
     <div className={classes.root}>
     <ExpansionPanel defaultExpanded>
       <ExpansionPanelSummary
         expandIcon={<ExpandMoreIcon />}
         aria-controls="panel1c-content"
         id="panel1c-header">
         <div className={classes.column}>
         <IconButton aria-label="delete" className={classes.margin}>
              <DeleteIcon fontSize="small" /></IconButton>  | {showlabel('Weblogo',props.label)} 
            
           {/* <Chip label="" onDelete={() => {}} /> */}
           {/* <Typography className={classes.heading}>WebLogo {props.label}</Typography> */}
         </div>
         <div className={classes.column}>
         </div>
       </ExpansionPanelSummary>
       <ExpansionPanelDetails className={classes.details}>
         {/* <div className={classes.column}>
         </div> */}
         <div className={classes.leftside}>
              <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="numbering-native-label-placeholder">
                Numbering
              </InputLabel>
              <NativeSelect
                value={selectedNumberingValue}
                onChange={numberingChanged}
                inputProps={{
                  name: 'numbering',
                  id: 'numbering-native-label-placeholder',
                }}
              >
                {renderOptions(props.numbers)}
              

              </NativeSelect>
              {/* <FormHelperText>Label + placeholder</FormHelperText> */}
            </FormControl>
         </div>
         <div className={clsx(classes.column, classes.helper)}>
         <img id='firstImage' src={props.src} />
            <div class="numberingdiv">
              {selectedNumbering}
            </div>
         </div>
       </ExpansionPanelDetails>
       <Divider />
       <ExpansionPanelActions>
         <Button size="small">Cancel</Button>
         <Button size="small" color="primary">
           Save
         </Button>
       </ExpansionPanelActions>
     </ExpansionPanel>
   </div>
    
    );
    
            
}
export default KinWeblogo;