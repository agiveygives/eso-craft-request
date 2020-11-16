import React, { useEffect } from 'react';
import { connect, MapDispatchToProps } from 'react-redux'
import QueryString from 'query-string';
import { BrowserRouter, Route } from 'react-router-dom';
import { OauthClient } from './api/discord';
import { GetOauthTokenResponse } from './api/discord/response/OauthResponses';
import { SET_SESSION } from './store/user/constants';
import { SessionType } from './store/user/types';
import { Home } from './pages/Home';
import { ThemeWrapper } from './utils/ThemeWrapper';
import { ScrollToTop } from './utils/ScrollToTop';
import { Layout } from './utils/Layout';

interface DispatchProps {
  setSession: (session_token: SessionType) => void;
}

interface OwnProps {}

type Props = DispatchProps & OwnProps

const App = ({ setSession }: Props): JSX.Element => {
  useEffect(() => {
    const uriCode = QueryString.parse(window.location.search).code?.toString();

    if(uriCode) {
      OauthClient.getToken(uriCode)
        .then((res: GetOauthTokenResponse) => {
          console.log(res);
          setSession({
            tokenType: res.token_type,
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
          });
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
    }
  }, [setSession]);

  return (
    <ThemeWrapper>
      <Layout>
        <BrowserRouter>
          <ScrollToTop />
          <Route path="/" component={Home} />
          <Route path="/login" component={() => {
              window.location.href = process.env.REACT_APP_IDENTITY_URI || 'esocraftrequest.com';
              return null;
          }}/>
        </BrowserRouter>
      </Layout>
    </ThemeWrapper>
  );
}

// const mapStateToProps: MapStateToProps<StateProps, OwnProps, StateType> = state => ({
//   session: state.user.session,
// });

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => ({
  setSession: (session_token: SessionType) => dispatch({ type: SET_SESSION, payload: session_token })
});

export default connect(undefined, mapDispatchToProps)(App);
