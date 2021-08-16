import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.css';
import Login from './components/Pages/Login/Login';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './action/auth';
import Layout from './components/Layout/Layout';
import Sales from './components/Pages/Sales/Sales';
import Aux from './utils/Aux';

const  App = (props) => {

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  },[props.isAuthenticated]);


  let app = (
        <Layout>
          <Switch>
            <Route path='/' exact render={(props) => <Sales {...props}/>} />
            <Route path='/sales' exact render={(props) => <Sales {...props}/>} />
            <Redirect to='/'/>
          </Switch>
        </Layout>
  );
  return (
        <Aux>
          {props.isAuthenticated ? app : <Login/>}
        </Aux>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(App));
