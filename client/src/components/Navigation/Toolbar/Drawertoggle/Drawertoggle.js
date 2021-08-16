import React from 'react';

import  './Drawertoggle.css';


const DrawerToggle = props => {
    return (
        <div class="DrawerToggle" onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle;