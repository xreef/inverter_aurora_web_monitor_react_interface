import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {withStyles} from "@material-ui/core";

import Card from "../../../component/Card/Card.jsx";
import CardHeader from "../../../component/Card/CardHeader.jsx";
import CardIcon from "../../../component/Card/CardIcon.jsx";
import CardBody from "../../../component/Card/CardBody.jsx";
import CardFooter from "../../../component/Card/CardFooter.jsx";

import boxStyle from '../style/boxStyle'
import Table from "../../../component/table/Table";
import AreaChart from "../../../component/charts/AreaChart";

class ChartBoxProduction extends React.Component {
    constructor(props) {
        super(props);
        props.inverterDailyFetch('power', moment().format('YYYYMMDD'));
    }

    render() {
        const {classes, id} = this.props;
        const {data, day} = this.props;

        return <Card key={id}>
            <CardHeader color="warning" className="dragHeader">
                <h4 className={classes.cardTitleWhite}>Production daily chart</h4>
                <p className={classes.cardCategoryWhite}>
                    Data of {day}
                </p>
            </CardHeader>
            <CardBody>
                {(data && data.length>0)?
                        <AreaChart data={data} ratio={1} type="hybrid"/>
                    :null}
            </CardBody>
        </Card>;
    }
}

ChartBoxProduction.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array,
    day: PropTypes.string,
    id: PropTypes.string.isRequired,
};

export default withStyles(boxStyle)(ChartBoxProduction);
