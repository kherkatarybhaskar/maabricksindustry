import React, { useState } from 'react';
import { connect } from 'react-redux';


import './Layout.css';
import Aux from '../../utils/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const SideDrawerToggleClickHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }
    return (
        <Aux>
            <Toolbar name={props.name} clicked={SideDrawerToggleClickHandler}/>
            <SideDrawer show={showSideDrawer} clicked={SideDrawerToggleClickHandler}/>
            {props.children}
            {/* This is layout page */}
        </Aux>
    )
}

const mapStateToProps = state => ({
    name:  state.auth.user.name
});
  
export default connect(mapStateToProps)(Layout);