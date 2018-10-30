import { connect } from 'react-redux';

import {
  inverterDailyCurrentFetch,
  inverterDailyPowerFetch,
  inverterDailyVoltageFetch,
} from '../../../redux/actions';

import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';

const mapStateToProps = (state, ownProps) => ({
  data: state.inverterDailyCurrent.list,
  isFetching: state.inverterDailyCurrent.isFetching,
  day: state.inverterDailyCurrent.day || ownProps.day,
  dataType: 'current',
});

const mapDispatchToProps = {
  inverterDailyFetch: inverterDailyCurrentFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);
