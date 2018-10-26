import { connect } from 'react-redux';

import {
    productionTotalsFetch
} from '../../../redux/actions';

import InformativeBox from "../../../layouts/box/informativeBox/InformativeBox";

/*
lifetime
yearly
montly
weekly
 */
const mapStateToProps = (state, ownProps) => ({
    dataType: 'lifetime',
    lastUpdate: state.productionTotals.lastUpdate,
    value: state.productionTotals.energyLifetime
});

const mapDispatchToProps = {
    productionTotalsFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeBox);