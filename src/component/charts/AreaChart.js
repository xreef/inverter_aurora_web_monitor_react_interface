
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

import {EdgeIndicator, CurrentCoordinate, MouseCoordinateY, MouseCoordinateX} from "react-stockcharts/lib/coordinates";

import CustomImage from './annotation/CustomImage'
import {Annotate} from "react-stockcharts/lib/annotation";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

import fitDimensionsBox from "./utils/fitDimensionsBox";

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

import * as grad from '../../component/style/material-dashboard-react'
import {defineMessages, injectIntl} from 'react-intl';
import axis from "./config/axis";

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
            },
            singleTooltip: {
                xDisplayFormatPattern: "%d-%m-%Y %H:%M",
                yDisplayFormatPattern: ".0f",
                origin: [10, 0],
                valueStroke: "#fff",
                // fontFamily: null,
                fontSize: 12
            },
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

        this.singleTooltip = null;

        let {xDisplayFormatPattern, yDisplayFormatPattern, ...otherSingleTooltipStyle} = this.config.singleTooltip;
        this.singleTooltip = otherSingleTooltipStyle;
        this.singleTooltip.xDisplayFormat = timeFormat(xDisplayFormatPattern);
        this.singleTooltip.yDisplayFormat = format(yDisplayFormatPattern);

        // Line of grid
        this.yGrid = axis.yAxis;
        // yGrid = { innerTickSize: -1 * width/*, tickStrokeOpacity: 0.1*/ };
        this.xGrid = axis.xAxis;

        this.xGridSeparator = axis.xAxisSeparator;

        this.mouseCoordinateY = axis.mouseCoordinateY;

        let {xMouseDateFormatPatternDay, xMouseDateFormatPatternMin, ...otherMCX} = axis.mouseCoordinateX;
        this.mouseCoordinateX = otherMCX;
        this.xMouseDateFormat = timeFormat(xMouseDateFormatPatternMin);

    }
    postCalculator = (data, plottedData) => {

        // if (charts.some((elem)=>{
        //     return elem.isRefPriceOnPlottedData()
        //     })) {
        // Math.max.apply(Math,array.map(function(o){return o.y;}))
        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;

        let lowestId = null;
        let highestId = null;
        let tmp;
        for (let i = plottedData.length - 1; i >= 0; i--) {
            tmp = plottedData[i].val;
            plottedData[i].maxPlot = undefined;
            plottedData[i].minPlot = undefined;
            plottedData[i].refPrice = undefined;
            if (tmp < lowest) {
                lowest = tmp;
                lowestId = i;
            }
            if (tmp > highest) {
                highest = tmp;
                highestId = i;
            }
        }
        if (plottedData && plottedData.length>0) {
            plottedData[lowestId]["minPlot"] = true;
            plottedData[highestId]["maxPlot"] = true;

            // if (charts.some((elem)=>{return elem.isRefPriceOnPlottedData()}) && this.state.refPrice!==plottedData[0].close) {
            //     this.setState({refPrice: plottedData[0].close})
            // }
            this.plottedData = plottedData;
        }
        return plottedData;
    };
	render() {
		const { data: initialData, type, width, ratio, height, dataType } = this.props;
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


        const messagesDataTypeLabel = defineMessages({
            greeting: {
                id:  'chart.production.'+dataType+'.label',
                defaultMessage: dataType,
                description: 'Label of toltip',
            },
        });

        const messagesDateLabel = defineMessages({
            greeting: {
                id:  'date.label',
                defaultMessage: "Date",
                description: 'Label of toltip',
            },
        });

        const xExtents = [start, end];
        let postProcessingCalculator = (plottedData) => this.postCalculator(data, plottedData);

        return (
			<ChartCanvas ratio={ratio} width={width-20} height={height}
				margin={{ left: 10, right: 50, top: 10, bottom: 30 }}
				seriesName="MSFT"
				data={data} type={type}
				 xScale={xScale}
				 xAccessor={xAccessor}
				 displayXAccessor={displayXAccessor}
				 xExtents={xExtents}
                 postCalculator={postProcessingCalculator }
            >
				<Chart id={0} yExtents={d => d.val}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={6} />

                    <YAxis key="mcX1" axisAt="right" orient="right" ticks={5} tickFormat={this.singleTooltip.yDisplayFormat} {...this.yGrid} />,
                    <MouseCoordinateY key="mcCM1" {...this.mouseCoordinateY} displayFormat={this.singleTooltip.yDisplayFormat}/>
                    <MouseCoordinateX key="mcCM2" {...this.mouseCoordinateX} displayFormat={this.xMouseDateFormat} />

                    <CustomAreaSeries key={'lsCAS'} yAccessor={d => d.val} stroke={this.stroke} fill={this.fill} {...this.lineConfig} {...this.areaConfig}/>
                    {/*<EdgeIndicator displayFormat={format(this.edgeTextFormat)} yAccessor={d => d.val} {...this.edgeIndicator} />*/}
                    <CurrentCoordinate key={'ccCAS'} yAccessor={d => d.val} fill={this.currentCoordinateColor} />
                    <Annotate with={CustomImage} when={d => d.maxPlot === true} usingProps={this.showMaxValueOnChart}/>

                    <SingleValueTooltip
                        xLabel={this.props.intl.formatMessage(messagesDateLabel.greeting)} /* xLabel is optional, absense will not show the x value */ yLabel={this.props.intl.formatMessage(messagesDataTypeLabel.greeting)}
                        xAccessor={d => d.date}
                        yAccessor={d => d.val}
                        {...this.singleTooltip}/>
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
    dataType: PropTypes.string
};

AreaChart.defaultProps = {
	type: "svg",
};
AreaChart = fitDimensionsBox(injectIntl(AreaChart));

export default AreaChart;