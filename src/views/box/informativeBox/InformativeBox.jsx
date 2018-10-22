import React from "react";
import boxStyle from '../style/boxStyle'
import {withStyles} from "@material-ui/core";
import {injectIntl} from "react-intl";
import OfflineBolt from "@material-ui/icons/OfflineBolt";
import Card from "../../../component/Card/Card.jsx";
import CardHeader from "../../../component/Card/CardHeader.jsx";
import CardIcon from "../../../component/Card/CardIcon.jsx";
import CardBody from "../../../component/Card/CardBody.jsx";
import CardFooter from "../../../component/Card/CardFooter.jsx";

import DateRange from "@material-ui/icons/DateRange";


class InformativeBox extends React.Component
{

 render()
    {
        const {classes, id} = this.props;

        return <Card>
                <CardHeader color="success" className="dragHeader" stats icon>
                    <CardIcon color="success">
                        <OfflineBolt/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Produzione totale</p>
                    <h3 className={classes.cardTitle}>5600Kw</h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <DateRange/>
                        Ultimo aggiornamento 12/10/2018 12:15
                    </div>
                </CardFooter>
            </Card>;
    }
}


export default withStyles(boxStyle)(injectIntl(InformativeBox));
