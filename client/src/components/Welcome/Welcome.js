import React from 'react';
import styles from './Welcome.css';

export default () => {
	return <h3 className={styles.main}>
		<div className={styles.divs}>Welcome!</div>
		<div className={styles.divs}>Please sign up</div>
		<div className={styles.divs}>or sign in!</div>
	</h3>
}
