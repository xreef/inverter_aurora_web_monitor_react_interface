import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

import React from "react";
import ReactDOM from "react-dom";

import Chart from "./lib/charts/CandleStickChartWithDarkTheme";
// import Chart from "./lib/charts/OHLCChartWithElderRayIndicator";

const ReadME = "README";

import "./stylesheets/re-stock.less";

document.getElementById("content").innerHTML = ReadME;

const parseDate = timeParse("%Y-%m-%d");

class ChartExamples extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: null
		}
	}

	render(){
        fetch("data/MSFT.tsv")
            .then(response => response.text())
            .then(data => tsvParse(data, d => {
                d.date = new Date(parseDate(d.date).getTime());
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;

                return d;
            }))
            .then(data => {
                this.setState({data: data});
            });
        if (this.state.data) {
            return <Chart data={this.data} type="hybrid"/>;
        }else{
			return <div>Niente</div>;
		}
	}
}
export default ChartExamples;
