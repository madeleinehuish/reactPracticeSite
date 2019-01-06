import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import Trucks from '../Trucks/Trucks';
import styles from './Main.css';

class Main extends Component {
	render() {
		return(
			<div className={styles.feature}>
				<h3>Click one of the links above to try a different app!</h3>
			</div>

		)
	}
};

export default requireAuth(Main);
