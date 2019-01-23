import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  inverterBatteryFetch,
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterDailyBattery.list,
  isFetching: state.inverterDailyBattery.isFetching,
  day: state.inverterDailyBattery.day || ownProps.day,
  dataType: 'battery',
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  inverterDailyFetch: inverterBatteryFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);
