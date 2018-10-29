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
import {defineMessages, injectIntl} from 'react-intl';

import { FormattedMessage, FormattedDate } from 'react-intl';
import guid from "../../../utils/math/guid";
import AreaBarChart from "../../../component/charts/AreaBarChart";
import {inverterInfoFetch} from "../../../redux/actions";

class TableBoxInverterInformation extends React.Component {
    constructor(props) {
        super(props);
        props.inverterInfoFetch();
    }

    render() {
        const {classes, id} = this.props;
        const {data, isFetching} = this.props;
        const {color} = this.props;

        const messagesIntl = defineMessages(
            {modelName: {id:  'table.inverter.info.modelName'},
            modelNameIndoorOutdoorType: {id:  'table.inverter.info.modelNameIndoorOutdoorType'},
            gridStandard: {id:  'table.inverter.info.gridStandard'},
            trasformerLess: {id:  'table.inverter.info.trasformerLess'},
            windOrPV: {id:  'table.inverter.info.windOrPV'},
            firmwareRelease: {id:  'table.inverter.info.firmwareRelease'},
            systemSN: {id:  'table.inverter.info.systemSN'},
            systemPN: {id:  'table.inverter.info.systemPN'},
            manufactoryDate: {id:  'table.inverter.info.manufactoryDate'},
            configStatus: {id:  'table.inverter.info.configStatus'}}
            );


        return <Card id={id} key={id}>
            <CardHeader color={color} className="dragHeader">
                <h4 className={classes.cardTitleWhite}><FormattedMessage
                    id={ 'table.inverter.info.title' }
                /></h4>
                <p className={classes.cardCategoryWhite}>
                    <FormattedMessage
                        id={ 'table.inverter.info.subtitle' }
                    />
                </p>
            </CardHeader>
            <CardBody>
                {(!isFetching)?
                    (data)?
                        <Table
                            className={classes.tableSize}
                            tableHeaderColor={color}
                            // tableHead={["ID", "Name", "Salary", "Country"]}
                            tableData={[
                                [this.props.intl.formatMessage(messagesIntl.modelName), data.modelName],
                                [this.props.intl.formatMessage(messagesIntl.modelNameIndoorOutdoorType), data.modelNameIndoorOutdoorType],
                                [this.props.intl.formatMessage(messagesIntl.gridStandard), data.gridStandard],
                                [this.props.intl.formatMessage(messagesIntl.trasformerLess), data.trasformerLess],
                                [this.props.intl.formatMessage(messagesIntl.windOrPV), data.windOrPV],
                                [this.props.intl.formatMessage(messagesIntl.firmwareRelease), data.firmwareRelease],
                                [this.props.intl.formatMessage(messagesIntl.systemSN), data.systemSN],
                                [this.props.intl.formatMessage(messagesIntl.systemPN), data.systemPN],
                                [this.props.intl.formatMessage(messagesIntl.manufactoryDate), "Year "+data.manufactory.Year+" Week "+data.manufactory.Week],
                                [this.props.intl.formatMessage(messagesIntl.configStatus), data.configStatus.desc]
                            ]}
                        />
                        :
                        <div className={classes.progress}><FormattedMessage id={'chart.no_data'}/></div>
                    :
                    <div className={classes.progress}><CircularProgress style={{color: colorMod[color + 'Color']}} size={50} /></div>
                }

            </CardBody>
        </Card>
    }
}

TableBoxInverterInformation.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object,
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
TableBoxInverterInformation.defaultProps = {
    color: "warning",
    isFetching: false
};

export default withStyles(boxStyle)(injectIntl(TableBoxInverterInformation));
