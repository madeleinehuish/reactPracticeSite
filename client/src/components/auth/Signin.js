import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import styles from './auth.css';
import Expire from '../Expire/Expire';

class Signin extends Component {

	onSubmit = (formProps) => {
		this.props.signin(formProps, () => {
			this.props.history.push('/magic');
		})
	}

	render() {
		const { handleSubmit } = this.props;
		console.log('state: ', this.state)

		return (
			<form className={styles.main} onSubmit={handleSubmit(this.onSubmit)}>
				<h3 className={styles.signInUpTitle}>Sign in!</h3>
				<fieldset className={styles.fieldElems}>
					<label className={styles.label}>Email</label>
					<Field
						name="email"
						type="text"
						component="input"
						autoComplete="new-email" //"new-email" was a work-around for "none" not working
					/>
				</fieldset>
				<fieldset className={styles.fieldElems}>
					<label className={styles.label}>Password</label>
					<Field
						name="password"
						type="password"
						component="input"
						autoComplete="new-password" //see email field above for why "new-password"
					/>
				</fieldset>
				<div className={styles.error}>
					<Expire delay={4000}>{this.props.errorMessage}</Expire>
				</div>
				<button className={styles.button}>Sign In!</button>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.errorMessage }
}

//redux helper 'compose' is used to wrap multiple higher order functions for greater code readability
export default compose( connect(mapStateToProps, actions), reduxForm({ form: 'signin' }) )(Signin);
