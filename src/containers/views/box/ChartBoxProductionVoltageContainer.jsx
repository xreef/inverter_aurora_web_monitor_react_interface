import { connect } from 'react-redux';

import {
    inverterDailyCurrentFetch,
    inverterDailyPowerFetch,
    inverterDailyVoltageFetch
} from '../../../redux/actions';

import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';

const mapStateToProps = (state, ownProps) => ({
    data: state.inverterDailyVoltage.list,
    isFetching: state.inverterDailyVoltage.isFetching,
    day: ownProps.day,
    dataType: 'voltage'
});

const mapDispatchToProps = {
    inverterDailyFetch: inverterDailyVoltageFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);