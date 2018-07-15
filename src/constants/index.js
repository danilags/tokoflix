export const API_BASE_URL = 'https://api.themoviedb.org/';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
export const GET_ALL_MOVIES = 'GET_ALL_MOVIES';
export const GET_MOVIE_DETAILS = 'GET_MOVIE_DETAILS';
export const GET_SIMILAR_MOVIE = 'GET_SIMILAR_MOVIE';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const LOGIN_GUEST = 'LOGIN_GUEST';
export const USER_BUY_MOVIE = 'USER_BUY_MOVIE';
export const USER_LOGOUT = 'USER_LOGOUT';

export const REQUEST_TOKEN=(new Buffer('token_').toString('base64'));