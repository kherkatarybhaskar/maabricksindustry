import React from 'react';

import classes from './SideDrawer.css';
import Backdrop from './Backdrop/Backdrop';
import Aux from '../../../utils/Aux';
import NavigationItems from '../NavigationItems';

const SideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <NavigationItems clicked={props.clicked}/>
            </div>
        </Aux>
    )
}
export default SideDrawer;