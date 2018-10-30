import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveGrid from "../component/responsiveGrid/ResponsiveGrid";
import guid from "../utils/math/guid";
import boxes from "../layouts/box/boxes";

class InverterInfoState extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newElements: [
                {i: guid(), ...{...boxes['tableBoxInverterAlarmsContainer']}},
                {i: guid(), ...{...boxes['tableBoxInverterInformationContainer']}}
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
            ]
        }

    }

    render() {
        return <ResponsiveGrid newElements={[...this.state.newElements]} layouts={{lg: [], md: [], sm: [], xs: [], xxs: []}}/>
    }
}

InverterInfoState.propTypes = {

};

export default InverterInfoState;