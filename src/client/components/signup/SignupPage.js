import React from 'react';
import SignupForm from "./SignupForm";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {closeSignUp} from '../../actions/auth'

class SignupPage extends React.Component {
	render() {
		const {userSignupRequest} = this.props;
		return (

			<div>
				<Modal isOpen={this.props.isOpenSignUp} toggle={()=>this.props.closeSignUp()} className={this.props.className}>
					<ModalHeader toggle={()=>this.props.closeSignUp()}>Sign up</ModalHeader>
					<ModalBody>
					<SignupForm userSignupRequest={userSignupRequest} />
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={()=>this.props.closeSignUp()}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>

		);
	}
}


function mapStateToProps(state) {

	return {
		isOpenSignUp: state.auth.isOpenSignUp}
}

function mapDispatchToProps(dispatch) {
	return {
		closeSignUp: bindActionCreators(closeSignUp, dispatch)

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
