import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  inverterDailyCurrentFetch,
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterDailyCurrent.list,
  isFetching: state.inverterDailyCurrent.isFetching,
  day: state.inverterDailyCurrent.day || ownProps.day,
  dataType: 'current',
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  inverterDailyFetch: inverterDailyCurrentFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);
