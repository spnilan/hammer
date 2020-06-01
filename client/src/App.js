import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes'

import Navbar from './components/layout/Navbar';

// Redux
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import { Provider } from 'react-redux';
import store from './store';


import './App.css';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'))
}


const App = () => {


  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(open => !open)
  }


  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
  <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar/>
      <Switch>
        <Route component={Routes} />
      </Switch>
    </Fragment>
  </Router>
  </Provider>

)};

export default App;
