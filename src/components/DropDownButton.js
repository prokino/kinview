import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SaveIcon from '@material-ui/icons/Save';

export default function DropDownButton(props) {
    function clicked(item,popupState,e)
    {
        let path =  item.value;
        setTimeout(() => {
          const response = {
            file: path,
          };
          //window.location.href = response.file;
          window.open(response.file);
        }, 100);
        popupState.close();
    }
  
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
        <Button {...bindTrigger(popupState)} variant="outlined" color="primary" size="small" startIcon={<SaveIcon />}>
            {props.value}
        </Button>
        <Menu {...bindMenu(popupState)}>
          {
            props.items.map((item, index) =>
              <MenuItem onClick={(e) => clicked(item, popupState, e)} key={index} value={item.value}>{item.text}</MenuItem>)
          }
        </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}