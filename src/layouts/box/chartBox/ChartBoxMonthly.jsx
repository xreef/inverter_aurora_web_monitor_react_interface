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
import AreaBarChart from "../../../component/charts/AreaBarChart";

import CircularProgress from '@material-ui/core/CircularProgress';
import * as colorMod from '../../../component/style/material-dashboard-react'
import {injectIntl} from 'react-intl';

import { FormattedMessage, FormattedDate } from 'react-intl';

class ChartBoxMonthly extends React.Component {
    constructor(props) {
        super(props);
        let { month, dataType} = this.props;
        props.inverterDailyFetch( month, dataType);
    }

    render() {
        const {classes, id} = this.props;
        const {data, month, isFetching} = this.props;
        const {color} = this.props;

        const monthFormatted = this.props.intl.formatDate(new Date(moment(month, "YYYYMM").valueOf()), {
            year: 'numeric',
            month: 'long'
        });

        // let production0 = true;
        // data.forEach(elem => {
        //     if (elem.val>0) production0 = false;
        // });

        return <Card id={id} key={id}>
            <CardHeader color={color} className="dragHeader">
                <h4 className={classes.cardTitleWhite}><FormattedMessage
                                                            id={ 'chart.monthly.production.title' }
                                                            values={{ month: month }}
                                                        />
                </h4>
                <p className={classes.cardCategoryWhite}>
                    <FormattedMessage
                        id={ 'chart.monthly.production.subtitle' }
                        values={{ month: monthFormatted }}
                    />
                </p>
            </CardHeader>
            <CardBody>
                {(!isFetching)?
                        (data && data.length>1)?
                            <AreaBarChart data={data} color={color} ratio={1} type="hybrid"/>
                        :
                            <div className={classes.progress}><FormattedMessage id={'chart.no_data'}/></div>
                    :
                    <div className={classes.progress}><CircularProgress style={{color: colorMod[color + 'Color']}} size={50} /></div>
                }
            </CardBody>
        </Card>;
    }
}

ChartBoxMonthly.propTypes = {
    classes: PropTypes.object.isRequired,
    lastUpdate: PropTypes.instanceOf(Date),
    data: PropTypes.array,
    month: PropTypes.string,
    id: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
        "warning",
        "success",
        "danger",
        "info",
        "primary",
        "rose"
    ]),
    isFetching: PropTypes.bool
};
ChartBoxMonthly.defaultProps = {
    month: moment().format('YYYYMM'),
    color: "rose",
    isFetching: false
};

export default withStyles(boxStyle)(injectIntl(ChartBoxMonthly));
