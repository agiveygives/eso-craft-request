import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from 'terra-image';
import Header from 'terra-clinical-header';
import Heading from 'terra-heading';
import Arrange from 'terra-arrange';
import craftIcon from '../../images/hammer-and-anvil.png'

const propTypes = {
  title: PropTypes.string.isRequired,
  guildHeaderColor: PropTypes.string.isRequired,
}

const AppHeader = ({ title, guildHeaderColor }) => (
  <Header
    startContent={
      <Arrange
        fitStart={<Image src={craftIcon} variant='circle' />}
        fill={<Heading style={{ color: 'black' }} level={2}>{title}</Heading>}
        align='center'
      />
    }
    style={{ borderStyle: 'hidden', backgroundColor: guildHeaderColor }}
  />
);

AppHeader.propTypes = propTypes;

const mapStateToProps = state => ({
  guildHeaderColor: state.guildData.colors.header,
});

export default connect(mapStateToProps)(AppHeader);
