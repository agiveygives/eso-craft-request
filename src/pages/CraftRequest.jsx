import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import ContentContainer from 'terra-content-container';
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

const propTypes = {
  termsAccepted: PropTypes.bool.isRequired
}

const appStyle = {
  backgroundColor: '#26262b',
  color: '#dddacb'
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: '1.4rem'
  }
}))

const CraftRequest = ({ termsAccepted }) => {
  const classes = useStyles();

  return (
    <ContentContainer
      style={appStyle}
      fill
      header={<AppHeader title="Craft Request" />}
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
        style={termsAccepted ? { ...appStyle } : { ...appStyle, pointerEvents: 'none', opacity: 0.4 }}
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
    </ContentContainer>
  );
};

CraftRequest.propTypes = propTypes;

const mapStateToProps = state => ({
  termsAccepted: state.termsAccepted
});

export default connect(mapStateToProps)(CraftRequest);
