import React from 'react';

import jData from "./chartExamples/data/dataOHLC.json";

import AreaChart from "./chartExamples/lib/charts/AreaChart"


const ChartExamplesContainer = () => {
    jData.map((elem)=>{
        elem.date = new Date(elem.date);
        return elem;
    });

    return (
        <div>
            <AreaChart data={jData} type="hybrid"></AreaChart>
        </div>
    );
};

export default ChartExamplesContainer;