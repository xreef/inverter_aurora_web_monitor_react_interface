import { connect } from 'react-redux';

import {
  inverterDailyCurrentFetch,
  inverterDailyPowerFetch,
  inverterDailyVoltageFetch,
} from '../../../redux/actions';

import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterDailyPower.list,
  isFetching: state.inverterDailyPower.isFetching,
  day: state.inverterDailyPower.day || ownProps.day,
  dataType: 'power',
});

const mapDispatchToProps = {
  inverterDailyFetch: inverterDailyPowerFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);
