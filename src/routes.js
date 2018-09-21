import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, About } from './containers';
import GridShowCaseContainer from "./containers/GridShowCaseContainer";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/grid_showcase" component={GridShowCaseContainer} />
    </Switch>
);

export default Routes;