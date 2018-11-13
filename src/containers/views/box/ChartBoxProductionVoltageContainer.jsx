import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  inverterDailyVoltageFetch,
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterDailyVoltage.list,
  isFetching: state.inverterDailyVoltage.isFetching,
  day: state.inverterDailyVoltage.day || ownProps.day,
  dataType: 'voltage',
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  inverterDailyFetch: inverterDailyVoltageFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);
