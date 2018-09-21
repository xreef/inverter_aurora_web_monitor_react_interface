import React from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";
import { Provider } from 'react-redux';

import 'intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import it from 'react-intl/locale-data/it';

// Our translated strings
import localeData from './i18n/data.json';

addLocaleData([...en, ...it]);

import dataFile from "../resources/data/esempio_dati.txt"

import "./style/app.less";
import configureStore from "./utils/configureStore";

import Container from './container';

class App extends React.Component {
    constructor(props) {
        super(props);

        let data = dataFile;

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
                        <Container>c</Container>
                    </IntlProvider>
                </Provider>
    };
}

ReactDOM.render(<App/>, document.getElementById('container'));