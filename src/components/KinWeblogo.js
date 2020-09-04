import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

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
import { Label, SentimentSatisfied } from '@material-ui/icons';

import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import DropDownButton from '../components/DropDownButton'
import ExpandLessOrMore from '../components/ExpandLessOrMore'
import { setSyntheticLeadingComments } from 'typescript';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
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
    //width: '1300px',
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
//todo: fix and uncomment
  // e.preventDefault();
  // let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // let rect = document.createElementNS(svg.namespaceURI, 'rect');
  // let x = e.clientX;
  // let y = e.clientY;
  // rect.setAttributeNS(null, 'x', 0);
  // rect.setAttributeNS(null, 'y', 0);
  // rect.setAttributeNS(null, 'height', e.screenY);
  // rect.setAttributeNS(null, 'width', '10');
  // rect.setAttributeNS(null, 'fill', '#ff0000');
  // rect.setAttributeNS(null, 'style', 'position:absolute;z-index:1;opacity:0.33;');

  // svg.appendChild(rect);
  // e.currentTarget.appendChild(svg);

}
function KinWeblogo(props) {
  const [selectedNumbering, setNumbering] = React.useState(props && props.numbers ? props.numbers[0] : '');
  const [selectedNumberingValue, setNumberingValue] = React.useState('');
  const [propChanged, setPropChanged] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [dropdowns, setDropdowns] = React.useState([]);


  const appname= process.env.REACT_APP_NAME;
  let settings = require(`../${appname}.settings.js`).settings;
  
  const [checkboxes, setCheckboxes] = React.useState(props.checkboxes && props.checkboxes.length>0?props.checkboxes :settings.elements.filter(x=>x.type==="checkbox"));
  useEffect(() => {
      //setCheckboxes(settings.elements.filter(x=>x.type==="checkbox"));
      // setCheckboxes(props.checkboxes);
      setDropdowns(settings.elements.filter(x=>x.type==="dropdown"));
  }, [settings.elements]);


  // const [residueChecked, setResidueChecked] = React.useState(props.residueChecked);
  // const [constraintChecked, setConstraintChecked] = React.useState(true);
  // const [positiveChecked, setPositiveChecked] = React.useState(true);
  // const [negativeChecked, setNegativeChecked] = React.useState(false);

  //if (swiches.length === 0)


  // const [mutationWeblogosChecked, setMutationWeblogosChecked] = React.useState(props.mutationWeblogosChecked);
  // const [mutationBarchartChecked, setMutationBarchartChecked] = React.useState(props.mutationBarchartChecked);
  // // const [ptmWeblogosChecked, setPtmWeblogosChecked] = React.useState(props.ptmWeblogosChecked);
  // const [ptmBarchartChecked, setPtmBarchartChecked] = React.useState(props.ptmBarchartChecked);
  const DragHandle = sortableHandle(() => <ReorderIcon />);
  const numberingclass = classNames({
    "numberingdiv": true,
    "hidden": !checkboxes.some(x => x.checked)
  });

  // function toggleVisibility(event,name)
  // {
  //   var item = checkboxes.find(x => x.name === name);
  //   if (item) 
  //     item.checked = !item.checked;
  //   setCheckboxes(checkboxes);
  // }

  // function toggleResidue(event) {
  //   setResidueChecked(prev => !prev);
  //   props.onChange(event);
  // };

  // function toggleConstraint(event) {
  //   setConstraintChecked(prev => !prev);
  //   props.onChange(event);
  // };
  // function togglePositive(event) {
  //   setPositiveChecked(prev => !prev);
  //   props.onChange(event);
  // };
  // function toggleNegative(event) {
  //   setNegativeChecked(prev => !prev);
  //   props.onChange(event);
  // };
  function toggleCheckbox(event)
  { 
    let id =event.target.value;
    let element = checkboxes.find(el => el.id === id);
    element.checked = !element.checked;
    //setResidueChecked(prev => !prev);
    props.onChange(event);
  }
  // function toggleMutationBarchart(event) {
  //   setMutationBarchartChecked(prev => !prev);
  //   props.onChange(event);
  // };
  // function toggleMutationWeblogos(event) {
  //   setMutationWeblogosChecked(prev => !prev);
  //   props.onChange(event);
  // };
  // function togglePtmWeblogos(event) {
  //   setPtmWeblogosChecked(prev => !prev);
  //   props.onChange(event);
  // };
  // function togglePtmBarchart(event) {
  //   setPtmBarchartChecked(prev => !prev);
  //   props.onChange(event);
  // }; 
  //componentDidMount

  function toggleExpanded(event) {
    setIsExpanded(!isExpanded);
  };


  
  let baseUrl = `${window.location.origin.toString()}`;
  baseUrl = baseUrl + "/" + appname;

  const numberingChanged = event => {
    if (props.numbers && event.target) {
      const val = props.numbers.filter(function (item) { return item.name === event.target.value });
      console.log(val);
      let numbering = "N/A";
      if (val)
        numbering = val[0].value.map(n => n === null ? '- ' : <span className="v">{n}</span>);
      //showNumbers()
      setNumbering({ "value": numbering });
      setPropChanged(true);
      setNumberingValue(event.target.value);
    }
  };

  function getAlignedSequences()
  {
    const val= props.value.value;
    return [{text:'Alignment', value: baseUrl + 'aligned_aln/' + val + '.aln'}, 
            {text:'Full-length seq', value:baseUrl + 'aligned_full/' + val + '.fasta'},
            {text:'Kinase domain', value:baseUrl + 'aligned_kd/' + val + '.fasta'},
            {text:'Mutation', value:baseUrl + 'aligned_mut/' + val + '.txt'},
            {text:'PTM', value:baseUrl + 'aligned_ptm/' + val + '.txt'},
          ];
  }

  function getDropdownItems(options)
  {
    const val= props.value.value;
    let items = [];
    options.forEach(option =>
      {
        items.push({text:option.name, value: `${baseUrl}${option.dir}/${val}.${option.ext}`});
      }
      );
    return items;
  }
  
  function getOrthologSequences()
  {
    const val= props.value.value;
    return [{text:'Alignment', value:baseUrl + 'ortholog_full/' + val + '.fasta'}, 
            {text:'Full-length seq', value:baseUrl + 'ortholog_kd/' + val + '.fasta'},];
  }
  

  const classes = useStyles();
  

  // let ptmb_checkbox = '';
  // if (settings.controls.includes('ptmb_checkbox'))
  //     ptmb_checkbox = <FormControlLabel
  //                     control={<Switch size="small" id={`ptmb-checkbox-${props.value.id}`} checked={ptmBarchartChecked} value="ptmb" onClick={e => { e.stopPropagation(); }} onChange={togglePtmBarchart} />}
  //                     label="PTM" />

  // let residue_checkbox = '';
  // if (settings.controls.includes('residue_checkbox'))
  // residue_checkbox = <FormControlLabel style={{marginLeft:5}}
  //             control={<Switch size="small" id={`res-checkbox-${props.value.id}`} checked={residueChecked} value="residue" onClick={e => { e.stopPropagation(); }} onChange={toggleResidue} />}
  //             label="Residue" />;

  // let weblogo_div = '';
  // if (settings.controls.includes('weblogo_div'))
  //     weblogo_div = <div className="weblogo">
  //     <fieldset>
  //       <legend>Mutant Type</legend>
  //       <FormControlLabel
  //         control={<Switch size="small" id={`mutw-checkbox-${props.value.id}`} checked={mutationWeblogosChecked} value="mutationw" onClick={e => { e.stopPropagation(); }} onChange={toggleMutationWeblogos} />}
  //         label="Weblogo" />
  //       <FormControlLabel control={<Switch lable="Barchart" size="small" id={`mutb-checkbox-${props.value.id}`} checked={mutationBarchartChecked} value="mutationb" onClick={e => { e.stopPropagation(); }} onChange={toggleMutationBarchart} />}
  //         label="Barchart" />
  //     </fieldset>
  //   </div>;

  // let aligend_seq_dropdown = '';
  // if (settings.controls.includes('aligend_seq_dropdown'))
  //     aligend_seq_dropdown = <>
  //     <Typography style={{marginLeft:15,marginRight:5}}>{appname === "kinase" ? `Aligned Sequences`:`Nr sequences`}</Typography>
  //     <DropDownButton items={getAlignedSequences()} value={props.value.aligend_seq} />
  //     </>;

  // let ortholog_seq_dropdown = '';
  // if (settings.controls.includes('ortholog_seq_dropdown'))
  //     ortholog_seq_dropdown = <>
  //     <Typography style={{marginLeft:15,marginRight:5}}>{appname === "kinase" ? `Ortholog Sequences`:`UniProt sequences`}</Typography>
  //     <DropDownButton items={getOrthologSequences()} value={props.value.ortholog_seq} />      
  //     </>;
  

let rendered_checkboxes = [];
checkboxes.forEach((element, index) => 
{
  if (element.visible) 
  {
    let checkbox = <FormControlLabel style={{marginLeft:5}} control={
    <Switch size="small" 
      id={`${element.id}-checkbox-${props.value.id}`} 
      //checked={swiches[x=>x.id === ""].visible} 
      checked={element.checked} 
      value={element.id} 
    onClick={e => { e.stopPropagation(); }} 
    onChange={toggleCheckbox} />} label={element.name} />
    rendered_checkboxes.push(checkbox);
  }
}
);

let rendered_dropdowns = [];
dropdowns.forEach((element,index) =>
{
  if (element.visible) 
  {
    let dropdown = 
        <>
          <Typography style={{marginLeft:15,marginRight:5}}>{element.name}</Typography>
          <DropDownButton items={getDropdownItems(element.options)} value={props.value.aligend_seq} />
        </>;
    rendered_dropdowns.push(dropdown);
  }
}
);
            
  return (
    //<div className={classes.root}>
    <div>
      <ExpansionPanel square expanded={isExpanded}>
        <ExpansionPanelSummary className={props.viewMode? classes.hidden:''}
          //expandIcon={<ExpandMoreIcon />} 
          aria-controls="panel1d-content" id="panel1d-header">

          <StyledFormGroup row className={classes.formGroupRow}>
            <ExpandLessOrMore isExpanded={isExpanded} onClick={toggleExpanded}  />
            <DragHandle />
            <DeleteIcon fontSize="small" onClick={props.onRemove} style={{ cursor: "pointer" }} />
            <Button size="small" variant="outlined" color="primary" className={classes.button}>
              {props.value.value}
            </Button>
            
            {/* {residue_checkbox}
            {ptmb_checkbox}
            {constraint_checkbox}
            {positive_checkbox}
            {negative_checkbox}
            {weblogo_div} */}

            {rendered_checkboxes}


            <Typography style={{marginRight:5}}>Reference Position</Typography>
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
              {/* {aligend_seq_dropdown} 
              {ortholog_seq_dropdown} */}
              {rendered_dropdowns}
          </StyledFormGroup>

        </ExpansionPanelSummary>
        
        <ExpansionPanelDetails className={classes.details}>
          {checkboxes.map(element => 
             <div>
               <Box>
                  <img
                    alt={element.name}
                    id={`${element.name}-${props.value.id}`}
                    // className={ residueChecked ? classes.visible : classes.hidden}
                    className={ element.checked? classes.visible : classes.hidden}
                    src={`${appname}/${element.dirpath}/${props.value.path}.${element.extention}`}
                    height={props.height || "188"}
                    width={props.width || "4840"}
                    ></img>
                </Box>
              </div>
            )}
        
          
          {/* <Box className={mutationWeblogosChecked ? classes.visible : classes.hidden}>
            <img alt="mutation weblogo" id={`mutationw-${props.value.id}`} src={`${appname}/mutations/weblogos/png/${props.value.path}.png`} height={props.height || "188"} width={props.width ? props.width : "4840"} />
          </Box>
          <Box className={ptmBarchartChecked ? classes.visible : classes.hidden}>
            <img alt="ptm" id={`ptm-${props.value.id}`} src={`${appname}/ptm/barchart/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box>
          <Box className={mutationBarchartChecked ? classes.visible : classes.hidden}>
            <img alt="mutation barchart" id={`mutationb-${props.value.id}`} src={`${appname}/mutations/barchart/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box> */}
          {/* <Box className={ptmWeblogosChecked ? classes.visible : classes.hidden}>
            <img id={`ptm-${props.value.id}`} src={`ptm/weblogos/png/${props.value.path}.png`} height={props.height ? props.height : "188"} width={props.width ? props.width : "4840"} />
          </Box> */}
   
          <div className={numberingclass} style={{marginLeft: settings.ui.numberingMarginLeft, marginTop: settings.ui.numberingMarginTop}}>
            {selectedNumbering ? selectedNumbering.value.map(
              (n, index) => 
               <span key={`p${index}`} onClick={highlightColumn} style={{minWidth:`${settings.ui.numberingMinWidth}`, writingMode:"vertical-lr"}}>{n === null ? "-" : n}</span>) : ""}
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
