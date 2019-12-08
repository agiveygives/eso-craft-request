import React from 'react';
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

const TermsOfUse = ({ termsOpen, acceptTerms, guildName }) => {
  const classes = useStyles();

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
          <Image src='../../images/raised_hand.png' style={{ padding: '5em' }} />
          <div className='centered-div'>
            <h4>General</h4>
            <p>1.    Upon submitting your request, <strong>a guild-approved master crafter will contact you with a list of mats required</strong> (or a gold price if you’ve indicated that you’re paying with gold). Your gear will not be crafted or delivered until you have provided the mats or gold required, so be prepared to provide the necessary items.</p>
            <p>2.    <strong>This app is not intended for research items</strong>. If you need items to research, please ask in guild chat.</p>
          </div>

          <div className='centered-div'>
            <h4>Terms of Use</h4>
            <p>1.    Please <strong>be patient</strong> and treat your crafters with respect. They have volunteered their time to help you and the guild, and are under no obligation to do so.</p>
            <p>{`2.    This guild service is provided by ${guildName} members for other ${guildName} members. DO NOT use this app to request gear for people who are not a member of this guild.`}</p>
          </div>

          <div className="centered-div">
            <h5>By accepting these terms and using the Crafting Request App, you agree to these terms, and failure to follow them will result in you being banned from this service for an undetermined amount of time</h5>
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
  guildName: state.guildData.name
});

const mapDispatchToProps = dispatch => ({
  acceptTerms: response => dispatch({ type: TERMS_RESPONSE, response })
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
