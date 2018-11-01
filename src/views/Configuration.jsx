import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormattedMessage } from 'react-intl';
import GridItem from '../component/grid/GridItem';
import GridContainer from '../component/grid/GridContainer';
import CustomInput from '../component/customInput/CustomInput';
import Button from '../component/customButtons/Button';
import Card from '../component/card/Card';
import CardHeader from '../component/card/CardHeader';
import CardAvatar from '../component/card/CardAvatar';
import CardBody from '../component/card/CardBody';
import CardFooter from '../component/card/CardFooter';

import TextField from '@material-ui/core/TextField';

import avatar from '../resources/images/bill.jpg';
import Table from '../component/table/TableGrid';

import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import basicsStyle from "../component/style/basicsStyle.jsx";


class Configuration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staticIP: false,
      optionAlarm: "none",
      optionState: "none",
      optionChannel1: "none",
      optionChannel2: "none"
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeEnabled = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
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
                            checked={this.state.staticIP}
                            onChange={this.handleChange('staticIP')}
                            value="checkedA"
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
                    <CustomInput
                      labelText="IP"
                      id="ip_address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Gatway"
                      id="gatway"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Subnet Mask"
                      id="subnet_mask"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Update network configuration</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
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
                    tableHead={["Email", "Name", "Alarms", "Channel 1", "Channel 2", "States"]}
                    tableData={[['renzo.mischianti@gmail.com', "Renzo Mischianti", "Alert", "Nessuna", "Nessuna", "Sempre"]]}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer style={{backgroundColor: "lightgrey"}}>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="email-input"
                    label="Email"
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
                    label="Name"
                    fullWidth
                    className={classes.textField}
                    // value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                    variant="standard"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer style={{backgroundColor: "lightgrey"}}>
                <GridItem xs={12} sm={6} md={4}>
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
                        label="Nessuna email"
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
                        label="Email al primo allarme"
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
                        label="Email tutte variazioni allarme"
                      />
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
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
                      label="Nessuna email"
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
                      label="Email quando non più in run"
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
                      label="Email tutte variazioni stato"
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
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
                        label="Nessuna email"
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
                        label="Email al cambio stato default"
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
                        label="Email tutte variazioni cambio stato"
                      />
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
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
                      label="Nessuna email"
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
                      label="Email al cambio stato default"
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
                      label="Email tutte variazioni stato"
                    />
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update email notification configuration</Button>
              <Button color="primary">Update email notification configuration</Button>
            </CardFooter>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
Configuration.propTypes = {
  classes: PropTypes.object
};

export default withStyles(basicsStyle)(Configuration);
