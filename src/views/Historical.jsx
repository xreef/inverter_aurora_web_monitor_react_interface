import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';
import guid from '../utils/math/guid';
import boxes from '../layouts/box/boxes';

import {
  setDailyLayout,
  setHistoricalLayout
} from '../redux/actions';
import { selectors as historicalSelector } from '../redux/reducers/historical';
import { selectors as dailySelector } from '../redux/reducers/daily';

class Historical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [
        // {i: guid(), ...{...boxes['tableBoxInverterAlarmsContainer']}},
        // {i: guid(), ...{...boxes['tableBoxInverterInformationContainer']}},
        { i: 'chartBoxMonthlyId', ...{ ...boxes.chartBoxMonthly } },
        { i: 'informativeBoxLifetimeProductionContainerId', ...{ ...boxes.informativeBoxLifetimeProductionContainer } },
        { i: 'informativeBoxYearlyProductionContainerId', ...{ ...boxes.informativeBoxYearlyProductionContainer } },
        { i: 'informativeBoxMontlyProductionContainerId', ...{ ...boxes.informativeBoxMontlyProductionContainer } },
        { i: 'informativeBoxWeeklyProductionContainerId', ...{ ...boxes.informativeBoxWeeklyProductionContainer } },
        // {i: guid(), ...{...boxes['chartBoxProductionPower']}}
        // ,{i: guid(), ...{...boxes['chartBoxProductionCurrent']}}
        // ,{i: guid(), ...{...boxes['chartBoxProductionVoltage']},
        // ...{additionalInfo: {...boxes['chartBoxProductionVoltage'].additionalInfo,
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

Historical.propTypes = {
  layouts: PropTypes.object,

  saveLayouts: PropTypes.func
};

Historical.defaultProps = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  },
  saveLayouts: () => console.log('Save layout')
};

const mapStateToProps = (state, ownProps) => ({
  layouts: historicalSelector.layouts(state),
});

const mapDispatchToProps = {
  saveLayouts: setHistoricalLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(Historical);
