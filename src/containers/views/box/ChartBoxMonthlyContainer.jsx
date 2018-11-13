import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  monthlyPowerStatsFetch,
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import ChartBoxMonthly from '../../../layouts/box/chartBox/ChartBoxMonthly';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  data: state.monthlyPowerStats.list.map((elem) => { elem.val = elem.pow || 0; return elem; }),
  isFetching: state.monthlyPowerStats.isFetching,
  month: ownProps.month,
  lastUpdate: state.monthlyPowerStats.lastUpdate,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  monthlyPowerStatsFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxMonthly);
