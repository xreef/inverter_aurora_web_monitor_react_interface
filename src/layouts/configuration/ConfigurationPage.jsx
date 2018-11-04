import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import GridItem from '../../component/grid/GridItem';
import GridContainer from '../../component/grid/GridContainer';
import CustomInput from '../../component/customInput/CustomInput';
import Button from '../../component/customButtons/Button';
import Card from '../../component/card/Card';
import CardHeader from '../../component/card/CardHeader';
import CardAvatar from '../../component/card/CardAvatar';
import CardBody from '../../component/card/CardBody';
import CardFooter from '../../component/card/CardFooter';

import TextField from '@material-ui/core/TextField';

import avatar from '../../resources/images/bill.jpg';
import Table from '../../component/table/TableGrid';

import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import basicsStyle from "../../component/style/basicsStyle.jsx";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Add from '@material-ui/icons/Add';
import Close from "@material-ui/icons/Close";
import { configurationFetch } from '../../redux/actions';

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import classNames from 'classnames';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

function shallowCompare(newObj, prevObj){
  for (let key in newObj){
    if(newObj[key] !== prevObj[key]) return true;
  }
  return false;
}

class ConfigurationPage extends React.PureComponent  {
  constructor(props) {
    super(props);

    let serverConfiguration = (props.configuration && props.configuration)?props.configuration:null;

    this.state = {
      server: {
        ...{
          isStatic: false,
          address: "",
          gatway: "",
          netMask: ""
        },
        ...serverConfiguration
      },
      serverSMTP:{
        server: "smtp.google.com",
        port: 465,
        login: "",
        password: "",
        from: ""
      },
      emailNotification: {
        subject: "Rilevato un problema all'inverter",
        message: "E' stato rilevato un problema all'inverter, per il dettaglio accedere al sito: ",
        emailList: [['renzo.mischianti@gmail.com',"Renzo Mischianti", 1, 0, 0, 2]]
      },
      optionAlarm: "none",
      optionState: "none",
      optionChannel1: "none",
      optionChannel2: "none",
      insertEmailModal: false,
      showPassword: "password"
    };
  }



  componentDidMount(){
    this.props.configurationFetch();
  }

  componentDidUpdate(oldProps) {
    if
    ((this.props.configuration!=null && oldProps.configuration===null)
      ||
      (this.props.configuration!=null && oldProps.configuration!= null && shallowCompare(this.props.configuration.server, oldProps.configuration.server))) {
      this.setState({server: this.props.configuration.server})
    }

  }
  // static getDerivedStateFromProps(props, state) {
  //   // Any time the current user changes,
  //   // Reset any parts of state that are tied to that user.
  //   // In this simple example, that's just the email.
  //   if (
  //     (this.props.configuration===null && props.configuration)
  //     ||
  //     props.configuration && props.configuration.server && props.configuration.server.isStatic !== state.staticIP
  //   ) {
  //     return {
  //       staticIP: props.configuration.server.isStatic
  //     };
  //   }
  //   return null;
  // }

  handleSMTPServerChange = event => {
      this.setState({ serverSMTP: {
          ...this.state.serverSMTP,
          ...{[event.target.name]: event.target.value}}} );

  };

  handleServerChange = event => {
    this.setState({ server: {
        ...this.state.server,
        ...{[event.target.name]: (event.target.name==='isStatic')?event.target.checked:event.target.value}} });

  };

