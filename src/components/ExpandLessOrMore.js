import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ExpandLessOrMore(props) {
    if (props.isExpanded)
        return (<ExpandLessIcon onClick={props.onClick} />);
    else
        return (<ExpandMoreIcon onClick={props.onClick} />);
}
export default ExpandLessOrMore;