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
    dataType: 'yearly',
    lastUpdate: state.productionTotals.lastUpdate,
    value: state.productionTotals.energyYearly
});

const mapDispatchToProps = {
    productionTotalsFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeBox);