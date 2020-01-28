import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import InformativeRealtimeBox from '../../../layouts/box/informativeBox/InformativeRealtimeBox';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
lifetime
yearly
montly
weekly
 */
const mapStateToProps = (state, ownProps) => ({
  dataType: 'power',
  lastUpdate: state.realtimeData.power.lastUpdate,
  value: state.realtimeData.power.value,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeRealtimeBox);
