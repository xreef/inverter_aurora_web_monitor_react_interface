import React from 'react';
import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';
import guid from '../utils/math/guid';
import boxes from '../layouts/box/boxes';

class Historical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [
        // {i: guid(), ...{...boxes['tableBoxInverterAlarmsContainer']}},
        // {i: guid(), ...{...boxes['tableBoxInverterInformationContainer']}},
        { i: guid(), ...{ ...boxes.chartBoxMonthly } },
        { i: guid(), ...{ ...boxes.informativeBoxLifetimeProductionContainer } },
        { i: guid(), ...{ ...boxes.informativeBoxYearlyProductionContainer } },
        { i: guid(), ...{ ...boxes.informativeBoxMontlyProductionContainer } },
        { i: guid(), ...{ ...boxes.informativeBoxWeeklyProductionContainer } },
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
    return (
      <ResponsiveGrid
        elements={[...this.state.elements]}
        layouts={{
          lg: [], md: [], sm: [], xs: [], xxs: [],
        }}
      />
    );
  }
}

Historical.propTypes = {

};

export default Historical;
