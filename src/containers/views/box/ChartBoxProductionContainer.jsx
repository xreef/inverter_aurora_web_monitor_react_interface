import { connect } from 'react-redux';

import {
    inverterDailyFetch
} from '../../../redux/actions';

import ChartBoxProduction from '../../../views/box/chartBox/ChartBoxProduction';

const mapStateToProps = (state, ownProps) => ({
    data: state.inverterDaily.list,
    day: state.inverterDaily.day
});

const mapDispatchToProps = {
    inverterDailyFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxProduction);