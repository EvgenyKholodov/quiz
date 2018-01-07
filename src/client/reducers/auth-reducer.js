import { combineReducers } from 'redux'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,REGISTER_FALSE,SIGNIN_MODAL ,SIGNUP_MODAL} from '../actions/auth'

const defaultState = {
	loginError: '',
	isOpenSignUp: false,
	isOpenSignIn: false,
	isFetching: false,
	isAuthenticated: false,
	user: '',
	token: ''
}

const auth = (state = defaultState, action) => {

			switch (action.type) {

				case SIGNUP_MODAL:
					return Object.assign({}, state, {
						isOpenSignUp: action.isOpenSignUp,
            isOpenSignIn: action.isOpenSignIn,
					});
				case SIGNIN_MODAL:
					return Object.assign({}, state, {
						isOpenSignIn: action.isOpenSignIn,
						loginError: false

					});
				case REGISTER_FALSE:
					return Object.assign({}, state, {
						isFetching: false,
						isAuthenticated: false,
						loginError: action.error
					});

				case LOGIN_REQUEST:
					return Object.assign({}, state, {
						isFetching: true,
						isAuthenticated: false
					});

				case LOGIN_SUCCESS:
					return Object.assign({}, state, {
						isFetching: false,
						isAuthenticated: true,
						user: action.user,
						token: action.token,
						isOpenSignIn: action.isOpenSignIn
					});

				case LOGIN_FAILURE:
					return Object.assign({}, state, {
						isFetching: false,
						isAuthenticated: false,
						loginError: action.error
					});

				case LOGOUT_SUCCESS:
					return Object.assign({}, state, {
						isAuthenticated: false,
						user: '',
						token: ''
					});


				default:
					return state;

			}
	}

	export default auth;