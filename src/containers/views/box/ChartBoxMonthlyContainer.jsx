import { connect } from 'react-redux';

import {
    monthlyPowerStatsFetch
} from '../../../redux/actions';

import ChartBoxMonthly from '../../../layouts/box/chartBox/ChartBoxMonthly';

const mapStateToProps = (state, ownProps) => ({
    data: state.monthlyPowerStats.list.map(elem => { elem.val = elem.pow || 0; return elem}),
    isFetching: state.monthlyPowerStats.isFetching,
    month: ownProps.month,
    lastUpdate: state.monthlyPowerStats.lastUpdate
});

const mapDispatchToProps = {
    inverterDailyFetch: monthlyPowerStatsFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxMonthly);