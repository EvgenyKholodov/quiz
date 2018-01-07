import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {LOGIN_FAILURE} from '../../client/actions/auth'

export default function validateInputClientLogin(data) {
	return dispatch => {
		let errors = {};

		if (Validator.isEmpty(data.identifier)) {
			errors.identifier = 'This field is required';
		}

		if (Validator.isEmpty(data.password)) {
			errors.password = 'This field is required';

		}
		dispatch({
			type: LOGIN_FAILURE,
			isFetching: false,
			error: errors
		})
		return {
			errors,
			isValid: isEmpty(errors)
	}

	}
}