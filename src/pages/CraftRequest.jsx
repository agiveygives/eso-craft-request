import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ContentContainer from 'terra-content-container';
import '../App.css';
import Heading from 'terra-heading';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import LevelSlider from '../components/LevelSlider/LevelSlider';
import PaymentOption from '../components/PaymentOption/PaymentOption'
import FormInput from '../components/FormInput/FormInput';
import GearSection from '../components/GearSection/GearSection';
import TermsOfUse from '../components/TermsOfUse/TermsOfUse';
import Confirmation from '../components/Confirmation/Confirmation';
import RequestAlert from '../components/RequestAlert/RequestAlert';
import MatsDrawer from '../components/MatsDrawer/MatsDrawer'

const drawerWidth = '20%'

const propTypes = {
  termsAccepted: PropTypes.bool.isRequired,
}

const useStyles = makeStyles(theme => ({
  appStyle: {
    backgroundColor: '#26262b',
    color: '#dddacb',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  shift: {
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.4
  },
  hide: {
    display: 'none',
  },
  wrapper: {
    margin: '1.4rem'
  },
}))

const CraftRequest = ({ termsAccepted }) => {
  const classes = useStyles();
  const [matsDrawerOpen, setMatsDrawerOpen] = React.useState(false);

  return (
    <ContentContainer
      className={clsx(classes.appStyle, {[classes.shift]: matsDrawerOpen})}
      fill
      header={
        <AppHeader title="ESO Craft Request" matsDrawerOpen={matsDrawerOpen} toggleMatsDrawer={setMatsDrawerOpen} />}
      footer={<AppFooter />}
    >
      <RequestAlert />
      <TermsOfUse />
      <Confirmation />
      <ContentContainer
        header={
          <Heading level={3} style={{ textAlign: 'center', color: "rgb(220, 20, 60)" }}>
            Crafters will supply a mats list or price prior to completing the request.
          </Heading>
        }
        className={clsx(classes.appStyle, (!termsAccepted && classes.disabled))}
      >
        <span className={classes.wrapper}>
          <div className="centered-div">
            <FormInput label="ESO Username" helpText="example: @JukesMcGee" />
            <LevelSlider label="Select Armor Level" craftableLevels />
          </div>
          <PaymentOption />
          <GearSection group="armor" />
          <GearSection group="jewelry" />
          <GearSection group="weapon" />
        </span>
      </ContentContainer>
      <MatsDrawer open={matsDrawerOpen} setDrawerOpen={setMatsDrawerOpen} width={drawerWidth} />
    </ContentContainer>
  );
};

CraftRequest.propTypes = propTypes;

const mapStateToProps = state => ({
  termsAccepted: state.termsAccepted
});

export default connect(mapStateToProps)(CraftRequest);
