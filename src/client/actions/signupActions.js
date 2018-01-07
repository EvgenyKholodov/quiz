import axios from 'axios';
import {REGISTER_FALSE,SIGNUP_MODAL} from './auth';

export function userSignupRequest(userData) {

	return dispatch => {
		return axios.post('/users', userData)
			.then((resp) => {

				dispatch({
					type:SIGNUP_MODAL,
					isOpenSignUp: false,
					isOpenSignIn: true

					}
				)
			})

			.catch((err)=>{

				dispatch({
					type: REGISTER_FALSE,
					isFetching: false,
					isAuthenticated: true,
					error: err.response.data.error
				})
			})

	}


}