import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import TextField from '@material-ui/core/TextField';


import Radio from '@material-ui/core/Radio';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';


import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/DeleteOutline';

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import classNames from 'classnames';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { addNotification, configurationAdd, configurationFetch } from '../../redux/actions';
import basicsStyle from '../../component/style/basicsStyle.jsx';
import Table from '../../component/table/TableGrid';
import avatar from '../../resources/images/bill.jpg';
import CardFooter from '../../component/card/CardFooter';
import CardBody from '../../component/card/CardBody';
import CardAvatar from '../../component/card/CardAvatar';
import CardHeader from '../../component/card/CardHeader';
import Card from '../../component/card/Card';
import Button from '../../component/customButtons/Button';
import CustomInput from '../../component/customInput/CustomInput';
import GridContainer from '../../component/grid/GridContainer';
import GridItem from '../../component/grid/GridItem';
import Overlay from '../../component/overlay/Overlay';

import GTMs from '../../utils/locale/GTMs';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

function shallowCompare(newObj, prevObj) {
  for (const key in newObj) {
    if (newObj[key] !== prevObj[key]) return true;
  }
  return false;
}

class ConfigurationPage extends React.PureComponent {
  constructor(props) {
    super(props);

    // let serverConfiguration = (props.configuration && props.configuration)?props.configuration:null;

    const messagesIntl = defineMessages(
      {
        subject: { id: 'configuration.email.notification.subject.default' },
        notificationProblem: { id: 'configuration.email.notification.problem.default' },
        notificationNoProblem: { id: 'configuration.email.notification.no_problem.default' }
      }
    );


    this.state = {
      preferences: {
        GTM: {
          timeZoneId: 30, gmtAdjustment: 'GMT+00:00', useDaylightTime: 1, value: 0, description: '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London'
        }
      },
      server: {
        isStatic: false,
        address: '',
        gatway: '',
        netMask: '',

        dns1: '',
        dns2: ''
      },
      serverSMTP: {
        server: 'smtp.gmail.com',
        port: 465,
        login: '',
        password: '',
        from: ''
      },
      emailNotification: {
        isNotificationEnabled: false,
        subject: this.props.intl.formatMessage(messagesIntl.subject),
        messageProblem: this.props.intl.formatMessage(messagesIntl.notificationProblem),
        messageNoProblem: this.props.intl.formatMessage(messagesIntl.notificationNoProblem),
        emailList: [/* ['renzo.mischianti@gmail.com',"Renzo Mischianti", 1, 0, 0, 2] */]
      },

      // MODAL DATA
      email: '',
      name: '',
      optionAlarm: 'none',
      optionState: 'none',
      optionChannel1: 'none',
      optionChannel2: 'none',

      // Modal status
      insertEmailModal: false,

      // Password textfield
      showPassword: false
    };
  }


  componentDidMount() {
    this.props.configurationFetch();
  }

  componentDidUpdate(oldProps) {
    if
    ((this.props.configuration != null && oldProps.configuration === null)
      || (this.props.configuration != null && oldProps.configuration != null && shallowCompare(this.props.configuration.server, oldProps.configuration.server))) {
      this.setState({
        server: { ...this.state.server, ...this.props.configuration.server },
        serverSMTP: { ...this.state.serverSMTP, ...this.props.configuration.serverSMTP },
        emailNotification: { ...this.state.emailNotification, ...this.props.configuration.emailNotification }
      });
    }
  }

  handlePreferencesChange = (event) => {
    this.setState({
      preferences: {
        ...this.state.preferences,
        ...{ [event.target.name]: GTMs[GTMs.findIndex(g => g.timeZoneId === event.target.value)] }
      }
    });
  };

  handleSMTPServerChange = (event) => {
    this.setState({
      serverSMTP: {
        ...this.state.serverSMTP,
        ...{ [event.target.name]: event.target.value }
      }
    });
  };

