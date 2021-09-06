import React from 'react';

import classes from './Backdrop.css';

const Backdrop = props => {
    return (
        <div>
            {props.show ? <div class={classes.Backdrop} onClick={props.clicked}></div> : null}
        </div>
    )
}

export default Backdrop;