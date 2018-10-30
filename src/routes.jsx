import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, About } from './views';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        {/*<Route path="/grid_showcase" component={GridShowCaseContainer} />*/}
        {/*<Route path="/chart_examples" component={ChartExamplesContainer} />*/}
    </Switch>
);

export default Routes;