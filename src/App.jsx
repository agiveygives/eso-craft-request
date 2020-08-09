import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.css';
import CraftRequest from './pages/CraftRequest';
import guildDataShape from './propShapes/guildData';

const propTypes = {
  guildData: guildDataShape.isRequired,
};

const appStyle = {
  backgroundColor: '#26262b',
  color: '#dddacb',
  height: '100vh',
};

const App = ({ guildData }) => {
  let renderComponent;

  if (guildData.createdAt) {
    renderComponent = <CraftRequest />;
  } else {
    renderComponent = (
      <div style={appStyle}>
        <LinearProgress />
      </div>
    );
  }

  return renderComponent;
};

App.propTypes = propTypes;

const mapStateToProps = (state) => ({
  guildData: state.guildData,
});

export default connect(mapStateToProps)(App);
