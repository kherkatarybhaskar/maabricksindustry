import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login, logout } from '../../../action/auth';
import classes from './Login.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Login = ({ login, logout, isAuthenticated }) => {
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const visibilityShowHandler = () => {
        setShow(!show);
    }
    const phoneInputChangedHandler = (event) => {
        setPhone(event.target.value);
    }
    const passwordInputChangedHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        login(phone, password);
        // console.log('Phone : ', phone);
    }
    // const logoutHandler = (event) => {
    //     event.preventDefault();
    // }

    return (
        <div>
            <div className={classes.LoginCard}>
                <form 
                    className={classes.FormCard} 
                    onSubmit={submitHandler}
                >
                    <label>Phone Number</label>
                    <div className={classes.InputGroup}>
                        <AccountCircleIcon className={classes.Icon}/>
                        <input 
                            placeholder="Enter your phone number"
                            onChange={phoneInputChangedHandler}
                            value={phone}
                            className={classes.LoginInput}/>
                    </div>
                    <label>Password</label>
                    <div className={classes.InputGroup}>
                        <LockIcon className={classes.Icon}/>
                        {!show ?
                            <input 
                            placeholder="Enter your password"
                            onChange={passwordInputChangedHandler}
                            value={password}
                            type="password"
                            className={classes.LoginInput}/>
                            :
                            <input 
                            placeholder="Enter your password"
                            onChange={passwordInputChangedHandler}
                            value={password}
                            className={classes.LoginInput}/>
                        }
                        <div className={classes.Icon} onClick={visibilityShowHandler}>
                            {show ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </div>   
                    </div>
                    <div className={classes.SubmitButtonGroup}>
                        <input className={classes.SubmitButton} type="submit" value="Log In"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};
  
const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated:  state.auth.isAuthenticated
});
  
export default connect(mapStateToProps, { login, logout })(Login);
