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
import { sortableHandle } from 'react-sortable-hoc';
import ReorderIcon from '@material-ui/icons/Reorder';
import DeleteIcon from '@material-ui/icons/Delete';
import SvgIcon from '@material-ui/core/SvgIcon';

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
    display: "none"
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
    display: 'block'
  },
  column: {
    // flexBasis: '33.33%',
  },
  leftside: {
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
      clear: 'none',

    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    formGroupRow:
    {
      verticalAlign: 'middle',
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
    position: 'sticky',
    left: 0,
    display: 'flex',
    placeItems: 'center',
    width: '900px',
    justifyContent: 'space-between',
  },

}))(FormGroup);

function showlabel(prefix, lbl) {
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
function highlightColumn(e) {
  e.preventDefault();
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var rect = document.createElementNS(svg.namespaceURI, 'rect');

  rect.setAttributeNS(null, 'x', 0);
  rect.setAttributeNS(null, 'y', 0);
  rect.setAttributeNS(null, 'height', e.screenY);
  rect.setAttributeNS(null, 'width', '10');
  rect.setAttributeNS(null, 'fill', '#ff0000');
  rect.setAttributeNS(null, 'style', 'position:absolute;z-index:1;opacity:0.33;top:40px;');

  svg.appendChild(rect);
  e.currentTarget.appendChild(svg);

  // var h=document.createElement('a');
  // h.setAttribute('href', 'http://www.google.com');
  // var t=document.createTextNode('Hello World');
  // h.appendChild(t);
  // document.body.appendChild(h);
}
function KinWeblogo(props) {
  const [selectedNumbering, setNumbering] = React.useState(props && props.numbers ? props.numbers[0] : '');
  const [selectedNumberingValue, setNumberingValue] = React.useState('');
  const [propChanged, setPropChanged] = React.useState(false);
  const [residueChecked, setResidueChecked] = React.useState(props.residueChecked);
  const [mutationWeblogosChecked, setMutationWeblogosChecked] = React.useState(props.mutationWeblogosChecked);
  const [mutationBarchartChecked, setMutationBarchartChecked] = React.useState(props.mutationBarchartChecked);
  const [ptmWeblogosChecked, setPtmWeblogosChecked] = React.useState(props.ptmWeblogosChecked);
  const [ptmBarchartChecked, setPtmBarchartChecked] = React.useState(props.ptmBarchartChecked);
  const DragHandle = sortableHandle(() => <ReorderIcon />);
  const numberingclass = classNames({
    "numberingdiv": true,
    "hidden": !(residueChecked || mutationWeblogosChecked || mutationBarchartChecked || ptmWeblogosChecked || ptmBarchartChecked)
  });

  function toggleResidue(event) {
    setResidueChecked(prev => !prev);
    props.onChange(event);
  };
  function toggleMutationBarchart(event) {
    setMutationBarchartChecked(prev => !prev);
    props.onChange(event);
  };
  function toggleMutationWeblogos(event) {
    setMutationWeblogosChecked(prev => !prev);
    props.onChange(event);
  };
  function togglePtmWeblogos(event) {
    setPtmWeblogosChecked(prev => !prev);
    props.onChange(event);
  };
  function togglePtmBarchart(event) {
    setPtmBarchartChecked(prev => !prev);
    props.onChange(event);
  }; 
  //componentDidMount

  useEffect(() => {
    //alert(selectedNumbering);
    //numberingChanged('init',props.numbers);
    // setNumberingValue('AKT1');
  }, []);


  const numberingChanged = event => {
    if (props.numbers && event.target) {
      const val = props.numbers.filter(function (item) { return item.name == event.target.value });
      let numbering = "N/A";
      if (val)
        numbering = val[0].value.map(n => n === null ? '- ' : <span className="v">{n}</span>);
      //showNumbers()
      setNumbering({ "value": numbering });
      setPropChanged(true);
      setNumberingValue(event.target.value);
    }
  };

  const classes = useStyles();

  return (
    //<div className={classes.root}>
    <div>
      <ExpansionPanel square defaultExpanded>
        <ExpansionPanelSummary className={props.viewMode? classes.hidden:''}
          //expandIcon={<ExpandMoreIcon />} 
          aria-controls="panel1d-content" id="panel1d-header">

          <StyledFormGroup row className={classes.formGroupRow}>
            <DragHandle />
            <DeleteIcon fontSize="small" onClick={props.onRemove} style={{ cursor: "pointer" }} />
            <Button size="small" variant="outlined" color="primary" className={classes.button}>
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
              {props.numbers ? props.numbers.map((item, i) => { return (<option key={i} value={item.name}>{item.name}</option>) }) : ""}


            </NativeSelect>

            <FormControlLabel
              control={<Switch size="small" id={`res-checkbox-${props.value.id}`} checked={residueChecked} value="residue" onClick={e => { e.stopPropagation(); }} onChange={toggleResidue} />}
              label="Residue" />
            <div class="weblogo">
              <fieldset>
                <legend>Mutant Type</legend>
                <FormControlLabel
                  control={<Switch size="small" id={`mutw-checkbox-${props.value.id}`} checked={mutationWeblogosChecked} value="mutationw" onClick={e => { e.stopPropagation(); }} onChange={toggleMutationWeblogos} />}
                  label="Weblogo" />
                <FormControlLabel control={<Switch lable="Barchart" size="small" id={`mutb-checkbox-${props.value.id}`} checked={mutationBarchartChecked} value="mutationb" onClick={e => { e.stopPropagation(); }} onChange={toggleMutationBarchart} />}
                  label="Barchart" />
              </fieldset>
            </div>

            <div class="weblogo">
            <fieldset>
              <legend>PTM</legend>
              <FormControlLabel
                control={<Switch size="small" id={`ptmw-checkbox-${props.value.id}`} checked={ptmWeblogosChecked} value="ptmw" onClick={e => { e.stopPropagation(); }} onChange={togglePtmWeblogos} />}
                label="Weblogo" />
              <FormControlLabel control={<Switch size="small" id={`ptmb-checkbox-${props.value.id}`} checked={ptmBarchartChecked} value="ptmb" onClick={e => { e.stopPropagation(); }} onChange={togglePtmBarchart} />}
                label="Barchart" />
            </fieldset>
            </div>
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
            {/* <img id={`weblogo-${props.value.id}`} className={residueChecked ? classes.visible: classes.hidden} src={`sequences/${props.highres?"highres":"png"}/${props.value.path}.${props.highres?"png":"png"}`} height={props.height?props.height:"188"} width={props.width ? props.width:"4857"}  /> */}
            <img id={`weblogo-${props.value.id}`} className={residueChecked ? classes.visible : classes.hidden} src={`sequences/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box>
          <Box className={mutationWeblogosChecked ? classes.visible : classes.hidden}>
            <img id={`mutationw-${props.value.id}`} src={`mutations/weblogos/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box>
          <Box className={mutationBarchartChecked ? classes.visible : classes.hidden}>
            <img id={`mutationb-${props.value.id}`} src={`mutations/barchart/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box>
          <Box className={ptmWeblogosChecked ? classes.visible : classes.hidden}>
            <img id={`ptm-${props.value.id}`} src={`ptm/weblogos/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box>
          <Box className={ptmBarchartChecked ? classes.visible : classes.hidden}>
            <img id={`ptm-${props.value.id}`} src={`ptm/barchart/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box>

          
          <div className={numberingclass}>
            {selectedNumbering ? selectedNumbering.value.map((n, index) => n === null ? <span key={`p${index}`} className="v">-</span> : <span key={`p${index}`} onClick={highlightColumn} className="v">{n}</span>) : ""}
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
function memoize() {
  return false;
}
export default KinWeblogo;
//export default React.memo(KinWeblogo,memoize);
