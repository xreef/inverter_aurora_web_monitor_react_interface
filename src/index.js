import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import it from 'react-intl/locale-data/it';

// Our translated strings
import localeData from './i18n/data.json';

// import dataFile from "../resources/data/esempio_dati.txt"

import './style/app.less';
import configureStore from './utils/configureStore';

import { HashRouter, Switch, Route } from 'react-router-dom';

import indexRoutes from './routes/index.jsx';

String.prototype.toCamelCase = function () {
  return this.replace(/\b(\w)/g, (match, capture) => capture.toUpperCase()).replace(/\s+/g, '');
};

addLocaleData([...en, ...it]);

class App extends React.Component {
  constructor(props) {
    super(props);

    // let data = dataFile;

    this.store = configureStore('aurora', {}, true);
  }

  // Change flux for correct data name
  render() {
    const language = navigator.language || navigator.userLanguage;
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
    // Try full locale, try locale without region code, fallback to 'en'
    const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.it;

    return (
      <Provider store={this.store}>
        <IntlProvider locale={language} messages={messages}>
          <HashRouter>
            {/* <ResponsiveContainer/> */}
            <Switch>
              {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key} />)}
            </Switch>
          </HashRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
