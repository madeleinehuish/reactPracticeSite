import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import styles from './auth.css';

class Signout extends Component {
	componentDidMount() {
		const cb = () => {
			console.log('signed out');
		}
		this.props.signout(cb);
	}

	render() {
		return <div className={styles.signOut}>Sorry to see you go!</div>
	}
}

export default connect(null, actions)(Signout);
