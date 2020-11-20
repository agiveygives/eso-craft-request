import React, { useEffect } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import QueryString from 'query-string';
import { BrowserRouter, Route } from 'react-router-dom';
import { OauthClient, UserClient } from './api/discord';
import { GetOauthTokenResponse, RefreshOauthTokenResponse } from './api/discord/response/OauthResponses';
import { GetUserGuildsResponse } from './api/discord/response/UserResponses';
import { GetAdminGuilds } from './store/user/actions';
import { SET_SESSION, SET_USER_INFO } from './store/user/constants';
import { SessionType, InfoType } from './store/user/types';
import { StateType } from './store/types';
import { Home } from './pages/Home';
import { ThemeWrapper } from './components/ThemeWrapper';
import { Layout } from './components/Layout';
import ScrollToTop from './utils/ScrollToTop';
import { DiscordAvatarUrl } from './utils/LinkTemplates';
import NavLinks from './constants/NavigationLinks';

interface StateProps {
  session: SessionType;
  userInfo: InfoType;
}

interface DispatchProps {
  setSession: (sessionToken: SessionType) => void;
  setUserInfo: (userInfo: InfoType) => void;
  setAdminGuilds: (guilds: GetUserGuildsResponse[]) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps

const App = ({ session, userInfo, setSession, setUserInfo, setAdminGuilds }: Props): JSX.Element => {
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

  useEffect(() => {
    if (userInfo.userId && session.tokenType && session.accessToken)
      UserClient.getUserGuilds(`${session.tokenType} ${session.accessToken}`)
        .then((res) => {
          console.log(res);
          setAdminGuilds(res);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
  }, [session, userInfo, setAdminGuilds])

  return (
    <ThemeWrapper>
      <BrowserRouter>
        <Layout>
          <>
            <ScrollToTop />
            <Route path="/" component={Home} exact />
            <Route
              exact
              path="/login"
              render={() => (window.location.href = process.env.REACT_APP_IDENTITY_URI || 'esocraftrequest.com')}
            />
            {NavLinks.map((navLink) => (
              <Route key={navLink.location} path={navLink.location} component={navLink.component} exact />
            ))}
          </>
        </Layout>
      </BrowserRouter>
    </ThemeWrapper>
  );
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, StateType> = state => ({
  session: state.user.session,
  userInfo: state.user.info,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => ({
  setSession: (sessionToken: SessionType) => dispatch({ type: SET_SESSION, payload: sessionToken }),
  setUserInfo: (userInfo: InfoType) => dispatch({ type: SET_USER_INFO, payload: userInfo }),
  setAdminGuilds: (guilds: GetUserGuildsResponse[]) => dispatch(GetAdminGuilds(guilds))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
