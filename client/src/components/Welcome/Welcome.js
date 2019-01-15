import React from 'react';
import styles from './Welcome.css';

export default () => {
	return <h3 className={styles.main}>
		<div className={styles.divs}>Welcome to </div>
		<div className={styles.divs}>Madeleine's</div>
		<div className={styles.divs}>MTG Database App!</div>
		<div className={styles.divs}>utilizing Scryfall data</div>

	</h3>
}
