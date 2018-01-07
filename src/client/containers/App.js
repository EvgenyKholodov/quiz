
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getQuizzes, getLeaders } from '../actions/quiz'
// import FlashMessagesList from '../components/flash/FlashMessagesList'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

@connect( 
	null,
	dispatch => ({
		getQuizzes: bindActionCreators(getQuizzes, dispatch),
    getLeaders: bindActionCreators(getLeaders, dispatch)
	})
)
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        {/*<FlashMessagesList/>*/}
        {/*<Footer />*/}
      </div>
    )
  }
  componentDidMount() {
    this.props.getQuizzes();
    this.props.getLeaders();
  }
}