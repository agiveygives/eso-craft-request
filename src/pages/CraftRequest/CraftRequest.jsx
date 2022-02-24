import React, { useEffect, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { connect } from 'react-redux';
import '../../App.css';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppFooter from '../../components/AppFooter/AppFooter';
import LevelSlider from '../../components/LevelSlider/LevelSlider';
import PaymentOption from '../../components/PaymentOption/PaymentOption';
import FormInput from '../../components/FormInput/FormInput';
import GearSection from '../../components/GearSection/GearSection';
import TermsOfUse from '../../components/TermsOfUse/TermsOfUse';
import Confirmation from '../../components/Confirmation/Confirmation';
import RequestAlert from '../../components/RequestAlert/RequestAlert';
import MatsDrawer from '../../components/MatsDrawer/MatsDrawer';
import RequestNotes from '../../components/RequestNotes';
// import GoogleAd from '../../components/GoogleAd';
import { TERMS_RESPONSE } from '../../store/constants';
import useStyles from './styles';
import propTypes from './propTypes';

const drawerWidth = '20%';

const CraftRequest = ({ termsAccepted, guildMnemonic, acceptTerms }) => {
  const intl = useIntl();
  const pageRef = useRef(null);
  const classes = useStyles();
  const [matsDrawerOpen, setMatsDrawerOpen] = useState(false);

  useEffect(() => {
    if (guildMnemonic !== 'demo') acceptTerms(true);
  }, [guildMnemonic, acceptTerms]);

  return (
    <div className={classes.appStyle}>
      <AppHeader
        title={intl.formatMessage({ id: 'AppName' })}
        matsDrawerOpen={matsDrawerOpen}
        toggleMatsDrawer={setMatsDrawerOpen}
      />
      <RequestAlert />
      {guildMnemonic === 'demo' ? <TermsOfUse /> : <></>}
      <Confirmation />
      {/* <GoogleAd slot="5302794966" /> */}
      <div className={clsx(classes.appStyle, (!termsAccepted && classes.disabled))}>
        <span className={classes.wrapper}>
          <div className="centered-div">
            <span className={classes.userNameInput}>
              <FormInput
                label={intl.formatMessage({ id: 'user.username' })}
              />
            </span>
            <LevelSlider
              label={intl.formatMessage({ id: 'user.levelSliderLabel' })}
              craftableLevels
            />
          </div>
          <PaymentOption />
          <RequestNotes />
          <GearSection group="armor" />
          <GearSection group="jewelry" />
          <GearSection group="weapon" />
        </span>
      </div>
      <MatsDrawer open={matsDrawerOpen} setDrawerOpen={setMatsDrawerOpen} width={drawerWidth} />
      <AppFooter ref={pageRef} />
    </div>
  );
};

CraftRequest.propTypes = propTypes;

const mapStateToProps = (state) => ({
  termsAccepted: state.termsAccepted,
  guildMnemonic: state.guildMnemonic,
});

const mapDispatchToProps = (dispatch) => ({
  acceptTerms: (response) => dispatch({ type: TERMS_RESPONSE, response }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CraftRequest);
