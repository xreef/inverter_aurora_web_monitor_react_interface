import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage, injectIntl } from 'react-intl';
import Card from '../../../component/card/Card.jsx';
import CardHeader from '../../../component/card/CardHeader.jsx';
// import CardIcon from '../../../component/card/CardIcon.jsx';
import CardBody from '../../../component/card/CardBody.jsx';
// import CardFooter from '../../../component/card/CardFooter.jsx';

import Refresh from '@material-ui/icons/Refresh';

import boxStyle from '../style/boxStyle';
// import Table from '../../../component/table/Table';
import AreaChart from '../../../component/charts/AreaChart';

import * as colorMod from '../../../component/style/material-dashboard-react';
import Button from '../../../component/customButtons/Button';
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';


class ChartBoxProduction extends React.Component {
  constructor(props) {
    super(props);
    const { day, dataType } = this.props;

    let momentDay;
    if (day && day!=="") {
      momentDay = moment(day, 'YYYYMMDD');
    }else{
      momentDay = moment();
    }
    props.inverterDailyFetch(momentDay.format('YYYYMMDD'), dataType);

    this.state = {
      dayTextValue: momentDay.format('YYYY-MM-DD')
    }
  }

  onChangeDate = (e) => {
    this.props.inverterDailyFetch(moment(e.target.value, 'YYYY-MM-DD').format('YYYYMMDD'), this.props.dataType);

    this.setState({
      dayTextValue: e.target.value
    });
  };

  refreshData = () => {
    this.props.inverterDailyFetch(moment(this.state.dayTextValue, 'YYYY-MM-DD').format('YYYYMMDD'), this.props.dataType);
  };

  handleHome = () => {
    const {isInHome, removeElementFromHome, addElementToHome, boxType} = this.props;
    if (this.props.isInHome){
      removeElementFromHome(boxType);
    }else{
      addElementToHome(boxType);
    }
  };

  render() {
    const { classes, id, isInHome } = this.props;
    const {
      data, dataType, isFetching,
    } = this.props;
    const {dayTextValue} = this.state;
    const { color, title, subtitle } = this.props;

    const momentDay = moment(dayTextValue, 'YYYY-MM-DD');

    const dayFormatted = this.props.intl.formatDate(new Date(momentDay.valueOf()), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let production0 = true;
    data.forEach((elem) => {
      if (elem.val > 0) production0 = false;
    });

    return (
      <Card id={id} key={id}>
        <CardHeader color={color} className="dragHeader">
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage
              id={`chart.production.${dataType}.title`}
              defaultMessage={title}
            />
            <Button justIcon round color={color}  className={classes.buttonHeader2} onClick={this.handleHome}>
              {isInHome?<FavoriteIconSelected />:<FavoriteIcon/>}
            </Button>
            <Button justIcon round color={color}  className={classes.buttonHeader} onClick={this.refreshData}>
              <Refresh/>
            </Button>
          </h4>
          <div className={classes.cardCategoryWhite}>
            <FormattedMessage
              id={`chart.production.${dataType}.subtitle`}
              defaultMessage={subtitle}
              values={{ day: dayFormatted }}
            />
            <TextField
              id="date"
              type="date"
              value={dayTextValue}
              onChange={this.onChangeDate}
              // defaultValue="2017-05-24"
              className={classes.textField}
              required={true}
              InputProps={
                {
                  className: classes.cardCategoryWhite,
                  disableUnderline: true
                }
              }
              inputProps={
                {
                  className: classes.textFieldInput
                }
              }
            />


          </div>
        </CardHeader>
        <CardBody>
          {(!isFetching)
            ? (data && data.length > 1)
              ? (!production0)
                ? <AreaChart data={data} color={color} ratio={1} dataType={dataType} type="hybrid" />
                : <div className={classes.progress}><FormattedMessage id="chart.no_production" /></div>
              : <div className={classes.progress}><FormattedMessage id="chart.no_data" /></div>
            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`] }} size={50} /></div>
                }
        </CardBody>
      </Card>
    );
  }
}

ChartBoxProduction.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  day: PropTypes.string,
  dataType: PropTypes.string,
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isFetching: PropTypes.bool,
  inverterDailyFetch: PropTypes.func,
  addElementToHome: PropTypes.func,
  removeElementFromHome: PropTypes.func,
  boxType: PropTypes.string,
  isInHome: PropTypes.bool
};
ChartBoxProduction.defaultProps = {
  day: moment().format('YYYYMMDD'),
  dataType: 'power',
  color: 'warning',
  title: 'Title',
  subtitle: 'Data of {day}',
  isFetching: false,
};

export default withStyles(boxStyle)(injectIntl(ChartBoxProduction));
