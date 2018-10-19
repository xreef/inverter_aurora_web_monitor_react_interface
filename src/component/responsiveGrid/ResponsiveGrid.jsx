import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import {Responsive, WidthProvider} from  "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import {guid} from '../../utils/math';

import './style/responsiveGridLayout.less';

import Card from "../../component/Card/Card.jsx";
import CardHeader from "../../component/Card/CardHeader.jsx";
import CardIcon from "../../component/Card/CardIcon.jsx";
import CardBody from "../../component/Card/CardBody.jsx";
import CardFooter from "../../component/Card/CardFooter.jsx";

import Table from "../../component/table/Table";
import {withStyles} from "@material-ui/core";
import boxes from "../../views/box/boxes";

const classes = theme => ({


    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    tableSize: {
        maxHeight: "224px",
        overflowY: "auto"
    }
});


class ResponsiveGrid extends React.Component {


    constructor(props) {
        super(props);

        const {layouts} = props;

        let additionalInfo = {};
        layouts['lg'].map(elem => {
            let newElem = {...elem};
            newElem.additionalInfo.id = newElem.i; // = (newElem.additionalInfo.id || newElem.additionalInfo.boxType+guid());
            additionalInfo[newElem.i] = {...newElem.additionalInfo};
            return newElem;
        });

        this.state = {
            breakpoint: 'lg',
            layouts: layouts,
            additionalInfo: additionalInfo
        }
    }

    onBreakpointChange = (breakpoint) => {
        this.setState({breakpoint});
    };

    onLayoutChange = (layout, layouts) => {
        this.setState({layouts:layouts});
    };

    onResizeStart = (layout, from, to) => {
        const addI = this.state.additionalInfo[from.i];
    };
    onResize = (layout, from, to, elem, event, dragger) => {
        // console.log(layout, from, to, elem, event, dragger);
        const addI = this.state.additionalInfo[from.i];
    };
    onResizeStop = (layout, from, to) => {
        const addI = this.state.additionalInfo[from.i];

        setTimeout(()=>window.dispatchEvent(new Event('resize')), 50);
    };

    onDragStop = (layout, from, to) => {
        const addI = this.state.additionalInfo[from.i];
    };
    onDragStart = (layout, from, to) => {
        const addI = this.state.additionalInfo[from.i];
    };
    onDrag = (layout, from, to, elem, event, dragged) => {
        // console.log(layout, from, to, elem, event, dragged);
        const addI = this.state.additionalInfo[from.i];
    };

    getCard = (additionalInfo) => {
        const {classes} = this.props;

        if (additionalInfo.classObj){
            return additionalInfo.classObj(additionalInfo.id , {...(additionalInfo.settingsProps || additionalInfo.defaultProps)});
        }else {

            return <Card key={additionalInfo.id || additionalInfo.boxType+guid()}>
                <CardHeader color="warning" className="dragHeader">
                    <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                    <p className={classes.cardCategoryWhite}>
                        New employees on 15th September, 2016
                    </p>
                </CardHeader>
                <CardBody>
                    <Table
                        className={classes.tableSize}
                        tableHeaderColor="warning"
                        tableHead={["ID", "Name", "Salary", "Country"]}
                        tableData={[
                            ["1", "Dakota Rice", "$36,738", "Niger"],
                            ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                            ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                            ["4", "Minerva Hooper", "$23,789", "Curaçao"],
                            ["5", "Sage Rodriguez", "$56,142", "Netherlands"],
                            ["6", "Minerva Hooper", "$23,789", "Curaçao"],
                            ["7", "Sage Rodriguez", "$56,142", "Netherlands"]
                        ]}
                    />
                </CardBody>
            </Card>
        }
    };
    getAllDivs = () => {
        let {layouts, breakpoint, additionalInfo} = this.state;
        let alldivs = [];
        layouts[breakpoint].forEach(elem => {
            alldivs.push(<div id={elem.i} key={elem.i}>{this.getCard(additionalInfo[elem.i])}</div>)
        });
        return alldivs;
    };

