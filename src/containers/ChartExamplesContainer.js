import React from 'react';

import jData from "./chartExamples/data/dataOHLC.json";

import AreaChart from "./chartExamples/lib/charts/AreaChart"

import { csvParse } from "d3-dsv"
import testData from "../../resources/data/20180925.CSV";

import moment from "moment";



const ChartExamplesContainer = () => {
    var csvFile = csvParse(testData, (elem)=>{
        let date = moment("20180925"+elem.ora, "YYYYMMDDkkmm");
        let wattParsed = parseFloat(elem.watt);
        elem.date = date;
        elem.wattParsed = wattParsed;
        return elem;
    });
    // jData.map((elem)=>{
    //     elem.date = new Date(elem.date);
    //     return elem;
    // });

    csvFile.columns = undefined;

    return (
        <div>
            <AreaChart data={csvFile} type="hybrid"></AreaChart>
        </div>
    );
};

export default ChartExamplesContainer;