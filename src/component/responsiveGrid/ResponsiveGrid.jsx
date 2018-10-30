import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import {Responsive, WidthProvider} from  "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import './style/responsiveGridLayout.less';

import {withStyles} from "@material-ui/core";

class ResponsiveGrid extends React.Component {


    constructor(props) {
        super(props);

        let {layouts, gridConfig} = props;

        let additionalInfo = {};

        // layouts['lg'].forEach((elem)=>{
        //     additionalInfo.push(elem.additionalInfo);
        // });
        //

        this.props.newElements.forEach((elem)=>{
            let firstKey = Object.keys(layouts)[0];
            let isAlreadyInLayout =   layouts[firstKey].find((elemLay)=>{
                                        return elemLay.i===elem.additionalInfo.id;
                                    }) || false;
            if (!isAlreadyInLayout) {
                layouts = this.addNewItem(elem, layouts, additionalInfo, gridConfig);
                elem.additionalInfo.id = elem.i;
            }
            additionalInfo[elem.i] = elem.additionalInfo;
        });

        this.state = {
            breakpoint: 'lg',
            layouts: layouts,
            additionalInfo: additionalInfo
        }
    }

    addNewItem = (elem, layouts, additionalInfo, gridConfig) => {
        // console.log('adding', divUniqueId);
        if (elem.id in additionalInfo) {
            throw "Elemento già presente!";
            // return;
        }

        let newLayouts = {...layouts};
        Object.keys(newLayouts).forEach((key) => {
            let total = 0;

            let layout = newLayouts[key];

            if (layout.length > 0) total += layout[layout.length - 1].w + layout[layout.length - 1].x;

            if (total + elem.w > gridConfig.cols[key]) {
                total = 0;
            }

            layout.push({...elem, ...{x: total % (gridConfig.cols[key]), y: Infinity}/*, additionalInfo: {...elem.additionalInfo, ...{id: elem.i}}*/});
            newLayouts[key] = layout;
        });

        return newLayouts;
    };

    onBreakpointChange = (breakpoint) => {
        this.setState({breakpoint});
    };

    onLayoutChange = (layout, layouts) => {
        this.setState({tmpLayouts:layouts});
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
        if (additionalInfo.classObj){
            return additionalInfo.classObj(additionalInfo.id , {...(additionalInfo.settingsProps || additionalInfo.defaultProps)});
        }
    };
    getAllDivs = () => {
        let {layouts, breakpoint, additionalInfo} = this.state;
        let alldivs = [];
        if (layouts[breakpoint]) {
            layouts[breakpoint].forEach(elem => {
                alldivs.push(<div id={elem.i} key={elem.i}>{this.getCard(additionalInfo[elem.i])}</div>)
            });
        }
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
    },
    newElements: PropTypes.array
};

ResponsiveGrid.defaultProps = {
    gridConfig: {
        // draggableHandle: '.dragHeader',
        draggableHandle: '.dragHeader',
        className: "responsive-grid-layout",
        rowHeight: 175,
        // currentBreakpoint: this.previousLayoutBreakpoint,
        // Various layout that can be present on windows size change
        cols: {lg: 5, md: 4, sm: 3, xs: 2, xxs: 1},
        // cols: {lg: 3, md: 2, sm: 1},
        // The breaking layout
        breakpoints: {lg: 1800, md: 1400, sm: 1100, xs: 720, xxs: 0}
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
    layouts: {lg: [], md: [], sm: [], xs: [], xxs: []},

    newElements: []
};

export default  ResponsiveGrid;

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
