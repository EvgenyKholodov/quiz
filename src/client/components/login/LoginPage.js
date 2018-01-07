import React from 'react';
import LoginForm from './LoginForm';
import {closeSignIn} from '../../actions/auth'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LoginPage extends React.Component {
  render() {
    return (
        <div>
          <Modal isOpen={this.props.isOpenSignIn} toggle={()=>this.props.closeSignIn()} className={this.props.className}>
            <ModalHeader toggle={()=>this.props.closeSignIn()}>Sign in</ModalHeader>
            <ModalBody>
          <LoginForm />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={()=>this.props.closeSignIn()}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
    )
  }
}
function mapStateToProps(state) {

	return {
		isOpenSignIn: state.auth.isOpenSignIn}
}

function mapDispatchToProps(dispatch) {
  return {
		closeSignIn: bindActionCreators(closeSignIn, dispatch)

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
