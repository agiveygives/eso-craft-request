import React from 'react';
import PropTypes from 'prop-types';
import Image from 'terra-image';
import Header from 'terra-clinical-header';
import Heading from 'terra-heading';
import Arrange from 'terra-arrange';
import craftIcon from '../../images/hammer-and-anvil.png'
import Button from 'terra-button';

const propTypes = {
  title: PropTypes.string.isRequired
}

const AppHeader = ({ title }) => (
  <Header
    startContent={
      <Arrange
        fitStart={<Image src={craftIcon} variant='circle' />}
        fill={<Heading style={{ color: 'black' }} level={2}>{title}</Heading>}
        align='center'
      />
    }
    // endContent={
    //   <Button text="Help" variant="action" />
    // }
    style={{ borderStyle: 'hidden', backgroundColor: '#ff7ecc' }}
  />
);

AppHeader.propTypes = propTypes;

export default AppHeader;
