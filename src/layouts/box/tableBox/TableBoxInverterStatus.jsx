import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';

import Refresh from '@material-ui/icons/Refresh';

import Button from '../../../component/customButtons/Button';
import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import CardBody from '../../../component/card/CardBody';

import boxStyle from '../style/boxStyle';
import Table from '../../../component/table/Table';

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

  handleHome = () => {
    const {
      isInHome, removeElementFromHome, addElementToHome, boxType
    } = this.props;
    if (isInHome) {
      removeElementFromHome(boxType);
    } else {
      addElementToHome(boxType);
    }
  };

  render() {
    const { classes, id } = this.props;
    const { data, isFetching, isInHome } = this.props;
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
            <Button justIcon round color={color} className={classes.buttonHeader2} onClick={this.handleHome}>
              {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
            </Button>
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
  isFetching: PropTypes.bool,
  inverterAlarmsFetch: PropTypes.func.isRequired,
  addElementToHome: PropTypes.func.isRequired,
  removeElementFromHome: PropTypes.func.isRequired,
  boxType: PropTypes.string.isRequired,
  isInHome: PropTypes.bool.isRequired

};
TableBoxInverterInformation.defaultProps = {
  color: 'warning',
  isFetching: false,
  data: null
};

export default withStyles(boxStyle)(injectIntl(TableBoxInverterInformation));
