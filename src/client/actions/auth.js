import axios from 'axios'
import {browserHistory} from 'react-router'

import {DEV_HOST, PROD_HOST} from '../constants/host'

const HOST = PROD_HOST;
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const REGISTER_FALSE = "REGISTER_FALSE"
export const SIGNIN_MODAL = 'SIGNIN_MODAL'
export const SIGNUP_MODAL = 'SIGNUP_MODAL'


function requestLogin(creds) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false
	}
}

function receiveLogin(user) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		user: user.user,
		token: user.id_token
	}
}

function loginError(error) {
	return {
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		error
			// error
	}
}

export function checkAuth() {
	return dispatch => {
		return axios.post(`${HOST}/verify`).then((response) => {
			if (response.status === 201) {

				const user = response.data;

				// Dispatch the success action
				dispatch(receiveLogin(user))

				browserHistory.push('/');
			}
		}).catch(err => {
			dispatch(loginError(err.response.data));
		});
	}
}

function dispatchLogout() {
	return {
		type: LOGOUT_SUCCESS
	}
}

// Logs the user out
export function logoutUser() {
	return dispatch => {
		dispatch(dispatchLogout())
		browserHistory.push('/logout')
	}
}
export  function openSignIn() {
	return dispatch => {
		dispatch({
			type: SIGNIN_MODAL,
			isOpenSignIn: true
		})
	}
}

export function closeSignIn() {
	return dispatch => {
		dispatch({
			type: SIGNIN_MODAL,
			isOpenSignIn: false,
			loginError: ''
		})
	}
}
export  function openSignUp() {
	return dispatch => {
		dispatch({
			type: SIGNUP_MODAL,
			isOpenSignUp: true
		})
	}
}

export function closeSignUp() {
	return dispatch => {
		dispatch({
			type: SIGNUP_MODAL,
			isOpenSignIn: false
		})
	}
}