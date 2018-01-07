import axios from 'axios';
import {LOGIN_SUCCESS,LOGIN_FAILURE} from './auth'

export default function userSigninRequest(userData) {
	return dispatch => {
		axios.post('/users/login', userData)
			.then((resp) => {
				setAuthorizationToken(resp.data.id_token);
				dispatch({
					type: LOGIN_SUCCESS,
					isFetching: false,
					isAuthenticated: true,
					user: resp.data.user.username,
					token: resp.data.id_token,
					isOpenSignIn: false
				})



			})
		// JSON.stringify(err, null, 2)
			.catch((err)=>{
				dispatch({
					type: LOGIN_FAILURE,
					isFetching: false,
					isAuthenticated: true,
					error: err.response.data.error
				})
			})

	}


}

function setAuthorizationToken(token) {
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('token', token);
	} else {
		delete axios.defaults.headers.common['Authorization'];
		localStorage.setItem('token', '');
	}
}