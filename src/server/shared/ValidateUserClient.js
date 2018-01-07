import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {REGISTER_FALSE} from '../../client/actions/auth'

export default function validateInput(data) {
	return dispatch => {

	let errors = {};

	if (Validator.isEmpty(data.username)) {
		errors.username = 'This field is required';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'This field is required';
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'This field is required';
	}
	if (Validator.isEmpty(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'This field is required';
	}
	if (!Validator.equals(data.password, data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Passwords must match';
	}


	dispatch({
		type: "REGISTER_FALSE",
		isFetching: false,
		error: errors
	})


	return {
		errors,
		isValid: isEmpty(errors)
	}
	}

}