import { connect } from 'react-redux';

import {
    inverterDailyCurrentFetch,
    inverterDailyPowerFetch,
    inverterDailyVoltageFetch
} from '../../../redux/actions';

import ChartBoxProduction from '../../../views/box/chartBox/ChartBoxProduction';

const mapStateToProps = (state, ownProps) => ({
    data: state.inverterDailyCurrent.list,
    day: ownProps.day,
    dataType: 'current'
});

const mapDispatchToProps = {
    inverterDailyFetch: inverterDailyCurrentFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);