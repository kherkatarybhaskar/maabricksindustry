import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const SideDrawerToggleClickHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }
    return (
        <div className={classes.Layout}>
            <Toolbar name={props.name} clicked={SideDrawerToggleClickHandler}/>
            <SideDrawer show={showSideDrawer} clicked={SideDrawerToggleClickHandler} />
            <div className={classes.Main}>
                {props.children}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    name:  state.auth.user.name
});
  
export default connect(mapStateToProps)(Layout);