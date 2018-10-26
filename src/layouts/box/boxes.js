import React from 'react';
import ChartBoxProductionPowerContainer from "../../containers/views/box/ChartBoxProductionPowerContainer";
import ChartBoxProductionCurrentContainer from "../../containers/views/box/ChartBoxProductionCurrentContainer";
import ChartBoxProductionVoltageContainer from "../../containers/views/box/ChartBoxProductionVoltageContainer";
import InformativeBoxLifetimeProductionContainer from "../../containers/views/box/InformativeBoxLifetimeProductionContainer";
import InformativeBoxYearlyProductionContainer from "../../containers/views/box/InformativeBoxYearlyProductionContainer";
import InformativeBoxMontlyProductionContainer from "../../containers/views/box/InformativeBoxMontlyProductionContainer";
import InformativeBoxWeeklyProductionContainer from "../../containers/views/box/InformativeBoxWeeklyProductionContainer";
import moment from "moment";

const boxes = {
    'chartBoxProductionPower': {
        additionalInfo: {
            classObj: (id, props) => {return (<ChartBoxProductionPowerContainer key={id} id={id} {...props}/>)},
            defaultProps: {
                day: moment().format('YYYYMMDD'),
                dataType: "power",
                color: 'info'
            },
            boxType: 'chartBoxProductionPower',
            color: 'info'
        },
        resize: true,
        close: true,
        minW: 2,
        maxW: 4,
        minH: 2,
        maxH: 4,
        w: 2,
        h: 2
    },
    'chartBoxProductionCurrent': {
        additionalInfo: {
            classObj: (id, props) => {return (<ChartBoxProductionCurrentContainer  key={id} id={id} {...props}/>)},
            defaultProps: {
                day: moment().format('YYYYMMDD'),
                dataType: "current",
                color: 'success'
            },
            boxType: 'chartBoxProductionCurrent',

        },
        resize: true,
        close: true,
        minW: 2,
        maxW: 4,
        minH: 2,
        maxH: 4,
        w: 2,
        h: 2
    },
    'chartBoxProductionVoltage': {
        additionalInfo: {
            classObj: (id, props) => {return (<ChartBoxProductionVoltageContainer key={id} id={id} {...props}/>)},
            defaultProps: {
                day: moment().format('YYYYMMDD'),
                dataType: "voltage",
                color: 'warning'
            },
            boxType: 'chartBoxProductionVoltage',

        },
        resize: true,
        close: true,
        minW: 2,
        maxW: 4,
        minH: 2,
        maxH: 4,
        w: 2,
        h: 2
    },
    'informativeBoxLifetimeProductionContainer': {
        additionalInfo: {
            classObj: (id, props) => {return (<InformativeBoxLifetimeProductionContainer key={id} id={id} {...props}/>)},
            defaultProps: {
                dataType: "lifetime",
                color: 'warning',
                value: 0,
                lastUpdate: null
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
        h: 1
    },
    'informativeBoxYearlyProductionContainer': {
        additionalInfo: {
            classObj: (id, props) => {return (<InformativeBoxYearlyProductionContainer key={id} id={id} {...props}/>)},
            defaultProps: {
                dataType: "lifetime",
                color: 'info',
                value: 0,
                lastUpdate: null
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
        h: 1
    },
    'informativeBoxMontlyProductionContainer': {
        additionalInfo: {
            classObj: (id, props) => {return (<InformativeBoxMontlyProductionContainer key={id} id={id} {...props}/>)},
            defaultProps: {
                dataType: "lifetime",
                color: 'rose',
                value: 0,
                lastUpdate: null
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
        h: 1
    },
    'informativeBoxWeeklyProductionContainer': {
        additionalInfo: {
            classObj: (id, props) => {return (<InformativeBoxWeeklyProductionContainer key={id} id={id} {...props}/>)},
            defaultProps: {
                dataType: "weekly",
                color: 'danger',
                value: 0,
                lastUpdate: null
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
        h: 1
    }
};

export default boxes;