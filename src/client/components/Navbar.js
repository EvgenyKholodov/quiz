import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logoutUser } from '../actions/auth';
import LoginPage from './login/LoginPage';
import {openSignIn,openSignUp} from '../actions/auth';
import SignupPage from './signup/SignupPage'


import '../theme/Login.css'


@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }),
  dispatch => ({
		openSignIn: bindActionCreators(openSignIn, dispatch),
		openSignUp: bindActionCreators(openSignUp, dispatch),
    logoutUser: bindActionCreators(logoutUser, dispatch)
  })
)
export default class Navbar extends Component {
	constructor() {
		super();
    this.state = {
      isActive: false,
      isReg: false,

    }

	}
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
  }






  render() {

    const { logoutUser, isAuthenticated, user } = this.props
    return (
      <div className = "navigationWrapper">
        <div className = "linksWrapper">

          <Link to = '/' className = 'navLink' activeClassName = 'activeLink'>Home</Link>
          <Link to = 'quiz' className = 'navLink' activeClassName = 'activeLink'>Quiz</Link>


          { isAuthenticated &&
            <Link to = 'create' className = 'navLink' activeClassName = 'activeLink'>Create</Link> }
          { isAuthenticated &&
            <Link to = 'leaderboard' className = 'navLink' activeClassName = 'activeLink'>Leaderboard</Link> }
          { isAuthenticated &&
            <Link to = '#' className = 'navLink' onClick = { () => this.props.logoutUser() }>Logout</Link> }    
          { !isAuthenticated &&
          	<Link  className = 'navLink' onClick={()=>this.props.openSignIn()} activeClassName = 'activeLink'>Sign in</Link>
					}
          { !isAuthenticated &&
					<Link  className = 'navLink' onClick={()=>this.props.openSignUp()} activeClassName = 'activeLink'>Sign up</Link>
					}
					<LoginPage/>
					<SignupPage/>

        </div>
      </div>
    );
  }
};