    render() {
        const {gridConfig} = this.props;
        const {layouts} = this.state;

        return <ResponsiveReactGridLayout
            layouts={layouts}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}

            onResizeStart={this.onResizeStart}
            onResize={this.onResize}
            onResizeStop={this.onResizeStop}

            onDragStop={this.onDragStop}
            onDragStart={this.onDragStart}
            onDrag={this.onDrag}

            // WidthProvider option
            measureBeforeMount={false}


            {...gridConfig}>
                {this.getAllDivs()}
            </ResponsiveReactGridLayout>
    }
}

const type = (obj) => Object.prototype.toString.call(obj);

ResponsiveGrid.propTypes = {
    gridConfig: PropTypes.object.isRequired,
    // layouts is an object mapping breakpoints to layouts.
    // e.g. {lg: Layout, md: Layout, ...}
    layouts: function(props, propName, _componentName){
        if (type(props[propName]) !== "[object Object]") {
            throw new Error("Layout property must be an object. Received: " + type(props[propName]));
        }
        Object.keys(props[propName]).forEach((key) => {
            if (!(key in props.gridConfig.breakpoints)) {
                throw new Error("Each key in layouts must align with a key in breakpoints.");
            }
            validateLayout(props.layouts[key], "layouts." + key);
        });
    }
};

ResponsiveGrid.defaultProps = {
    gridConfig: {
        // draggableHandle: '.dragHeader',
        draggableHandle: '.dragHeader',
        className: "responsive-grid-layout",
        rowHeight: 350,
        // currentBreakpoint: this.previousLayoutBreakpoint,
        // Various layout that can be present on windows size change
        cols: {lg: 5, md: 4, sm: 3, xs: 2, xxs: 1},
        // cols: {lg: 3, md: 2, sm: 1},
        // The breaking layout
        breakpoints: {lg: 1800, md: 1400, sm: 1100, xs: 480, xxs: 0}
        // breakpoints: {lg: 1800, md: 1100, sm: 0}
        // ,sizeParameter: {
        //     maxH: undefined,
        //     maxW: undefined,
        //     minH: undefined,
        //     minW: undefined
        // },
        // moveParameter: {
        //     isDraggable: true,
        //     isResizable: false,
        //     static: false
        // }
        ,isDraggable: true
        ,isResizable: true
    },
    layouts: {lg: [
            {i: guid(), ...{...boxes['chartBoxProductionPower']}, ...{y: Infinity,x: 0}}
            ,{i: guid(), ...{...boxes['chartBoxProductionCurrent']}, ...{y: Infinity,x: 0}}
            ,{i: guid(), ...{...boxes['chartBoxProductionVoltage']}, ...{additionalInfo: {...boxes['chartBoxProductionVoltage'].additionalInfo,
                        settingsProps: {
                            day: "20181018"
                        }
                    }}, ...{y: Infinity,x: 0}}
            , {
                i: guid(),
                additionalInfo: {},
                w: 2,
                h: 2,
                y: Infinity,
                x: 0,
                maxH: 2,
                maxW: 4,
                minH: 2,
                minW: 1,
                isDraggable: true,
                isResizable: true,
                static: false

            }
            ], md: [], sm: [], xs: [], xxs: []}
};

export default  withStyles(classes)(ResponsiveGrid);

/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */
function validateLayout(layout, contextName) {
    contextName = contextName || "Layout";
    const subProps = ["x", "y", "w", "h"];
    if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");
    for (let i = 0, len = layout.length; i < len; i++) {
        const item = layout[i];
        for (let j = 0; j < subProps.length; j++) {
            if (typeof item[subProps[j]] !== "number") {
                throw new Error("ReactGridLayout: " + contextName + "[" + i + "]." + subProps[j] + " must be a number!");
            }
        }
        if (item.i && typeof item.i !== "string") {
            throw new Error("ReactGridLayout: " + contextName + "[" + i + "].i must be a string!");
        }
        if (item.static !== undefined && typeof item.static !== "boolean") {
            throw new Error("ReactGridLayout: " + contextName + "[" + i + "].static must be a boolean!");
        }
    }
}
