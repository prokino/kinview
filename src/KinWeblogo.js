import React from 'react';
import { Typography} from '@material-ui/core';

function KinWeblogo(props)
{
    let out =
    <div>
        <Typography variant="h6" id="modal-title">{props.label}</Typography>
            {/* <canvas id='firstCanvas'></canvas> */}
            <img id='firstImage' src={props.src} />
    </div>
    
    return out;
            
}
export default KinWeblogo;