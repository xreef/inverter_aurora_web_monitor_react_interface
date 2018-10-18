import React, { Component } from "react";
import ReactDOM from "react-dom";

import { isDefined } from "react-stockcharts/lib/utils";

function getDisplayName(Series) {
    return Series.displayName || Series.name || "Series";
}

export default function fitDimensionsFix(WrappedComponent, props = {}) {

	let {
		minWidth = 100,
		minHeight = 100,
		ratio,
		width,
		height
	} = props;

	function getDimensions(el, checkSibling, size) {
        ReactDOM.findDOMNode(el).style = "height: 100px;"
		// el.height = "100px";
		let w = el.parentNode.clientWidth;
		let h = el.parentNode.clientHeight;

		if (size) height = size.height;
		if (size) width = size.width;

		let ch = isDefined(height) ? height : Math.max(h, minHeight);
		let cw = isDefined(width) ? width : Math.max(w, minWidth);

		let heightOffset = 0;
		if (checkSibling){
            for (let elem of el.parentNode.parentNode.children) {
            	if (elem!==el.parentNode){
                    heightOffset=heightOffset+elem.clientHeight;
				}
			}
		}

		return {
			width: cw,
			height: ch-heightOffset-30,
		};
	}
	class ResponsiveComponent extends Component {
		constructor(props) {
			super(props);
			this.handleWindowResize = this.handleWindowResize.bind(this);
            this.eventResize = this.eventResize.bind(this);
			this.getWrappedInstance = this.getWrappedInstance.bind(this);
			this.saveNode = this.saveNode.bind(this);
			this.setTestCanvas = this.setTestCanvas.bind(this);
			this.state = {};

			this.size = {};
            if (props.height){
                this.size['height'] = props.height;
            }
            if (props.width){
                this.size['width'] = props.width;
            }

			let {wrapper} = this.props;
			if (wrapper){
				wrapper._resize = this.handleWindowResize;
			}
		}
		saveNode(node) {
			this.node = node;
		}
		setTestCanvas(node) {
			this.testCanvas = node;
		}
		getRatio() {
			if (isDefined(this.testCanvas)) {
				let context = this.testCanvas.getContext("2d");

				let devicePixelRatio = window.devicePixelRatio || 1;
				let backingStoreRatio = context.webkitBackingStorePixelRatio ||
								context.mozBackingStorePixelRatio ||
								context.msBackingStorePixelRatio ||
								context.oBackingStorePixelRatio ||
								context.backingStorePixelRatio || 1;

                return devicePixelRatio / backingStoreRatio;
				// console.log("ratio = ", ratio);
				// return ratio;
			}
			return 1;
		}
		componentDidMount() {
			window.addEventListener("resize", this.eventResize);

            let {checkSibling} = this.props;

            let dimensions = getDimensions(this.node, checkSibling, this.size);

			/* eslint-disable react/no-did-mount-set-state */
			this.setState({
				...dimensions,
				ratio: isDefined(ratio) ? ratio : this.getRatio(),
			});
			/* eslint-enable react/no-did-mount-set-state */
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.eventResize);
		}
		eventResize() {
            this.handleWindowResize(this.size);
		}
		handleWindowResize(size) {
			if (size) {
                if (size.hasOwnProperty('height')){
                    this.size['height'] = size.height;
                }
                if (size.hasOwnProperty('width')){
                    this.size['width'] = size.width;
                }
            }

			let node = ReactDOM.findDOMNode(this.node); // eslint-disable-line react/no-find-dom-node
debugger
            let {checkSibling} = this.props;

            this.setState(getDimensions(node, checkSibling, this.size));
		}
		getWrappedInstance() {
			return this.node;
		}
		render() {
			let ref = { ref: this.saveNode };

			if (this.state.width || this.state.height) {
                let sizeProps = {};
                if (this.state.height){
                    sizeProps['height'] = this.state.height;
                }
                if (this.state.width){
                    sizeProps['width'] = this.state.width;
                }

                return <WrappedComponent
                    {...this.props}
					{...sizeProps}
					ratio={this.state.ratio}

					{...ref}
					/>;
			} else {
				return <div {...ref}>
					<canvas ref={this.setTestCanvas}  />
				</div>;
			}
		}
	}

	ResponsiveComponent.displayName = `fitDimensions(${ getDisplayName(WrappedComponent) })`;

	return ResponsiveComponent;
}

