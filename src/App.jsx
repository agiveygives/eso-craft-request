import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.css';
import CraftRequest from './pages/CraftRequest';
import messages from './i18n';

const propTypes = {
  guildData: PropTypes.object.isRequired,
};

const appStyle = {
  backgroundColor: '#26262b',
  color: '#dddacb',
  height: '100vh'
}

const App = ({ guildData }) => {
  const [locale, setLocale] = React.useState('en-US');

  React.useEffect(() => {
    if (guildData.locale) setLocale(guildData.locale);
  }, [guildData])

  let renderComponent;

  if (guildData.createdAt) {
    renderComponent = <CraftRequest />
  }
  else {
    renderComponent = (
      <div style={appStyle}>
        <LinearProgress />
      </div>
    );
  }

  return (

    <IntlProvider locale={locale} messages={messages[locale]}>
      {renderComponent}
    </IntlProvider>
  )
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  guildData: state.guildData,
});

export default connect(mapStateToProps)(App);
