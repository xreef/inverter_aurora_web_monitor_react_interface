import { connect } from 'react-redux';

import {
    inverterDailyCurrentFetch,
    inverterDailyPowerFetch,
    inverterDailyVoltageFetch
} from '../../../redux/actions';

import ChartBoxProduction from '../../../views/box/chartBox/ChartBoxProduction';
import InformativeBox from "../../../views/box/informativeBox/InformativeBox";

const mapStateToProps = (state, ownProps) => ({
    dataType: 'totalProduction'
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeBox);