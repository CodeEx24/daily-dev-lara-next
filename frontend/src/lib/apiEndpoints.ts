import Env from './env';

export const API_URL = Env.API_URL + '/api';
export const LOGIN_URL = API_URL + '/auth/login';
export const REGISTER_URL = API_URL + '/auth/register';
export const CHECK_CREDENTIALS_URL = API_URL + '/auth/checkCredentials';
export const LOGOUT_URL = API_URL + '/auth/logout';

export const UPDATE_PROFILE_URL = API_URL + '/update/profile';
export const POST_URL = '/post';
export const COMMENT_URL = '/comment';
