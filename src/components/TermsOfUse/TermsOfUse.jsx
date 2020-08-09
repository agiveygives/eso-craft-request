import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import Fab from '@material-ui/core/Fab';
import ThumbsUp from '@material-ui/icons/ThumbUp';
import ThumbsDown from '@material-ui/icons/ThumbDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TERMS_RESPONSE } from '../../store/constants';

const propTypes = {
  // from redux
  termsOpen: PropTypes.bool.isRequired,
  acceptTerms: PropTypes.func.isRequired,
  guildName: PropTypes.string.isRequired,
  guildMnemonic: PropTypes.string.isRequired,
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  buttonMargin: {
    margin: theme.spacing(1),
  },
  iconMargin: {
    marginRight: theme.spacing(1),
  },
  wrapper: {
    padding: '0.7rem',
  },
}));

const TermsOfUse = ({
  termsOpen, acceptTerms, guildName, guildMnemonic,
}) => {
  const classes = useStyles();
  const [ToUMessage, setToUMessage] = React.useState(
    <>
      <div className="centered-div">
        <h4>General</h4>
        <p>
          1.    Upon submitting your request,
          <strong>a guild-approved master crafter will contact you with a list of mats required</strong>
          {' '}
          (or a gold price if you’ve indicated that you’re paying with gold). Your gear will not be crafted or delivered
          {' '}
          until you have provided the mats or gold required, so be prepared to provide the necessary items.
        </p>
        <p>
          2.
          <strong>This app is not intended for research items</strong>
          . If you need items to research, please ask in guild chat.
        </p>
      </div>

      <div className="centered-div">
        <h4>Terms of Use</h4>
        <p>
          1.    Please
          <strong>be patient</strong>
          {' '}
          and treat your crafters with respect. They have volunteered their time to help you and the guild, and are
          {' '}
          under no obligation to do so.
        </p>
        <p>
          {
            `2.    This guild service is provided by ${guildName} members for other ${guildName} members. DO NOT use
            this app to request gear for people who are not a member of this guild.`
          }
        </p>
      </div>

      <div className="centered-div">
        <h5>
          By accepting these terms and using the Crafting Request App, you agree to these terms, and failure to follow
          {' '}
          them will result in you being banned from this service for an undetermined amount of time
        </h5>
      </div>
    </>,
  );

  React.useEffect(() => {
    if (guildMnemonic === 'demo') {
      setToUMessage(
        <div className="centered-div">
          <div className="centered-div">
            <h2>Notice</h2>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'red' }}>This is a demo. </h2>
            <h4>The requests submitted through this will not be fulfilled by any crafter.</h4>
            <h4>
              To view requests sent, join the
              <a href="https://discord.gg/3SFgtcA" target="_blank" rel="noopener noreferrer">ESO Craft Request Demo</a>
              {' '}
              discord server.
            </h4>
            <h4>
              If you&#39;re trying to submit a craft request to your guild, please contact your guild leaders for the
              {' '}
              correct url.
            </h4>
            <h4>
              If you want to use this for your guild, please submit an
              <a href="https://github.com/agiveygives/eso-craft-request/issues/new?assignees=agiveygives&labels=onboarding&template=onboarding-request.md&title=%5BONBOARDING%5D" target="_blank" rel="noopener noreferrer">Onboarding Request</a>
              {' '}
              on github.
            </h4>
            <h4>
              Any questions can be directed to the
              <a href="https://discord.gg/uEyzbrE" target="_blank" rel="noopener noreferrer">#questions</a>
              {' '}
              channel on the discord server or to JukesMcGee#4228 on Discord.
            </h4>
          </div>
        </div>,
      );
    }
  }, [guildMnemonic]);

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
        Read This!
      </DialogTitle>
      <DialogContent>
        <div className="centered-div">
          <Image src="../../images/raised_hand.png" style={{ padding: '5em' }} />
          {ToUMessage}
        </div>
      </DialogContent>
      <DialogActions>
        <div>
          <Fab
            variant="extended"
            size="small"
            aria-label="accept"
            color="primary"
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
            color="secondary"
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

const mapStateToProps = (state) => ({
  termsOpen: state.termsOpen,
  guildName: state.guildData.name,
  guildMnemonic: state.guildMnemonic,
});

const mapDispatchToProps = (dispatch) => ({
  acceptTerms: (response) => dispatch({ type: TERMS_RESPONSE, response }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
