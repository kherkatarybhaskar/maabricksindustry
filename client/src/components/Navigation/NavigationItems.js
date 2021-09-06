import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../action/auth';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.clicked} link="/sales" >Sales</NavigationItem>
        <NavigationItem clicked={props.clicked} link="/carrier" >Cycle Party</NavigationItem>
        {/* <NavigationItem clicked={props.clicked} link="/sales" >Sales</NavigationItem> */}
        <NavigationItem clicked={props.clicked} link="/cook" >Pather</NavigationItem>
        <NavigationItem clicked={props.clicked} link="/material" >Material</NavigationItem>
        <div className={classes.LogoutButton}>
            <button onClick={props.logout}>Log Out</button>
        </div>
    </ul>
);
NavigationItems.propTypes = {
    logout: PropTypes.func.isRequired,
};
export default connect(null,{ logout })(NavigationItems);
