import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  productionTotalsFetch,
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import InformativeBox from '../../../layouts/box/informativeBox/InformativeBox';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
lifetime
yearly
montly
weekly
 */
const mapStateToProps = (state, ownProps) => ({
  dataType: 'yearly',
  lastUpdate: state.productionTotals.lastUpdate,
  value: state.productionTotals.energyYearly,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  productionTotalsFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeBox);
