import React from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";
import { Provider } from 'react-redux';

import 'intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import it from 'react-intl/locale-data/it';

String.prototype.toCamelCase = function() {
    return this.replace(/\b(\w)/g, function(match, capture) {
        return capture.toUpperCase();
    }).replace(/\s+/g, '');
};

// Our translated strings
import localeData from './i18n/data.json';

addLocaleData([...en, ...it]);

// import dataFile from "../resources/data/esempio_dati.txt"

import "./style/app.less";
import configureStore from "./utils/configureStore";

import ResponsiveContainer from './container';
import {HashRouter, Switch, Route} from "react-router-dom";

import indexRoutes from "./routes/index.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);

        // let data = dataFile;

        this.store = configureStore('aurora', {}, true);
    }

    // Change flux for correct data name
    render(){
        let language =  navigator.language || navigator.userLanguage;
        const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
        // Try full locale, try locale without region code, fallback to 'en'
        const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.it;

        return <Provider store={this.store}>
                    <IntlProvider locale={language} messages={messages}>
                        <HashRouter>
                            {/*<ResponsiveContainer/>*/}
                            <Switch>
                                {indexRoutes.map((prop, key) => {
                                    return <Route path={prop.path} component={prop.component} key={key} />;
                                })}
                            </Switch>
                        </HashRouter>
                    </IntlProvider>
                </Provider>

    };
}

ReactDOM.render(<App/>, document.getElementById('container'));