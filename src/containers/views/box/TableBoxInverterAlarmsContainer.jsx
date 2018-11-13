import { connect } from 'react-redux';

import {
  inverterAlarmsFetch
} from '../../../redux/actions';

import TableBoxInverterStatus from '../../../layouts/box/tableBox/TableBoxInverterStatus';

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterAlarms.data,
  isFetching: state.inverterAlarms.isFetching,
  lastUpdate: state.inverterAlarms.lastUpdate
});

const mapDispatchToProps = {
  inverterAlarmsFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBoxInverterStatus);
