import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  FormattedMessage, FormattedNumber, FormattedDate, FormattedTime, injectIntl
} from 'react-intl';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import DateRange from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import boxStyle from '../style/boxStyle';
import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import CardIcon from '../../../component/card/CardIcon';
import CardFooter from '../../../component/card/CardFooter';
import Button from '../../../component/customButtons/Button';


class InformativeBox extends React.Component {
  constructor(props) {
    super(props);
    props.productionTotalsFetch();
  }

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
    const { classes, id, color } = this.props;
    const {
      value, dataType, lastUpdate, isInHome
    } = this.props;

    return (
      <Card>
        <CardHeader color={color} className="dragHeader" stats icon>
          <CardIcon color={color}>
            <OfflineBolt />
          </CardIcon>
          <p className={classes.cardCategory}>
            <FormattedMessage
              id={`informative.total.${dataType}.title`}
            />
          </p>
          <h3 className={classes.cardTitle}>
            <FormattedNumber value={value / 1000 || 0} />
Kw
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <DateRange />
            <FormattedMessage
              id="last.update"
              defaultMessage="Last update"
            />
            {' '}
            {(lastUpdate) ? [<FormattedDate key={0} value={lastUpdate} />, ' ', <FormattedTime key={1} value={lastUpdate} />] : '-'}
          </div>
          <Button color="transparent" className={classes.buttonFooter} onClick={this.handleHome}>
            {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

InformativeBox.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number,
  lastUpdate: PropTypes.instanceOf(Date),
  dataType: PropTypes.oneOf([
    'lifetime',
    'yearly',
    'montly',
    'weekly',
    'daily'
  ]),
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose'
  ]),
  productionTotalsFetch: PropTypes.func.isRequired,
  addElementToHome: PropTypes.func.isRequired,
  removeElementFromHome: PropTypes.func.isRequired,
  boxType: PropTypes.string.isRequired,
  isInHome: PropTypes.bool.isRequired
};
InformativeBox.defaultProps = {
  dataType: 'lifetime',
  color: 'warning',
  value: null,
  lastUpdate: null
};


export default withStyles(boxStyle)(injectIntl(InformativeBox));
