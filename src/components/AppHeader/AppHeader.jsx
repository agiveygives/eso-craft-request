import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Header from 'terra-clinical-header';
import Heading from 'terra-heading';
import Arrange from 'terra-arrange';

const propTypes = {
  title: PropTypes.string.isRequired,
  guildHeaderColor: PropTypes.string.isRequired,
}

const AppHeader = ({ title, guildHeaderColor }) => (
  <Header
    startContent={
      <Arrange
        fitStart={<Avatar src="/images/hammer-and-anvil.png" />}
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
