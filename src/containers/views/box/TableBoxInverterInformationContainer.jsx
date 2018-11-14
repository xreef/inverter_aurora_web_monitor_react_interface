import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  inverterInfoFetch,
  addElementToHome,
  removeElementFromHome, inverterAlarmsFetch
} from '../../../redux/actions';

import TableBoxInverterInformation from '../../../layouts/box/tableBox/TableBoxInverterInformation';
const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterInfo.data,
  isFetching: state.inverterInfo.isFetching,
  lastUpdate: state.inverterInfo.lastUpdate,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  inverterInfoFetch,
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBoxInverterInformation);
