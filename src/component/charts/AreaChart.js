
import React from "react";
import PropTypes from "prop-types";
import { formatDefaultLocale, format } from "d3-format";
import { timeFormatDefaultLocale, timeFormat } from "d3-time-format";
import D3DateTimeLocales from "../../utils/locale/D3DateTimeLocales";
import D3NumberLocales from "../../utils/locale/D3NumberLocales";
import { last, first } from "react-stockcharts/lib/utils";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";

import { ChartCanvas, Chart } from "react-stockcharts";
import CustomAreaSeries from "./series/CustomAreaSeries";

import { EdgeIndicator, CurrentCoordinate } from "react-stockcharts/lib/coordinates";

import CustomImage from './annotation/CustomImage'
import {Annotate} from "react-stockcharts/lib/annotation";


import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

import fitDimensionsBox from "./utils/fitDimensionsBox";

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

import * as grad from '../../component/style/material-dashboard-react'

class AreaChart extends React.Component {
	constructor(props){
		super(props);
		this.scaleFormat = {
            yearFormat: "%Y",
                quarterFormat: "%b %Y",
                monthFormat: "%b",
                weekFormat: "%d %b",
                dayFormat: "%a %d",
                hourFormat: "%Hh",
                minuteFormat: "%H:%M",
                secondFormat: "%H:%M:%S",
                milliSecondFormat: "%L"
        };

        this.d3DTLocales = new D3DateTimeLocales();
        let d3Locales = new D3NumberLocales();
        timeFormatDefaultLocale( this.d3DTLocales.getDateTimeLocale('it'));
        formatDefaultLocale(d3Locales.getDateTimeLocale('it'));

        let {color} = props;
debugger
        this.config = {
            line:{
                strokeWidth: 1,
                    hoverStrokeWidth: 4,
                    stroke: {
                        up:     grad[color+'Gradient'].up  ,
						down:   grad[color+'Gradient'].down
					},
                strokeFlat: '#ffffff',
                    strokeDasharray: "Solid",
                    hoverTolerance: 6,
                    highlightOnHover: false,
                    connectNulls: false
            },
            currentCoordinate: {
                currentCoordinateActive: false,
                    currentCoordinateColor: '#ff0100'
            },
            area:{
                fill: {
                    up:         grad[color+'Gradient'].up  ,
                    middleUp:   grad[color+'Gradient'].up  ,
                    middleDown: grad[color+'Gradient'].down,
                    down:       grad[color+'Gradient'].down
                },
                opacity: {
                    up:     0.2,
                        middleUp: 0.8,
                        middleDown: 0.8,
                        down:   0.2
                },
                textureImageSrc: 'resources/images/textures/pattern_type1_inverted_4x4_opacity100.png'
                // textureImageSrc: 'resources/images/pattern_type1_inverted_4x4_opacity100.png'
            },
            edgeIndicator: {
                textFormat: ".3f",
                    type: "horizontal",
                    orient: "left",
                    edgeAt: "left",
                    textFill: "#FFFFFF",
                    // displayFormat: format(".2f"),
                    yAxisPad: 0,
                    rectHeight: 20,
                    rectWidth: 50,
                    arrowWidth: 10,
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    fontSize: 13,
                    dx: 0,
                    hideLine: false,
                    fill: "#ff0000",
                    opacity: 1,
                    lineStroke: "#000000",
                    lineOpacity: 0.3,
                    itemType:"last"
            },
                showMinValueOnChart: {
            image: "circleSonarRed",
                width: 20,
                height: 20,
                onClick: console.log.bind(console),
                y: ({ yScale, datum }) => yScale(datum.val),
                tooltip: "Valore minimo"
        },
            showMaxValueOnChart: {
                image: "circleSonarGreen",
                    width: 20,
                    height: 20,
                    onClick: console.log.bind(console),
                    y: ({ yScale, datum }) => yScale(datum.val),
                    tooltip: "Valore massimo"
            }
        };

        var {stroke, ...other} = this.config.line;
        this.lineConfig = other;
        this.stroke = stroke;

        var {fill, ...other} = this.config.area;
        this.areaConfig = other;
        this.fill = fill;

        var {textFormat, ...other} = this.config.edgeIndicator;
        this.edgeIndicator = other;
        this.edgeTextFormat = textFormat;

        let {currentCoordinateActive, currentCoordinateColor} = this.config.currentCoordinate;
        this.currentCoordinate = currentCoordinateActive;

        if (currentCoordinateColor){
            this.currentCoordinateColor = currentCoordinateColor;
        }

        this.showMinValueOnChart = this.config.showMinValueOnChart;
        this.showMaxValueOnChart = this.config.showMaxValueOnChart;
    }
	render() {
		const { data: initialData, type, width, ratio, height } = this.props;
        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
        xScaleProvider.setLocale(this.d3DTLocales.getDateTimeLocale('it'), this.scaleFormat);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(initialData);

        const start = xAccessor(last(data));
        const end = xAccessor(first(data));

        const xExtents = [start, end];		return (
			<ChartCanvas ratio={ratio} width={width-20} height={height}
				margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
				seriesName="MSFT"
				data={data} type={type}
				 xScale={xScale}
				 xAccessor={xAccessor}
				 displayXAccessor={displayXAccessor}
				 xExtents={xExtents}
			>
				<Chart id={0} yExtents={d => d.val}>
					{/*<defs>*/}
						{/*<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">*/}
							{/*<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />*/}
							{/*<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />*/}
							{/*<stop offset="100%"  stopColor="#4286f4" stopOpacity={0.8} />*/}
						{/*</linearGradient>*/}
					{/*</defs>*/}
					<XAxis axisAt="bottom" orient="bottom" ticks={6} />
					<YAxis axisAt="left" orient="left"  />
					{/*<AreaSeries*/}
						{/*yAccessor={d => d.val}*/}
						{/*fill="url(#MyGradient)"*/}
						{/*strokeWidth={2}*/}
						{/*interpolation={curveMonotoneX}*/}
						{/*canvasGradient={canvasGradient}*/}
					{/*/>*/}
                    <CustomAreaSeries key={'lsCAS'} yAccessor={d => d.val} stroke={this.stroke} fill={this.fill} {...this.lineConfig} {...this.areaConfig}/>
                    {/*<EdgeIndicator displayFormat={format(this.edgeTextFormat)} yAccessor={d => d.val} {...this.edgeIndicator} />*/}
                    <CurrentCoordinate key={'ccCAS'} yAccessor={d => d.val} fill={this.currentCoordinateColor} />
                    <Annotate with={CustomImage} when={d => d.maxPlot === true} usingProps={this.showMaxValueOnChart}/>
				</Chart>
			</ChartCanvas>
		);
	}
}


AreaChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
	type: "svg",
};
AreaChart = fitDimensionsBox(AreaChart);

export default AreaChart;