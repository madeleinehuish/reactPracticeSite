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
							<ul key={truck.cnn+Math.random(5)} className={styles.individualTrucks}>
								<li>
									<b>{truck.applicant}</b> / {truck.location}
									<div>{truck.locationdesc}</div>
								</li>
							</ul>
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
