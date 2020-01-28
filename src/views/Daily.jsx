import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';
import boxes from '../layouts/box/boxes';

import {
  setDailyLayout
} from '../redux/actions';
import { selectors as dailySelector } from '../redux/reducers/daily';


class Daily extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: [
        // {i: guid(), ...{...boxes['tableBoxInverterAlarmsContainer']}},
        // {i: guid(), ...{...boxes['tableBoxInverterInformationContainer']}},
        // {i: guid(), ...{...boxes['chartBoxMonthly']}},
        // {i: guid(), ...{...boxes['informativeBoxLifetimeProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxYearlyProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxMontlyProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxWeeklyProductionContainer']}}
        { i: 'informativeBoxRealtimeProductionContainerId', ...{ ...boxes.informativeBoxRealtimeProductionContainer } },
        { i: 'informativeBoxDailyProductionContainerId', ...{ ...boxes.informativeBoxDailyProductionContainer } },
        { i: 'chartBoxProductionPowerId', ...{ ...boxes.chartBoxProductionPower } },
        { i: 'chartBoxProductionCurrentId', ...{ ...boxes.chartBoxProductionCurrent } },
        {
          i: 'chartBoxProductionVoltageId',
          ...{ ...boxes.chartBoxProductionVoltage },
          ...{
            additionalInfo: {
              ...boxes.chartBoxProductionVoltage.additionalInfo,
              // settingsProps: {
              //   day: '20181019',
              // },
            },
          },
        },
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

Daily.propTypes = {
  layouts: PropTypes.object,

  saveLayouts: PropTypes.func
};

Daily.defaultProps = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  },
  saveLayouts: () => console.log('Save layout')
};

const mapStateToProps = (state, ownProps) => ({
  layouts: dailySelector.layouts(state),
});

const mapDispatchToProps = {
  saveLayouts: setDailyLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(Daily);
