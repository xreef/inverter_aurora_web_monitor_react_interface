import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  inverterAlarmsFetch,
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

import TableBoxInverterStatus from '../../../layouts/box/tableBox/TableBoxInverterStatus';
const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterAlarms.data,
  isFetching: state.inverterAlarms.isFetching,
  lastUpdate: state.inverterAlarms.lastUpdate,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  inverterAlarmsFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBoxInverterStatus);
