import React from 'react';

// import classes from './SideDrawer.css';
import './SideDrawer.css';
import Backdrop from './Backdrop/Backdrop';
import Aux from '../../../utils/Aux';

const SideDrawer = props => {

    let openClass = "SideDrawer Open";
    let closedClass = "SideDrawer Close";

    // let attachedClasses = [classes.Sidedrawer, classes.Open];
    // if(props.open){
    //     attachedClasses = [classes.Sidedrawer, classes.Open];
    // }
    return (
        <Aux>
            {/* <Backdrop show={props.show} clicked={props.clicked}/> */}
            <div class={!props.open ? closedClass : openClass}>
                I am SideDrawer
            </div>
        </Aux>
    )
}

export default SideDrawer;