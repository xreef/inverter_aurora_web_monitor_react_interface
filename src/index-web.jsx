import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intl';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules/dist/locale-data/en';
import '@formatjs/intl-pluralrules/dist/locale-data/it';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import moment from 'moment';

// Our translated strings
import localeData from './i18n/data.json';

// import dataFile from "../resources/data/esempio_dati.txt"

import './style/app.less';
import configureStore from './utils/configureStore';

import indexRoutes from './routes/index';

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
  require('@formatjs/intl-pluralrules/dist/locale-data/it'); // Add locale data for de
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for de
  require('@formatjs/intl-relativetimeformat/dist/locale-data/it'); // Add locale data for de
}


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiInput: {
      underline: {
        // '&:before': { //underline color when textfield is inactive
        //   backgroundColor: 'red',
        // },
        // '&:hover:not($disabled):before': { //underline color when hovered
        //   backgroundColor: 'green',
        // },
      }
    }
  }
});

String.prototype.toCamelCase = function () {
  return this.replace(/\b(\w)/g, (match, capture) => capture.toUpperCase()).replace(/\s+/g, '');
};

// addLocaleData([...en, ...it]);

class App extends React.Component {
  constructor(props) {
    super(props);

    // let data = dataFile;

    this.store = configureStore('aurora',
      {
        home: {
          layouts: {
            lg: [], md: [], sm: [], xs: [], xxs: [],
          },
          elements: []
        }

      },
      true);
  }

  // Change flux for correct data name
  render() {
    const language = navigator.language || navigator.userLanguage;
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
    // Try full locale, try locale without region code, fallback to 'en'
    const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.it;

    moment.locale(language);

    return (
      <Provider store={this.store}>
        <IntlProvider locale={language} messages={messages}>
          <MuiThemeProvider theme={theme}>

            <HashRouter>
              {/* <ResponsiveContainer/> */}
              <Switch>
                {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key.toString()} />)}
              </Switch>
            </HashRouter>

          </MuiThemeProvider>
        </IntlProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
