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

import { FormattedMessage } from 'react-intl';

class ChartBoxProduction extends React.Component {
    constructor(props) {
        super(props);
        let { day, dataType} = this.props;
        props.inverterDailyFetch( day, dataType);
    }

    render() {
        const {classes, id} = this.props;
        const {data, day, dataType} = this.props;
        const {color, title, subtitle} = this.props;

        return <Card id={id} key={id}>
            <CardHeader color={color} className="dragHeader">
                <h4 className={classes.cardTitleWhite}>{title}</h4>
                <p className={classes.cardCategoryWhite}>
                    <FormattedMessage
                        id={ 'chart.searchMessage.'+dataType }
                        defaultMessage={ subtitle }
                        values={{ day: day }}
                    />
                </p>
            </CardHeader>
            <CardBody>
                {(data && data.length>0)?
                        <AreaChart data={data} color={color} ratio={1} type="hybrid"/>
                    :null}
            </CardBody>
        </Card>;
    }
}

ChartBoxProduction.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array,
    day: PropTypes.string,
    dataType: PropTypes.string,
    id: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
        "warning",
        "success",
        "danger",
        "info",
        "primary",
        "rose"
    ]),
    title: PropTypes.string,
    subtitle: PropTypes.string
};
ChartBoxProduction.defaultProps = {
    day: moment().format('YYYYMMDD'),
    dataType: "power",
    color: "warning",
    title: "Title",
    subtitle: "Data of {day}"
};

export default withStyles(boxStyle)(ChartBoxProduction);
