import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { defineMessages, injectIntl } from 'react-intl';
import { FormattedMessage, FormattedDate } from 'react-intl';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';

import Refresh from '@material-ui/icons/Refresh';

import Button from '../../../component/customButtons/Button.jsx';
import Card from '../../../component/card/Card.jsx';
import CardHeader from '../../../component/card/CardHeader.jsx';
import CardIcon from '../../../component/card/CardIcon.jsx';
import CardBody from '../../../component/card/CardBody.jsx';
import CardFooter from '../../../component/card/CardFooter.jsx';

import boxStyle from '../style/boxStyle';
import Table from '../../../component/table/Table';
import AreaChart from '../../../component/charts/AreaChart';

import * as colorMod from '../../../component/style/material-dashboard-react';

import Status from '../../../component/status/Status';


class TableBoxInverterInformation extends React.Component {
  constructor(props) {
    super(props);
    props.inverterAlarmsFetch();
  }
  refreshData = () => {
    this.props.inverterAlarmsFetch();
  };

  render() {
    const { classes, id } = this.props;
    const { data, isFetching } = this.props;
    const { color } = this.props;

    const messagesIntl = defineMessages(
      {
        alarmState: { id: 'table.inverter.alarm.state' },
        channel1State: { id: 'table.inverter.channel1.state' },
        channel2State: { id: 'table.inverter.channel2.state' },
        inverterState: { id: 'table.inverter.inverter.state' }
      }
    );


    return (
      <Card id={id} key={id}>
        <CardHeader color={color} className="dragHeader">
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage
              id="table.inverter.state.title"
            />
            <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.refreshData}>
              <Refresh />
            </Button>
          </h4>
          <p className={classes.cardCategoryWhite}>
            <FormattedMessage
              id="table.inverter.state.subtitle"
            />
          </p>
        </CardHeader>
        <CardBody>
          {(!isFetching)
            ? (data)
              ? (
                <Table
                  className={classes.tableSize}
                  tableHeaderColor={color}
                            // tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    [this.props.intl.formatMessage(messagesIntl.alarmState), data.alarmState, <Status status={(data.alarmStateParam === 0) ? 'ok' : (data.alarmStateParam === 1) ? 'warning' : 'no'} />],
                    [this.props.intl.formatMessage(messagesIntl.channel1State), data.channel1State, <Status status={(data.channel1StateParam === 2) ? 'ok' : (data.channel1StateParam < 10) ? 'warning' : 'no'} />],
                    [this.props.intl.formatMessage(messagesIntl.channel2State), data.channel2State, <Status status={(data.channel2StateParam === 2) ? 'ok' : (data.channel2StateParam < 10) ? 'warning' : 'no'} />],
                    [this.props.intl.formatMessage(messagesIntl.inverterState), data.inverterState, <Status status={(data.inverterStateParam === 2) ? 'ok' : (data.inverterStateParam < 3) ? 'warning' : 'no'} />]
                  ]}
                />
              )
              : <div className={classes.progress}><FormattedMessage id="chart.no_data" /></div>
            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`] }} size={50} /></div>
                }

        </CardBody>
      </Card>
    );
  }
}

TableBoxInverterInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose'
  ]),
  isFetching: PropTypes.bool
};
TableBoxInverterInformation.defaultProps = {
  color: 'warning',
  isFetching: false
};

export default withStyles(boxStyle)(injectIntl(TableBoxInverterInformation));
