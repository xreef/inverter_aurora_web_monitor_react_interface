import React from 'react';
import ChartBoxProductionContainer from "../../containers/views/box/ChartBoxProductionContainer";

const boxes = {
    'chartBoxProduction': {
        i: 'chartBoxProduction',
        additionalInfo: {
            classObj: <ChartBoxProductionContainer id={'chartBoxProduction'}/>
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