import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import styles from './auth.css';

class Signout extends Component {
	componentDidMount() {
		this.props.signout();
	}

	render() {
		return <div className={styles.signOut}>Sorry to see you go!</div>
	}
}

export default connect(null, actions)(Signout);
