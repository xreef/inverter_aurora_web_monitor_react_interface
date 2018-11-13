import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  inverterDailyPowerFetch,
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterDailyPower.list,
  isFetching: state.inverterDailyPower.isFetching,
  day: state.inverterDailyPower.day || ownProps.day,
  dataType: 'power',
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  inverterDailyFetch: inverterDailyPowerFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);
