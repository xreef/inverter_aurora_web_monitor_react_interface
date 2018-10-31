import React from 'react';
import moment from 'moment';
import ChartBoxProductionPowerContainer from '../../containers/views/box/ChartBoxProductionPowerContainer';
import ChartBoxProductionCurrentContainer from '../../containers/views/box/ChartBoxProductionCurrentContainer';
import ChartBoxProductionVoltageContainer from '../../containers/views/box/ChartBoxProductionVoltageContainer';
import InformativeBoxLifetimeProductionContainer from '../../containers/views/box/InformativeBoxLifetimeProductionContainer';
import InformativeBoxYearlyProductionContainer from '../../containers/views/box/InformativeBoxYearlyProductionContainer';
import InformativeBoxMontlyProductionContainer from '../../containers/views/box/InformativeBoxMontlyProductionContainer';
import InformativeBoxWeeklyProductionContainer from '../../containers/views/box/InformativeBoxWeeklyProductionContainer';
import ChartBoxMonthlyContainer from '../../containers/views/box/ChartBoxMonthlyContainer';
import TableBoxInverterInformationContainer from '../../containers/views/box/TableBoxInverterInformationContainer';
import TableBoxInverterAlarmsContainer from '../../containers/views/box/TableBoxInverterAlarmsContainer';

const boxes = {
  tableBoxInverterAlarmsContainer: {
    additionalInfo: {
      classObj: (id, props) => (<TableBoxInverterAlarmsContainer key={id} id={id} {...props} />),
      defaultProps: {
        color: 'danger',
      },
      boxType: 'tableBoxInverterAlarmsContainer',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 1,
    maxH: 2,
    w: 1,
    h: 2,
  },
  tableBoxInverterInformationContainer: {
    additionalInfo: {
      classObj: (id, props) => (<TableBoxInverterInformationContainer key={id} id={id} {...props} />),
      defaultProps: {
        color: 'success',
      },
      boxType: 'tableBoxInverterInformationContainer',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 1,
    maxH: 4,
    w: 1,
    h: 4,
  },
  chartBoxMonthly: {
    additionalInfo: {
      classObj: (id, props) => (<ChartBoxMonthlyContainer key={id} id={id} {...props} />),
      defaultProps: {
        month: moment().format('YYYYMM'),
        color: 'rose',
      },
      boxType: 'chartBoxMonthly',
      color: 'info',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 2,
    maxH: 4,
    w: 2,
    h: 2,
  },
  chartBoxProductionPower: {
    additionalInfo: {
      classObj: (id, props) => (<ChartBoxProductionPowerContainer key={id} id={id} {...props} />),
      defaultProps: {
        day: moment().format('YYYYMMDD'),
        dataType: 'power',
        color: 'info',
      },
      boxType: 'chartBoxProductionPower',
      color: 'info',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 2,
    maxH: 4,
    w: 2,
    h: 2,
  },
  chartBoxProductionCurrent: {
    additionalInfo: {
      classObj: (id, props) => (<ChartBoxProductionCurrentContainer key={id} id={id} {...props} />),
      defaultProps: {
        day: moment().format('YYYYMMDD'),
        dataType: 'current',
        color: 'success',
      },
      boxType: 'chartBoxProductionCurrent',

    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 2,
    maxH: 4,
    w: 2,
    h: 2,
  },
  chartBoxProductionVoltage: {
    additionalInfo: {
      classObj: (id, props) => (<ChartBoxProductionVoltageContainer key={id} id={id} {...props} />),
      defaultProps: {
        day: moment().format('YYYYMMDD'),
        dataType: 'voltage',
        color: 'warning',
      },
      boxType: 'chartBoxProductionVoltage',

    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 2,
    maxH: 4,
    w: 2,
    h: 2,
  },
  informativeBoxLifetimeProductionContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxLifetimeProductionContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'lifetime',
        color: 'warning',
        value: 0,
        lastUpdate: null,
      },
      boxType: 'informativeBoxLifetimeProductionContainer',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 1,
    maxH: 1,
    w: 1,
    h: 1,
  },
  informativeBoxYearlyProductionContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxYearlyProductionContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'lifetime',
        color: 'info',
        value: 0,
        lastUpdate: null,
      },
      boxType: 'informativeBoxYearlyProductionContainer',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 1,
    maxH: 1,
    w: 1,
    h: 1,
  },
  informativeBoxMontlyProductionContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxMontlyProductionContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'lifetime',
        color: 'rose',
        value: 0,
        lastUpdate: null,
      },
      boxType: 'informativeBoxMontlyProductionContainer',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 1,
    maxH: 1,
    w: 1,
    h: 1,
  },
  informativeBoxWeeklyProductionContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxWeeklyProductionContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'weekly',
        color: 'danger',
        value: 0,
        lastUpdate: null,
      },
      boxType: 'informativeBoxWeeklyProductionContainer',
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 1,
    maxH: 1,
    w: 1,
    h: 1,
  },
};

export default boxes;
