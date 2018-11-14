import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';
import guid from '../utils/math/guid';
import boxes from '../layouts/box/boxes';

import {
  setInverterInfoStateLayout
} from '../redux/actions';
import { selectors as inverterInfoStateSelector } from '../redux/reducers/inverterInfoState';
import connect from 'react-redux/es/connect/connect';

class InverterInfoState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [
        { i: 'tableBoxInverterAlarmsContainerId', ...{ ...boxes.tableBoxInverterAlarmsContainer } },
        { i: 'tableBoxInverterInformationContainerId', ...{ ...boxes.tableBoxInverterInformationContainer } },
        // {i: guid(), ...{...boxes['chartBoxMonthly']}},
        // {i: guid(), ...{...boxes['informativeBoxLifetimeProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxYearlyProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxMontlyProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxWeeklyProductionContainer']}}
        // {i: guid(), ...{...boxes['chartBoxProductionPower']}}
        // ,{i: guid(), ...{...boxes['chartBoxProductionCurrent']}}
        // ,{i: guid(), ...{...boxes['chartBoxProductionVoltage']}, ...{additionalInfo: {...boxes['chartBoxProductionVoltage'].additionalInfo,
        //             settingsProps: {
        //                 day: "20181019"
        //             }
        //         }}}
      ],
    };
  }

  render() {
    const { layouts, saveLayouts } = this.props;

    return (
      <ResponsiveGrid
        elements={[...this.state.elements]}
        layouts={layouts}
        showSaveLayoutsButton
        saveLayouts={saveLayouts}
      />
    );
  }
}

InverterInfoState.propTypes = {
  layouts: PropTypes.object,

  saveLayouts: PropTypes.func
};

InverterInfoState.defaultProps = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  },
  saveLayouts: () => console.log('Save layout')
};

const mapStateToProps = (state, ownProps) => ({
  layouts: inverterInfoStateSelector.layouts(state),
});

const mapDispatchToProps = {
  saveLayouts: setInverterInfoStateLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(InverterInfoState);
