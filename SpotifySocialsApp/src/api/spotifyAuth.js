import { spotifyCredentials } from './spotifyCredentials'
import * as AuthSession from 'expo-auth-session';
import { encode as btoa } from 'base-64';

const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
  'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
  'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');


export const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode()
    const credentials = spotifyCredentials
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
        }`,
    });
    const responseJson = await response.json();
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;

    return {
      accessToken,
      refreshToken,
      expirationTime
    }
  } catch (err) {
    console.error(err);
    return err
  }
}

const getAuthorizationCode = async () => {
  try {
    const credentials = spotifyCredentials
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        credentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl),
    })

    return result.params.code
  } catch (err) {
    console.error(err)
    return err
  }
}

export const refreshTokens = async (refreshToken) => {
  try {
    const credentials = spotifyCredentials;
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    // Check if token is still valid
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_t oken=${refreshToken}`,
    });
    const responseJson = await response.json();

    // If not valid, get new token
    if (responseJson.error) {
      return await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;

      return {
        accessToken,
        newRefreshToken,
        expirationTime
      }
    }
  } catch (err) {
    console.error(err)
    return err
  }
}