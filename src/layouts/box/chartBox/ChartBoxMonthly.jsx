import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles } from '@material-ui/core';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Card from '../../../component/Card/Card.jsx';
import CardHeader from '../../../component/Card/CardHeader.jsx';
import CardIcon from '../../../component/Card/CardIcon.jsx';
import CardBody from '../../../component/Card/CardBody.jsx';
import CardFooter from '../../../component/Card/CardFooter.jsx';

import boxStyle from '../style/boxStyle';
import Table from '../../../component/table/Table';
import AreaBarChart from '../../../component/charts/AreaBarChart';

import * as colorMod from '../../../component/style/material-dashboard-react';
import TextField from '@material-ui/core/TextField/TextField';


class ChartBoxMonthly extends React.Component {
  constructor(props) {
    super(props);
    const { month, dataType } = this.props;
    props.inverterDailyFetch(month, dataType);

    let momentMonth;
    if (month) {
      momentMonth = moment(month, 'YYYYMM');
    } else {
      momentMonth = moment();
    }

    this.state = {
      month: momentMonth.month(),
      year: momentMonth.year()
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
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
          </h4>
          <div className={classes.cardCategoryWhite} onClick={(e)=>e.preventDefault()}>
            <FormattedMessage
              id="chart.monthly.production.subtitle"
              // values={{ month: monthFormatted }}
            />
            <Select
              value={this.state.month}
              onChange={this.handleChange}
              inputProps={{
                name: 'month',
                id: 'month-simple',
                className: classes.cardCategoryWhite+' '+classes.selectInput
              }}
            >
              {Array.from(Array(12).keys()).map(monthElem => (
                <MenuItem key={String(monthElem)} value={(monthElem)}>
                  {this.props.intl.formatDate(new Date(moment((monthElem + 1), 'MM').valueOf()), {
                    month: 'long',
                  })}
                </MenuItem>
              ))}

            </Select>
            <Select
              value={this.state.year}
              onChange={this.handleChange}
              inputProps={{
                name: 'year',
                id: 'year-simple',
                className: classes.cardCategoryWhite+' '+classes.selectInput
              }}
            >
              {Array.from(Array(6).keys())
                .map(numToYear => (numToYear + this.state.year - 3))
                .map(yearElem => (
                  <MenuItem key={String(yearElem)} value={(yearElem)}>
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
  inverterDailyFetch: PropTypes.func
};
ChartBoxMonthly.defaultProps = {
  month: moment().format('YYYYMM'),
  color: 'rose',
  isFetching: false,
  lastUpdate: null,
  data: null,
  inverterDailyFetch: null
};

export default withStyles(boxStyle)(injectIntl(ChartBoxMonthly));
