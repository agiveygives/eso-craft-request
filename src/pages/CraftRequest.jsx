import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ContentContainer from 'terra-content-container';
import '../App.css';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import LevelSlider from '../components/LevelSlider/LevelSlider';
import PaymentOption from '../components/PaymentOption/PaymentOption';
import FormInput from '../components/FormInput/FormInput';
import GearSection from '../components/GearSection/GearSection';
import TermsOfUse from '../components/TermsOfUse/TermsOfUse';
import Confirmation from '../components/Confirmation/Confirmation';
import RequestAlert from '../components/RequestAlert/RequestAlert';
import MatsDrawer from '../components/MatsDrawer/MatsDrawer';
import RequestNotes from '../components/RequestNotes';
import { TERMS_RESPONSE } from '../store/constants';

const drawerWidth = '20%';

const propTypes = {
  termsAccepted: PropTypes.bool.isRequired,
  guildMnemonic: PropTypes.string.isRequired,
  acceptTerms: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  appStyle: {
    height: '100vh',
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
    opacity: 0.4,
  },
  hide: {
    display: 'none',
  },
  wrapper: {
    margin: '1.4rem',
  },
}));

const CraftRequest = ({ termsAccepted, guildMnemonic, acceptTerms }) => {
  const intl = useIntl();
  const pageRef = React.useRef(null);
  const classes = useStyles();
  const [matsDrawerOpen, setMatsDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    if (guildMnemonic !== 'demo') acceptTerms(true);
  }, [guildMnemonic, acceptTerms]);

  return (
    <ContentContainer
      className={clsx(classes.appStyle, { [classes.shift]: matsDrawerOpen })}
      fill
      header={(
        <AppHeader
          title={intl.formatMessage({ id: 'AppName' })}
          matsDrawerOpen={matsDrawerOpen}
          toggleMatsDrawer={setMatsDrawerOpen}
        />
      )}
      footer={<AppFooter ref={pageRef} />}
    >
      <RequestAlert />
      {guildMnemonic === 'demo' ? <TermsOfUse /> : <></>}
      <Confirmation />
      <div className={clsx(classes.appStyle, (!termsAccepted && classes.disabled))}>
        <span className={classes.wrapper}>
          <div className="centered-div">
            <FormInput
              label={intl.formatMessage({ id: 'user.username' })}
              helpText={intl.formatMessage({ id: 'user.usernameExample' })}
            />
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
    </ContentContainer>
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