  // handleChange = event => {
  //   this.setState({ server: {
  //       ...this.state.server,
  //       ...{isStatic: event.target.checked}} });
  // };
  //
  handleChangeEnabled = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen = (modal) => {
    var x = [];
    x[modal] = true;
    this.setState(x);
  };
  handleClose = (modal) => {
    var x = [];
    x[modal] = false;
    this.setState(x);
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const messagesIntl = defineMessages(
      {
        email: { id: 'configuration.email.table.email' },
        name: { id: 'configuration.email.table.name' },
        alarms: { id: 'configuration.email.table.alarms' },
        channel1: { id: 'configuration.email.table.channel1' },
        channel2: { id: 'configuration.email.table.channel2' },
        states: { id: 'configuration.email.table.states' },

        alert: { id: 'configuration.email.table.value.alert' },
        nothing: { id: 'configuration.email.table.value.nothing' },
        ever: { id: 'configuration.email.table.value.ever' }
      }
    );

    const labelAlertSelected = [messagesIntl.nothing, messagesIntl.alert, messagesIntl.ever];

    const { classes, configuration } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage
                    id="configuration.network.title"
                  />
                </h4>
                <p className={classes.cardCategoryWhite}>
                  <FormattedMessage
                    id="configuration.network.subtitle"
                  />
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                      <FormControlLabel
                        control={(
                          <Switch
                            checked={this.state.server.isStatic}
                            onChange={this.handleServerChange}
                            value="isStatic"
                            name="isStatic"
                            color="primary"
                            classes={{
                              switchBase: classes.switchBase,
                              checked: classes.switchChecked,
                              icon: classes.switchIcon,
                              iconChecked: classes.switchIconChecked,
                              bar: classes.switchBar
                            }}
                          />
)}
                        classes={{
                          label: classes.label
                        }}
                        label={ <FormattedMessage id="configuration.network.staticIP.label" />}
                      />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="address"
                      name="address"
                      label="IP"
                      fullWidth
                      className={classes.textField}
                      value={this.state.server.address}
                      onChange={this.handleServerChange}
                      margin="normal"
                      variant="standard"
                    />

                    {/*<CustomInput*/}
                      {/*labelText="IP"*/}
                      {/*id="ip_address"*/}
                      {/*formControlProps={{*/}
                        {/*fullWidth: true*/}
                      {/*}}*/}
                    {/*/>*/}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="gatway"
                      name="gatway"
                      label="Gatway"
                      fullWidth
                      className={classes.textField}
                      value={this.state.server.gatway}
                      onChange={this.handleServerChange}
                      margin="normal"
                      variant="standard"
                    />

                    {/*<CustomInput*/}
                      {/*labelText="Gatway"*/}
                      {/*id="gatway"*/}
                      {/*formControlProps={{*/}
                        {/*fullWidth: true*/}
                      {/*}}*/}
                    {/*/>*/}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="netMask"
                      name="netMask"
                      label="SubNet Mask"
                      fullWidth
                      className={classes.textField}
                      value={this.state.server.netMask}
                      onChange={this.handleServerChange}
                      margin="normal"
                      variant="standard"
                    />

                    {/*<CustomInput*/}
                      {/*labelText="Subnet Mask"*/}
                      {/*id="subnet_mask"*/}
                      {/*formControlProps={{*/}
                        {/*fullWidth: true*/}
                      {/*}}*/}
                    {/*/>*/}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary"><FormattedMessage
                  id="configuration.network.update"
                /></Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
            <GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage
                        id="configuration.smtpserver.title"
                      />
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      <FormattedMessage
                        id="configuration.smtpserver.subtitle"
                      />
                    </p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <TextField
                          id="server"
                          name="server"
                          label="SMTP Server"
                          fullWidth
                          className={classes.textField}
                          value={this.state.serverSMTP.server}
                          onChange={this.handleSMTPServerChange}
                          margin="normal"
                          variant="standard"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id="SMTPPort"
                          name="SMTPPort"
                          label="SMTP Port"
                          type="number"
                          fullWidth
                          className={classes.textField}
                          value={this.state.serverSMTP.port}
                          onChange={this.handleSMTPServerChange}
                          margin="normal"
                          variant="standard"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                          <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                              <AccountCircle />
                            </Grid>
                            <Grid item style={{width: "calc(100% - 32px)"}}>
                              <TextField
                                id="login"
                                name="login"
                                label="Login"
                                fullWidth
                                className={classes.textField}
                                value={this.state.serverSMTP.login}
                                onChange={this.handleSMTPServerChange}
                                // margin="normal"
                                variant="standard"
                              />
                            </Grid>
                          </Grid>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <FormControl className={classNames(classes.margin, classes.textField)}>
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input
                            id="password"
                            name="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.serverSMTP.password}
                            onChange={this.handleSMTPServerChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="email-from-input"
                          label="EMail from"
                          value={this.state.serverSMTP.from}
                          onChange={this.handleSMTPServerChange}
                          fullWidth
                          className={classes.textField}
                          type="email"
                          name="from"
                          autoComplete="email"
                          margin="normal"
                          variant="standard"
                        />

                      </GridItem>

                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary"><FormattedMessage
                      id="configuration.smtpserver.update"
                    /></Button>
                  </CardFooter>
                </Card>
              </GridItem>

            </GridContainer>
        <GridContainer>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage
                  id="configuration.email.notification.title"
                />
              </h4>
              <p className={classes.cardCategoryWhite}>
                <FormattedMessage
                  id="configuration.email.notification.subtitle"
                />
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}  >
                  <Table
                    className={classes.tableSize}
                    tableHeaderColor="primary"
                    tableHead={[
                      this.props.intl.formatMessage(messagesIntl.email),
                      this.props.intl.formatMessage(messagesIntl.name),
                      this.props.intl.formatMessage(messagesIntl.alarms),
                      this.props.intl.formatMessage(messagesIntl.channel1),
                      this.props.intl.formatMessage(messagesIntl.channel2),
                      this.props.intl.formatMessage(messagesIntl.states)
                    ]}
                    tableData={this.state.emailNotification.emailList.map(elem => {
                      return elem.map((valueRow, index)=>{
                        if (index>1){
                          return this.props.intl.formatMessage({...labelAlertSelected[valueRow]});
                        }else{
                          return valueRow;
                        }
                      })
                    })}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>

                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <Button
                    color="primary"
                    block
                    onClick={() => this.handleClickOpen("insertEmailModal")}
                  >
                    <Add className={classes.icon} /><FormattedMessage
                                                    id="configuration.email.notification.add"
                                                  />
                  </Button>
                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal
                    }}
                    open={this.state.insertEmailModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose("insertEmailModal")}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => this.handleClose("insertEmailModal")}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                      <h4 className={classes.modalTitle}><FormattedMessage
                                                          id="configuration.email.notification.add.modal.title"
                                                        /></h4>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            id="email-input"
                            label={this.props.intl.formatMessage(messagesIntl.email)}
                            fullWidth
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="standard"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            id="name-input"
                            label={this.props.intl.formatMessage(messagesIntl.name)}
                            fullWidth
                            className={classes.textField}
                            // value={this.state.name}
                            // onChange={this.handleChange('name')}
                            margin="normal"
                            variant="standard"
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                          <div className={classes.title}>
                            <h6>Alarms</h6>
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionAlarm === "none"}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionAlarm"
                                  aria-label="Email allarme"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                      id="configuration.email.notification.add.modal.no_email"
                                    />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionAlarm === "on_problem"}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionAlarm"
                                  aria-label="Email allarme"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.first_alarm"
                              />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionAlarm === "all"}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionAlarm"
                                  aria-label="Email allarme"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.all_state_change"
                              />}
                            />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <div className={classes.title}>
                            <h6>State</h6>
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionState === "none"}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionState"
                                  aria-label="Email state"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.no_email"
                              />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionState === "on_problem"}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionState"
                                  aria-label="Email state"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.no_run"
                              />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionState === "all"}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionState"
                                  aria-label="Email state"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.all_state_change"
                              />}
                            />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <div className={classes.title}>
                            <h6>Channel 1</h6>
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionChannel1 === "none"}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionChannel1"
                                  aria-label="Email channel1"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.no_email"
                              />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionChannel1 === "on_problem"}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionChannel1"
                                  aria-label="Email channel1"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.no_MPPT"
                              />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionChannel1 === "all"}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionChannel1"
                                  aria-label="Email channel 1"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.all_state_change"
                              />}
                            />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <div className={classes.title}>
                            <h6>Channel 2</h6>
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionChannel2 === "none"}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionChannel2"
                                  aria-label="Email chanel 2"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.no_email"
                              />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionChannel2 === "on_problem"}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionChannel2"
                                  aria-label="Email chanel 2"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.no_MPPT"
                              />}
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={this.state.optionChannel2 === "all"}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionChannel2"
                                  aria-label="Email state"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label={<FormattedMessage
                                id="configuration.email.notification.add.modal.all_state_change"
                              />}
                            />
                          </div>
                        </GridItem>
                      </GridContainer>
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      <Button color="transparent" simple>
                        Nice Button
                      </Button>
                      <Button
                        onClick={() => this.handleClose("insertEmailModal")}
                        color="danger"
                        simple
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </GridItem>
              </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="subject"
                    label="Soggetto"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="problem-find"
                    label="Testo rilevamento problema"
                    style={{ margin: 8 }}
                    helperText="Sarà il testo che riceverai al rilevamento di un problema!"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="problem-resolved"
                    label="Testo risoluzione problema"
                    style={{ margin: 8 }}
                    // placeholder="Placeholder"
                    helperText="Sarà il testo che riceverai alla risoluzione di un problema!"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary"><FormattedMessage
                id="configuration.email.notification.update"
              /></Button>
            </CardFooter>
          </Card>
        </GridContainer>
          </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>CREATOR</h6>
                  <h4 className={classes.cardTitle}>Renzo Mischianti</h4>
                  <p className={classes.description}>
                    Ciao
                  </p>
                  <Button color="primary" round>
                    Follow
                  </Button>
                </CardBody>
              </Card>
            </GridItem>

        </GridContainer>
      </div>
    );
  }
}
ConfigurationPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(basicsStyle)(injectIntl(ConfigurationPage));
