import React from 'react'

import classes from './Toolbar.css';
import Drawertoggle from './Drawertoggle/Drawertoggle';

const Toolbar = props => {
    return (
        <div className={classes.Toolbar}>
            <Drawertoggle clicked={props.clicked}/>
            {props.name}
        </div>
    )
}

export default Toolbar;