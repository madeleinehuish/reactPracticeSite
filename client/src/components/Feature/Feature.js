import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import Trucks from '../Trucks/Trucks';
import styles from './Feature.css';

class Feature extends Component {
	render() {
		return(
			<div className={styles.feature}>
				<h3>Click one of the links above to try a different app!</h3>

				{/* <Trucks /> */}
			</div>

		)
	}
};

export default requireAuth(Feature);
