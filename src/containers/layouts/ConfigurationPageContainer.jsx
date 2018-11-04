import { connect } from 'react-redux';

import {
  configurationFetch
} from '../../redux/actions';

import ConfigurationPage from '../../layouts/configuration/ConfigurationPage';

const mapStateToProps = (state, ownProps) => ({
  configuration: state.configuration.data,
  isFetching: state.monthlyPowerStats.isFetching
});

const mapDispatchToProps = {
  configurationFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
