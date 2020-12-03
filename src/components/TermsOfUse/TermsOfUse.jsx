import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TERMS_RESPONSE } from '../../store/constants';
import Image from 'material-ui-image';
import Fab from '@material-ui/core/Fab';
import ThumbsUp from '@material-ui/icons/ThumbUp';
import ThumbsDown from '@material-ui/icons/ThumbDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const propTypes = {
  // from redux
  termsOpen: PropTypes.bool.isRequired,
  acceptTerms: PropTypes.func.isRequired,
  guildName: PropTypes.string.isRequired,
  guildMnemonic: PropTypes.string.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    margin: theme.spacing(1),
  },
  iconMargin: {
    marginRight: theme.spacing(1),
  },
  wrapper: {
    padding: '0.7rem'
  }
}));

const TermsOfUse = ({ termsOpen, acceptTerms }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Dialog
      TransitionComponent={Transition}
      style={{ overflow: 'auto' }}
      aria-labelledby="Terms of Use"
      open={termsOpen}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={() => acceptTerms(false)}
    >
      <DialogTitle id="terms-of-use-dialog-title">
        {intl.formatMessage({ id: 'tou.title' })}
      </DialogTitle>
      <DialogContent>
        <div className="centered-div">
          <Image src='../../images/raised_hand.png' style={{ padding: '5em' }} />
          <div className='centered-div'>
            <div className='centered-div'>
              <h2>{intl.formatMessage({ id: 'tou.header' })}</h2>
            </div>
            <div style={{textAlign: 'center'}}>
              <h2 style={{color:'red'}}>{intl.formatMessage({ id: 'tou.demo' })}</h2>
              <h4>{intl.formatMessage({ id: 'tou.line1' })}</h4>
              <h4>{
                intl.formatMessage(
                  { id: 'tou.line2' },
                  { discordInvite: (
                      <a href="https://discord.gg/3SFgtcA" target="_blank" rel="noopener noreferrer">ESO Craft Request Demo</a>
                    )
                  }
                )
              }</h4>
              <h4>{intl.formatMessage({ id: 'tou.line3' })}</h4>
              <h4>{
                intl.formatMessage(
                  { id: 'tou.line4' },
                  { onboardingLink: (
                      <a href="https://github.com/agiveygives/eso-craft-request/issues/new?assignees=agiveygives&labels=onboarding&template=onboarding-request.md&title=%5BONBOARDING%5D" target="_blank" rel="noopener noreferrer">Onboarding Request</a>
                    )
                  }
                )
              }</h4>

              <h4>{
                intl.formatMessage(
                  { id: 'tou.line5' },
                  { questionsLink: (
                    <a href="https://discord.gg/uEyzbrE" target="_blank" rel="noopener noreferrer">#questions</a>
                    )
                  }
                )
              }</h4>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div>
          <Fab
            variant="extended"
            size="small"
            aria-label="accept"
            color='primary'
            onClick={() => acceptTerms(true)}
            className={classes.buttonMargin}
          >
            <ThumbsUp className={classes.iconMargin} />
            Accept
          </Fab>
          <Fab
            variant="extended"
            size="small"
            aria-label="decline"
            color='secondary'
            onClick={() => acceptTerms(false)}
            className={classes.buttonMargin}
          >
            <ThumbsDown className={classes.iconMargin} />
            Decline
          </Fab>
        </div>
      </DialogActions>
    </Dialog>
  );
};

TermsOfUse.propTypes = propTypes;

const mapStateToProps = state => ({
  termsOpen: state.termsOpen,
});

const mapDispatchToProps = dispatch => ({
  acceptTerms: response => dispatch({ type: TERMS_RESPONSE, response })
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
