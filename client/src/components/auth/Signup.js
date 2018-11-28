import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import styles from './auth.css';
import Expire from '../Expire/Expire';

class Signup extends Component {
	onSubmit = (formProps) => {
		this.props.signup(formProps, () => {
			this.props.history.push('/feature');
		})
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form className={styles.main} onSubmit={handleSubmit(this.onSubmit)}>
				<h3 className={styles.signInUpTitle}>Sign up!</h3>
				<fieldset className={styles.fieldElems}>
					<label className={styles.label}>First Name:</label>
					<Field
						name="firstname"
						type="text"
						component="input"
						autoComplete="new-firstname"
					/>
				</fieldset>
				<fieldset className={styles.fieldElems}>
					<label className={styles.label}>Last Name:</label>
					<Field
						name="lastname"
						type="text"
						component="input"
						autoComplete="new-lastname"
					/>
				</fieldset>
				<fieldset className={styles.fieldElems}>
					<label className={styles.label}>Email:</label>
					<Field
						name="email"
						type="text"
						component="input"
						autoComplete="new-email" //"new-email" was a work-around for "none" not working
					/>
				</fieldset>
				<fieldset className={styles.fieldElems}>
					<label className={styles.label}>Password:</label>
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
				<button className={styles.button}>Sign Up!</button>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.errorMessage }
}

//redux helper 'compose' is used to wrap multiple higher order functions for greater code readability
export default compose( connect(mapStateToProps, actions), reduxForm({ form: 'signup' }) )(Signup);
