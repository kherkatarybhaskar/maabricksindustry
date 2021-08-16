import React from 'react'

import './Toolbar.css';
import Drawertoggle from './Drawertoggle/Drawertoggle';

const Toolbar = props => {
    return (
        <div class="Toolbar">
            <Drawertoggle clicked={props.clicked}/>
            {props.name}
        </div>
    )
}

export default Toolbar;