  handleServerChange = (event) => {
    this.setState({
      server: {
        ...this.state.server,
        ...{ [event.target.name]: (event.target.name === 'isStatic') ? event.target.checked : event.target.value }
      }
    });
  };

  handleChangeEnabled = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickOpen = (modal) => {
    const x = [];
    x[modal] = true;
    this.setState(x);
  };

  handleClose = (modal) => {
    const x = [];
    x[modal] = false;
    this.setState(x);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  postConfigurationUpdate = type => (event) => {
    const { configuration, configurationFieldUpdated, configurationAdd } = this.props;
    const { server } = this.state;

    configurationFieldUpdated({ [type]: this.state[type] });
    configurationAdd(event);
  };

  addEmailToListNotification = (event) => {
    event.preventDefault();

    this.setState({
      emailNotification: {
        ...this.state.emailNotification,
        emailList: [
          ...this.state.emailNotification.emailList,
          {
            email: this.state.email,
            name: this.state.name,
            alarm: this.state.optionAlarm,
            ch1: this.state.optionChannel1,
            ch2: this.state.optionChannel2,
            state: this.state.optionState
          }
        ]
      },
      // MODAL DATA
      email: '',
      name: '',
      optionAlarm: 'none',
      optionState: 'none',
      optionChannel1: 'none',
      optionChannel2: 'none',

    });

    this.handleClose('insertEmailModal');
  };

  handleEmailNotificationChange = (event) => {
    this.setState({
      emailNotification: {
        ...this.state.emailNotification,
        ...{ [event.target.name]: (event.target.name === 'isNotificationEnabled') ? event.target.checked : event.target.value }
      }
    });
  };

  deleteModalTableElement = (idElement) => {
    const el = this.state.emailNotification.emailList;
    el.splice(idElement, 1);
    this.setState({
      emailNotification: {
        emailList: [
          ...el
        ]
      },
    });
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

    const labelAlertSelected = { none: messagesIntl.nothing, on_problem: messagesIntl.alert, all: messagesIntl.ever };

    const { classes, configuration, isFetching } = this.props;
    return (
      <div>
        <Overlay visible={isFetching} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage
                        id="configuration.preferences.title"
                      />
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      <FormattedMessage
                        id="configuration.preferences.subtitle"
                      />
                    </p>
                  </CardHeader>
                  <form onSubmit={this.postConfigurationUpdate('preferences')}>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl className={classNames(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="age-simple">
                              <FormattedMessage id="configuration.preferences.timesones.label" />
                            </InputLabel>
                            <Select
                              value={this.state.preferences.GTM.timeZoneId}
                              onChange={this.handlePreferencesChange}

                              inputProps={{
                                name: 'GTM',
                                id: 'GTM',
                              }}
                            >
                              {GTMs.map(t => <MenuItem key={t.timeZoneId} value={t.timeZoneId}>{t.description}</MenuItem>)}
                            </Select>
                          </FormControl>
                        </GridItem>
                      </GridContainer>

                    </CardBody>
                    <CardFooter>
                      <Button color="primary" type="submit">
                        <FormattedMessage
                          id="configuration.preferences.update"
                        />
                      </Button>
                    </CardFooter>
                  </form>

                </Card>
              </GridItem>
            </GridContainer>
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
                  <form onSubmit={this.postConfigurationUpdate('server')}>
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
                            label={<FormattedMessage id="configuration.network.staticIP.label" />}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            required
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
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            required
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
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            required
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
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            required
                            id="dns1"
                            name="dns1"
                            label="DNS 1"
                            fullWidth
                            className={classes.textField}
                            value={this.state.server.dns1}
                            onChange={this.handleServerChange}
                            margin="normal"
                            variant="standard"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            required
                            id="dns2"
                            name="dns2"
                            label="DNS 2"
                            fullWidth
                            className={classes.textField}
                            value={this.state.server.dns2}
                            onChange={this.handleServerChange}
                            margin="normal"
                            variant="standard"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          &nbsp;
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button color="primary" type="submit">
                        <FormattedMessage
                          id="configuration.network.update"
                        />
                      </Button>
                    </CardFooter>
                  </form>

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
                  <form onSubmit={this.postConfigurationUpdate('serverSMTP')}>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                          <TextField
                            required

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
                            required

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
                            <Grid item style={{ width: 'calc(100% - 32px)' }}>
                              <TextField
                                required

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
                          <FormControl
                            required
                            className={classNames(classes.margin, classes.textField)}
                          >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input


                              id="password"
                              name="password"
                              type={this.state.showPassword ? 'text' : 'password'}
                              value={this.state.serverSMTP.password}
                              onChange={this.handleSMTPServerChange}
                              endAdornment={(
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                  >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
)}
                            />
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            required

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
                      <Button color="primary" type="submit">
                        <FormattedMessage
                          id="configuration.smtpserver.update"
                        />
                      </Button>
                    </CardFooter>
                  </form>
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
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={this.state.insertEmailModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.handleClose('insertEmailModal')}
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
                      onClick={() => this.handleClose('insertEmailModal')}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>
                      <FormattedMessage
                        id="configuration.email.notification.add.modal.title"
                      />
                    </h4>
                  </DialogTitle>
                  <form onSubmit={this.addEmailToListNotification}>

                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            required
                            id="email-input"
                            label={this.props.intl.formatMessage(messagesIntl.email)}
                            fullWidth
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="standard"
                            value={this.state.email}
                            onChange={this.handleChangeEnabled}

                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            required
                            id="name-input"
                            name="name"
                            label={this.props.intl.formatMessage(messagesIntl.name)}
                            fullWidth
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChangeEnabled}
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
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionAlarm === 'none'}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionAlarm"
                                  aria-label="Email allarme"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.no_email"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionAlarm === 'on_problem'}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionAlarm"
                                  aria-label="Email allarme"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.first_alarm"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionAlarm === 'all'}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionAlarm"
                                  aria-label="Email allarme"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.all_state_change"
                                />
)}
                            />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <div className={classes.title}>
                            <h6>State</h6>
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionState === 'none'}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionState"
                                  aria-label="Email state"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.no_email"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionState === 'on_problem'}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionState"
                                  aria-label="Email state"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.no_run"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionState === 'all'}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionState"
                                  aria-label="Email state"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.all_state_change"
                                />
)}
                            />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <div className={classes.title}>
                            <h6>Channel 1</h6>
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionChannel1 === 'none'}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionChannel1"
                                  aria-label="Email channel1"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.no_email"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionChannel1 === 'on_problem'}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionChannel1"
                                  aria-label="Email channel1"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.no_MPPT"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionChannel1 === 'all'}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionChannel1"
                                  aria-label="Email channel 1"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.all_state_change"
                                />
)}
                            />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <div className={classes.title}>
                            <h6>Channel 2</h6>
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionChannel2 === 'none'}
                                  onChange={this.handleChangeEnabled}
                                  value="none"
                                  name="optionChannel2"
                                  aria-label="Email chanel 2"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.no_email"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionChannel2 === 'on_problem'}
                                  onChange={this.handleChangeEnabled}
                                  value="on_problem"
                                  name="optionChannel2"
                                  aria-label="Email chanel 2"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.no_MPPT"
                                />
)}
                            />
                          </div>
                          <div
                            className={
                              `${classes.checkboxAndRadio
                              } ${
                                classes.checkboxAndRadioHorizontal}`
                            }
                          >
                            <FormControlLabel
                              control={(
                                <Radio
                                  checked={this.state.optionChannel2 === 'all'}
                                  onChange={this.handleChangeEnabled}
                                  value="all"
                                  name="optionChannel2"
                                  aria-label="Email state"
                                  icon={(
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
)}
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
)}
                              classes={{
                                label: classes.label
                              }}
                              label={(
                                <FormattedMessage
                                  id="configuration.email.notification.add.modal.all_state_change"
                                />
)}
                            />
                          </div>
                        </GridItem>
                      </GridContainer>
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      <Button color="transparent" type="submit">
                        Add email to list
                      </Button>
                      <Button
                        onClick={() => this.handleClose('insertEmailModal')}
                        color="danger"
                        simple
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </form>

                </Dialog>

                <form onSubmit={this.postConfigurationUpdate('emailNotification')}>

                  <CardBody>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControlLabel
                          control={(
                            <Switch
                              checked={this.state.emailNotification.isNotificationEnabled}
                              onChange={this.handleEmailNotificationChange}
                              value="isNotificationEnabled"
                              name="isNotificationEnabled"
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
                          label={<FormattedMessage id="configuration.email.notification.enabled.label" />}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Table
                          className={classes.tableSize}
                          tableHeaderColor="primary"
                          tableHead={[
                            this.props.intl.formatMessage(messagesIntl.email),
                            this.props.intl.formatMessage(messagesIntl.name),
                            this.props.intl.formatMessage(messagesIntl.alarms),
                            this.props.intl.formatMessage(messagesIntl.channel1),
                            this.props.intl.formatMessage(messagesIntl.channel2),
                            this.props.intl.formatMessage(messagesIntl.states),
                            ''
                          ]}
                          tableData={this.state.emailNotification.emailList.map((elem, idx) => [
                            elem.email,
                            elem.name,
                            this.props.intl.formatMessage({ ...labelAlertSelected[elem.alarm] }),
                            this.props.intl.formatMessage({ ...labelAlertSelected[elem.ch1] }),
                            this.props.intl.formatMessage({ ...labelAlertSelected[elem.ch2] }),
                            this.props.intl.formatMessage({ ...labelAlertSelected[elem.state] }),
                            <Delete onClick={() => this.deleteModalTableElement(idx)} />
                          ]
                            // return elem.map((valueRow, index)=>{
                            //   if (index>1){
                            //     return this.props.intl.formatMessage({...labelAlertSelected[valueRow]});
                            //   }else{
                            //     return valueRow;
                            //   }
                            // })
                          )}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>

                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Button
                          color="primary"
                          block
                          onClick={() => this.handleClickOpen('insertEmailModal')}
                        >
                          <Add className={classes.icon} />
                          <FormattedMessage
                            id="configuration.email.notification.add"
                          />
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          required
                          id="subject"
                          label={(
                            <FormattedMessage
                              id="configuration.email.notification.subject.label"
                            />
)}
                          style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          value={this.state.emailNotification.subject}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          required
                          id="problem-find"
                          label={(
                            <FormattedMessage
                              id="configuration.email.notification.problem.label"
                            />
)}
                          style={{ margin: 8 }}
                          helperText={(
                            <FormattedMessage
                              id="configuration.email.notification.problem.helper"
                            />
)}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          value={this.state.emailNotification.messageProblem}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          required
                          id="problem-resolved"
                          label={(
                            <FormattedMessage
                              id="configuration.email.notification.no_problem.label"
                            />
)}
                          style={{ margin: 8 }}
                          // placeholder="Placeholder"
                          helperText={(
                            <FormattedMessage
                              id="configuration.email.notification.no_problem.helper"
                            />
)}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          value={this.state.emailNotification.messageNoProblem}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </GridItem>

                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" type="submit">
                      <FormattedMessage
                        id="configuration.email.notification.update"
                      />
                    </Button>
                  </CardFooter>
                </form>
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
  classes: PropTypes.object.isRequired,
  configurationFetch: PropTypes.func.isRequired,
  configurationAdd: PropTypes.func.isRequired,
  // addNotification: PropTypes.func.isRequired,
  configurationFieldUpdated: PropTypes.func.isRequired
};

export default withStyles(basicsStyle)(injectIntl(ConfigurationPage));
