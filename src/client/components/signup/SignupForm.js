import React from 'react';
import propTypes from 'prop-types';;
import classnames from 'classnames';
import validateInput from '../../../server/shared/ValidateUserClient';
import { bindActionCreators } from 'redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {userSignupRequest} from "../../actions/signupActions";
import {connect} from 'react-redux';





class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			isLoding: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value ,
		});
	}



	isValid() {


		const { errors, isValid } = this.props.validateInput(this.state);


		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ isLoding: true });
			this.props.userSignupRequest(this.state)
			this.setState({isLoding:false})
		}
	}


	render() {

		const {errors} = this.props

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community!</h1>
				<TextFieldGroup
					error={errors.username}
					label="Username"
					onChange={this.onChange}
					checkUserExists={this.checkUserExists}
					value={this.state.username}
					field="username"
				/>

				<TextFieldGroup
					error={errors.email}
					label="Email"
					onChange={this.onChange}
					checkUserExists={this.checkUserExists}
					value={this.state.email}
					field="email"
				/>

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field="password"
					type="password"
				/>

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation"
					type="password"
				/>


				<div className="form-group">
					< button disabled={this.state.isLoding} className="btn btn-primary btn--lg">
						Sign Up
					</button>
				</div>
			</form>

		);
	}
}
function mapStateToProps(state) {

	return {
		errors: state.auth.loginError}
}

function mapDispatchToProps(dispatch) {

	return {
		userSignupRequest: bindActionCreators(userSignupRequest, dispatch),
		validateInput : bindActionCreators(validateInput ,dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);