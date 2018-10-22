import React from 'react';
import ChartBoxProductionPowerContainer from "../../containers/views/box/ChartBoxProductionPowerContainer";
import ChartBoxProductionCurrentContainer from "../../containers/views/box/ChartBoxProductionCurrentContainer";
import ChartBoxProductionVoltageContainer from "../../containers/views/box/ChartBoxProductionVoltageContainer";
import InformativeBoxTotalProductionContainer from "../../containers/views/box/InformativeBoxTotalProductionContainer";
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
    'informativeBoxTotalProductionContainer': {
        additionalInfo: {
            classObj: (id, props) => {return (<InformativeBoxTotalProductionContainer key={id} id={id} {...props}/>)},
            defaultProps: {
                dataType: "totalProduction",
                color: 'warning'
            },
            boxType: 'informativeBoxTotalProductionContainer',

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