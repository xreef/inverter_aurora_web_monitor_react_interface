import { connect } from 'react-redux';

import {
  inverterInfoFetch
} from '../../../redux/actions';

import TableBoxInverterInformation from '../../../layouts/box/tableBox/TableBoxInverterInformation';

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterInfo.data,
  isFetching: state.inverterInfo.isFetching,
  lastUpdate: state.inverterInfo.lastUpdate
});

const mapDispatchToProps = {
  inverterInfoFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBoxInverterInformation);
