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

import CircularProgress from '@material-ui/core/CircularProgress';
import * as colorMod from '../../../component/style/material-dashboard-react'
import {injectIntl} from 'react-intl';

import { FormattedMessage, FormattedDate } from 'react-intl';

class ChartBoxProduction extends React.Component {
    constructor(props) {
        super(props);
        let { day, dataType} = this.props;
        props.inverterDailyFetch( day, dataType);
    }

    render() {
        const {classes, id} = this.props;
        const {data, day, dataType, isFetching} = this.props;
        const {color, title, subtitle} = this.props;

        const dayFormatted = this.props.intl.formatDate(new Date(moment(day, "YYYYMMDD").valueOf()), {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        let production0 = true;
        data.forEach(elem => {
            if (elem.val>0) production0 = false;
        });

        return <Card id={id} key={id}>
            <CardHeader color={color} className="dragHeader">
                <h4 className={classes.cardTitleWhite}><FormattedMessage
                                                            id={ 'chart.production.'+dataType+'.title' }
                                                            defaultMessage={ title }
                                                            values={{ day: day }}
                                                        />
                </h4>
                <p className={classes.cardCategoryWhite}>
                    <FormattedMessage
                        id={ 'chart.production.'+dataType+'.subtitle' }
                        defaultMessage={ subtitle }
                        values={{ day: dayFormatted }}
                    />
                </p>
            </CardHeader>
            <CardBody>
                {(!isFetching)?
                        (data && data.length>1)?
                            (!production0)?
                                <AreaChart data={data} color={color} ratio={1} dataType={dataType} type="hybrid"/>
                            :
                                <div className={classes.progress}><FormattedMessage id={'chart.no_production'}/></div>
                        :
                            <div className={classes.progress}><FormattedMessage id={'chart.no_data'}/></div>
                    :
                    <div className={classes.progress}><CircularProgress style={{color: colorMod[color + 'Color']}} size={50} /></div>
                }
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
    subtitle: PropTypes.string,
    isFetching: PropTypes.bool
};
ChartBoxProduction.defaultProps = {
    day: moment().format('YYYYMMDD'),
    dataType: "power",
    color: "warning",
    title: "Title",
    subtitle: "Data of {day}",
    isFetching: false
};

export default withStyles(boxStyle)(injectIntl(ChartBoxProduction));