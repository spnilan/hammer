import React from 'react'
import { Route, Switch } from 'react-router-dom';


import Login from '../auth/Login';
import Alert from '../layout/Alert';

import Dashboard from '../quest/Dashboard';
import QuestMap from '../quest/QuestMap';
import QuestPage from '../quest/QuestPage';
import ARTest from '../quest/ARTest'
import About from '../layout/About';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';



const Routes = () => {
    return (
        <div className="container-fluid">
        <Alert />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path='/test' component={ARTest} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path="/quest/:questId" component={QuestMap} />
          <PrivateRoute exact path="/quest/:questId/:pageId" component={QuestPage} />
          <PrivateRoute exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
}

export default Routes
