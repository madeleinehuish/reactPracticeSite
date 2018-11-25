import React from 'react';
import styles from './Truckslist.css';

const Truckslist = props => {
	console.log('inside Truckslist, props.trucks: ', props.trucks);

	if(props && props.trucks && props.trucks.length) {
		return (
			<div className={styles.trucksList}>
				{
					props.trucks.map(truck => {
						return (
							<div key={truck.cnn}>{truck.applicant}</div>
						)
					})
				}
			</div>
		)
	} else {
			return <div></div>
	}

	return <div>true</div>
}

export default Truckslist;
