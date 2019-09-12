import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractModal from 'terra-abstract-modal';
import { TERMS_RESPONSE } from '../../store/constants';
import ContentContainer from 'terra-content-container';
import Image from 'terra-image';
import Heading from 'terra-heading';
import Arrange from 'terra-arrange';
import Spacer from 'terra-spacer';
import Button from 'terra-button';
import HandEmoji from '../../images/raised_hand.png';
import ThumbsUp from '../../images/thumbs-up-emoji.png';
import ThumbsDown from '../../images/thumbs-down-emoji.png';

const propTypes = {
  // from redux
  termsOpen: PropTypes.bool.isRequired,
  acceptTerms: PropTypes.func.isRequired
};

const modalStyle = {
  backgroundColor: '#e0e0e0',
  borderRadius: '16px',
  padding: '2em'
}

const TermsOfUse = ({ termsOpen, acceptTerms }) => (
  <AbstractModal
    style={{ overflow: 'auto', maxWidth: '450px' }}
    ariaLabel="Terms of Use"
    isOpen={termsOpen}
    closeOnOutsideClick={false}
    onRequestClose={() => acceptTerms(false)}
  >
    <ContentContainer
      style={modalStyle}
      header={
        <React.Fragment>
          <div className="centered-div">
            <Image src={HandEmoji} />
          </div>
          <div className="centered-div">
            <Heading level={1} size='huge'>
              Read This!
            </Heading>
          </div>
        </React.Fragment>
      }
      footer={
        <Arrange
          fill={
            <div className='centered-div'>
              <Spacer padding='medium'>
                <Button
                  text="Accept"
                  variant="action"
                  icon={<Image src={ThumbsUp} />}
                  style={{ backgroundColor: '#27a745' }}
                  onClick={() => acceptTerms(true)}
                />
              </Spacer>
              <Spacer padding='medium'>
                <Button
                  text="Decline"
                  variant="action"
                  icon={<Image src={ThumbsDown} />}
                  style={{ backgroundColor: '#dc3545' }}
                  onClick={() => acceptTerms(false)}
                />
              </Spacer>
            </div>
          }
        />
      }
    >
      <div className='centered-div'>
        <h4>General</h4>
        <p>1.    Upon submitting your request, <strong>a guild-approved master crafter will contact you with a list of mats required</strong> (or a gold price if you’ve indicated that you’re paying with gold). Your gear will not be crafted or delivered until you have provided the mats or gold required, so be prepared to provide the necessary items.</p>
        <p>2.    <strong>This app is not intended for research items</strong>. If you need items to research, please ask in guild chat.</p>
      </div>

      <div className='centered-div'>
        <h4>Terms of Use</h4>
        <p>1.    Please <strong>be patient</strong> and treat your crafters with respect. They have volunteered their time to help you and the guild, and are under no obligation to do so.</p>
        <p>2.    This guild service is provided by Pixel Pirates members for other Pixel Pirates members. DO NOT use this app to request gear for people who are not a member of this guild.</p>
      </div>

      <div className="centered-div">
        <h5>By accepting these terms and using the Crafting Request App, you agree to these terms, and failure to follow them will result in you being banned from this service for an undetermined amount of time</h5>
      </div>
    </ContentContainer>
  </AbstractModal>
);

TermsOfUse.propTypes = propTypes;

const mapStateToProps = state => ({
  termsOpen: state.termsOpen
});

const mapDispatchToProps = dispatch => ({
  acceptTerms: response => dispatch({ type: TERMS_RESPONSE, response })
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
