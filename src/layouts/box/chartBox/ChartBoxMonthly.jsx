import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles } from '@material-ui/core';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import Refresh from '@material-ui/icons/Refresh';

import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Card from '../../../component/card/Card.jsx';
import CardHeader from '../../../component/card/CardHeader.jsx';
import CardIcon from '../../../component/card/CardIcon.jsx';
import CardBody from '../../../component/card/CardBody.jsx';
import CardFooter from '../../../component/card/CardFooter.jsx';

import boxStyle from '../style/boxStyle';
import Table from '../../../component/table/Table';
import AreaBarChart from '../../../component/charts/AreaBarChart';

import * as colorMod from '../../../component/style/material-dashboard-react';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '../../../component/customButtons/Button';


class ChartBoxMonthly extends React.Component {
  constructor(props) {
    super(props);
    const { month } = this.props;
    props.monthlyPowerStatsFetch(month);

    let momentMonth;
    if (month) {
      momentMonth = moment(month, 'YYYYMM');
    } else {
      momentMonth = moment();
    }

    this.state = {
      month: momentMonth.month()+1,
      year: momentMonth.year()
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    let my = {
      month: this.state.month,
      year: this.state.year
    };
    my[e.target.name] = e.target.value;
    const momentMonth = moment(`${my.year}${my.month}`, 'YYYYMM');
    this.props.monthlyPowerStatsFetch(momentMonth.format('YYYYMM'));
  };

  refreshData = () => {
    let my = {
      month: this.state.month,
      year: this.state.year
    };
    const momentMonth = moment(`${my.year}${my.month}`, 'YYYYMM');
    this.props.monthlyPowerStatsFetch(momentMonth.format('YYYYMM'));
  };

  render() {
    const { classes, id } = this.props;
    const { data, month, isFetching } = this.props;
    const { color } = this.props;

    return (
      <Card id={id} key={id}>
        <CardHeader color={color} className="dragHeader">
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage
              id="chart.monthly.production.title"
              values={{ month }}
            />
            <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.refreshData}>
              <Refresh/>
            </Button>
          </h4>
          <div className={classes.cardCategoryWhite} >
            <FormattedMessage
              id="chart.monthly.production.subtitle"
              // values={{ month: monthFormatted }}
            />
            <Select
              value={this.state.month}
              onChange={this.handleChange}
              // onOpen={(event)=>{
              //   event.preventDefault(); // Let's stop this event.
              //   event.stopPropagation(); // Really this time.
              // }}
              disableUnderline = {true}
              inputProps={{
                name: 'month',
                id: 'month-simple',
                className: classes.cardCategoryWhite+' '+classes.selectInput
              }}
            >
              {Array.from(Array(12).keys()).map(monthElem => (
                <MenuItem id={String(monthElem)} ey={String(monthElem)} value={(monthElem+1)}>
                  {this.props.intl.formatDate(new Date(moment((monthElem + 1), 'MM').valueOf()), {
                    month: 'long',
                  })}
                </MenuItem>
              ))}

            </Select>
            <Select
              value={this.state.year}
              onChange={this.handleChange}
              disableUnderline = {true}
              inputProps={{
                name: 'year',
                id: 'year-simple',
                className: classes.cardCategoryWhite+' '+classes.selectInput
              }}
            >
              {Array.from(Array(6).keys())
                .map(numToYear => (numToYear + this.state.year - 3))
                .map(yearElem => (
                  <MenuItem id={String(yearElem)} key={String(yearElem)} value={(yearElem)}>
                    {this.props.intl.formatDate(new Date(moment((yearElem), 'YYYY').valueOf()), {
                      year: 'numeric',
                    })}
                  </MenuItem>
                ))}

            </Select>
          </div>
        </CardHeader>
        <CardBody>
          {(!isFetching)
            ? (data && data.length > 1)
              ? <AreaBarChart data={data} color={color} ratio={1} type="hybrid" />
              : <div className={classes.progress}><FormattedMessage id="chart.no_data" /></div>
            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`] }} size={50} /></div>
                }
        </CardBody>
      </Card>
    );
  }
}

ChartBoxMonthly.propTypes = {
  classes: PropTypes.object.isRequired,
  lastUpdate: PropTypes.instanceOf(Date),
  data: PropTypes.array,
  month: PropTypes.string,
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  isFetching: PropTypes.bool,
  monthlyPowerStatsFetch: PropTypes.func
};
ChartBoxMonthly.defaultProps = {
  month: moment().format('YYYYMM'),
  color: 'rose',
  isFetching: false,
  lastUpdate: null,
  data: null,
  monthlyPowerStatsFetch: null
};

export default withStyles(boxStyle)(injectIntl(ChartBoxMonthly));
