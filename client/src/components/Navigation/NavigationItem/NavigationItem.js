import React from 'react';
import {NavLink} from 'react-router-dom';


import classes from './NavigationItem.css';

const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* <a
            href={props.link}
            className={props.active ? classes.active : null}>{props.children}</a> */}

        <NavLink
            to={props.link}
            exact={props.exact}
            // activeClassName={classes.active}
            onClick={props.clicked}>
                {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;
