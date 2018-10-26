import React from "react";
import boxStyle from '../style/boxStyle'
import {withStyles} from "@material-ui/core";
import {FormattedMessage, FormattedNumber, FormattedDate, FormattedTime, injectIntl} from "react-intl";
import OfflineBolt from "@material-ui/icons/OfflineBolt";
import Card from "../../../component/Card/Card.jsx";
import CardHeader from "../../../component/Card/CardHeader.jsx";
import CardIcon from "../../../component/Card/CardIcon.jsx";
import CardBody from "../../../component/Card/CardBody.jsx";
import CardFooter from "../../../component/Card/CardFooter.jsx";

import DateRange from "@material-ui/icons/DateRange";
import PropTypes from "prop-types";
import moment from "moment";


class InformativeBox extends React.Component
{
    constructor(props){
        super(props);
        let { dataType } = this.props;
        props.productionTotalsFetch();
    }

 render()
    {
        const {classes, id, color} = this.props;
        const {value, dataType, lastUpdate} = this.props;

        return <Card>
                <CardHeader color={color} className="dragHeader" stats icon>
                    <CardIcon color={color}>
                        <OfflineBolt/>
                    </CardIcon>
                    <p className={classes.cardCategory}>
                        <FormattedMessage
                            id={ 'informative.total.'+dataType+'.title' }
                        /></p>
                    <h3 className={classes.cardTitle}><FormattedNumber value={value/1000||0}/>Kw</h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <DateRange/>
                        <FormattedMessage
                            id={ 'last.update' }
                            defaultMessage={ 'Last update' }
                        />
                        {" "}
                        {(lastUpdate)?[<FormattedDate key={0} value={lastUpdate}/>," ",<FormattedTime key={1} value={lastUpdate}/>]:"-"}
                    </div>
                </CardFooter>
            </Card>;
    }
}

InformativeBox.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number,
    lastUpdate: PropTypes.instanceOf(Date),
    dataType: PropTypes.oneOf([
                    "lifetime",
                    "yearly",
                    "montly",
                    "weekly"
                ]),
    id: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
        "warning",
        "success",
        "danger",
        "info",
        "primary",
        "rose"
    ]),
    productionTotalsFetch: PropTypes.func
};
InformativeBox.defaultProps = {
    day: moment().format('YYYYMMDD'),
    dataType: "lifetime",
    color: "warning"
};


export default withStyles(boxStyle)(injectIntl(InformativeBox));
