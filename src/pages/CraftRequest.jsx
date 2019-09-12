import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import ContentContainer from 'terra-content-container';
import Heading from 'terra-heading';
import Spacer from 'terra-spacer';
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

const CraftRequest = ({ termsAccepted }) => (
  <ContentContainer
    style={appStyle}
    fill
    header={
      <React.Fragment>
        <AppHeader title="Craft Request" />
        <RequestAlert />
      </React.Fragment>
    }
    footer={<AppFooter />}
  >
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
      <Spacer margin='large+2'>
        <div className="centered-div">
          <FormInput label="ESO Username" helpText="example: @JukesMcGee" />
          <LevelSlider label="Select Armor Level" craftableLevels />
        </div>
        <PaymentOption />
        <GearSection group="armor" />
        <GearSection group="jewelry" />
        <GearSection group="weapon" />
      </Spacer>
    </ContentContainer>
  </ContentContainer>
);

CraftRequest.propTypes = propTypes;

const mapStateToProps = state => ({
  termsAccepted: state.termsAccepted
});

export default connect(mapStateToProps)(CraftRequest);
