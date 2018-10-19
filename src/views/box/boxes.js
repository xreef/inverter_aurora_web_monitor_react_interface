import React from 'react';
import ChartBoxProductionPowerContainer from "../../containers/views/box/ChartBoxProductionPowerContainer";
import ChartBoxProductionCurrentContainer from "../../containers/views/box/ChartBoxProductionCurrentContainer";
import ChartBoxProductionVoltageContainer from "../../containers/views/box/ChartBoxProductionVoltageContainer";
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
        minH: 1,
        maxH: 2,
        w: 2,
        h: 1
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
        minH: 1,
        maxH: 2,
        w: 4,
        h: 1
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
        minH: 1,
        maxH: 2,
        w: 2,
        h: 1
    }
};

export default boxes;