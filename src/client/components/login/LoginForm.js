import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInputClientLogin from '../../../server/shared/ClientLogin';
import { bindActionCreators } from 'redux';
import userSigninRequest from "../../actions/signinActions";

import { connect } from 'react-redux';
// import { login } from '../../actions/authActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: this.props.errors,
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {

    const { errors, isValid } = this.props.validateInputClientLogin(this.state);


		return isValid;
  }

	async onSubmit (e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ isLoading: true });
			await this.props.userSigninRequest(this.state)
			if (this.props.isAuthenticated) {
				this.context.router.push('/')
			}

			this.setState( {isLoading: false})


		}
	}

	onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {



		const { identifier, password, isLoading } = this.state;
		const {errors} = this.props

    return (
      <form onSubmit={this.onSubmit}>
				{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
}

LoginForm.propTypes = {

}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {

	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
		errors: state.auth.loginError}
}

function mapDispatchToProps(dispatch) {

	return {
		userSigninRequest: bindActionCreators(userSigninRequest, dispatch),
		validateInputClientLogin : bindActionCreators(validateInputClientLogin ,dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// export default LoginForm;
