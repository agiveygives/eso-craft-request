import React, { useEffect } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import QueryString from 'query-string';
import { BrowserRouter, Route } from 'react-router-dom';
import { OauthClient, UserClient } from './api/discord';
import { GetOauthTokenResponse, RefreshOauthTokenResponse } from './api/discord/response/OauthResponses';
import { SET_SESSION, SET_USER_INFO } from './store/user/constants';
import { SessionType, InfoType } from './store/user/types';
import { StateType } from './store/types';
import { Home } from './pages/Home';
import { ThemeWrapper } from './components/ThemeWrapper';
import { Layout } from './components/Layout';
import ScrollToTop from './utils/ScrollToTop';
import { DiscordAvatarUrl } from './utils/LinkTemplates'

interface StateProps {
  session: SessionType;
}

interface DispatchProps {
  setSession: (session_token: SessionType) => void;
  setUserInfo: (session_token: InfoType) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps

const App = ({ session, setSession, setUserInfo }: Props): JSX.Element => {
  useEffect(() => {
    const uriCode = QueryString.parse(window.location.search).code?.toString();

    if (uriCode && session.refreshToken === '') {
      OauthClient.getToken(uriCode)
        .then((res: GetOauthTokenResponse) => {
          setSession({
            tokenType: res.token_type,
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
          });

          UserClient.getUser(`${res.token_type} ${res.access_token}`)
            .then((res) => {
              setUserInfo({
                userId: res.id,
                username: `${res.username}#${res.discriminator}`,
                avatarUrl: DiscordAvatarUrl(res.id, res.avatar),
              })
            })
            .catch((err: Error) => {
              console.log(err.message);
            })

          UserClient.getUserGuilds(`${res.token_type} ${res.access_token}`)
            .then((res) => {
              console.log(res);
            })
            .catch((err: Error) => {
              console.log(err.message);
            })
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
    } else if (session.refreshToken !== '') {
      OauthClient.refreshToken(session.refreshToken)
        .then((res: RefreshOauthTokenResponse) => {
          console.log(session);
          console.log(res);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
    }
  }, [session, setSession, setUserInfo]);

  return (
    <ThemeWrapper>
        <BrowserRouter>
          <Layout>
            <>
              <ScrollToTop />
              <Route path="/" component={Home} />
              <Route path="/login" component={() => {
                  window.location.href = process.env.REACT_APP_IDENTITY_URI || 'esocraftrequest.com';
                  return null;
              }}/>
            </>
          </Layout>
        </BrowserRouter>
    </ThemeWrapper>
  );
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, StateType> = state => ({
  session: state.user.session,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => ({
  setSession: (session_token: SessionType) => dispatch({ type: SET_SESSION, payload: session_token }),
  setUserInfo: (session_token: InfoType) => dispatch({ type: SET_USER_INFO, payload: session_token })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
