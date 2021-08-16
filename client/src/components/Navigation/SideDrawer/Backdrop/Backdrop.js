import React from 'react';

import './Backdrop.css';

const Backdrop = props => {
    return (
        <div>
            {props.show ? <div class="Backdrop" onClick={props.clicked}></div> : null}
        </div>
    )
}

export default Backdrop;