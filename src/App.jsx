import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.css';
import CraftRequest from './pages/CraftRequest';
import messages, { supportedLocales } from './i18n';
import { guildDataShape } from './propShapes';

const propTypes = {
  guildData: guildDataShape.isRequired,
};

const appStyle = {
  backgroundColor: '#26262b',
  color: '#dddacb',
  height: '100vh',
  fallbacks: {
    /* https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/ */
    height: '-webkit-fill-available',
  },
};

const App = ({ guildData }) => {
  const [locale, setLocale] = useState('en-US');

  useEffect(() => {
    if (supportedLocales.includes(window.navigator.language)) {
      setLocale(window.navigator.language);
    } else if (guildData.locale) {
      setLocale(guildData.locale);
    } else {
      setLocale('en-US');
    }
  }, [guildData]);

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

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {renderComponent}
    </IntlProvider>
  );
};

App.propTypes = propTypes;

const mapStateToProps = (state) => ({
  guildData: state.guildData,
});

export default connect(mapStateToProps)(App);
