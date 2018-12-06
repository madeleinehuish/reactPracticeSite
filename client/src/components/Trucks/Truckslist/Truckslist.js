import React from 'react';
import styles from './Truckslist.css';

const Truckslist = props => {
	console.log('inside Truckslist, props.trucks: ', props.trucks);

	if(props && props.trucks && props.trucks.length) {
		return (
			<ul className={styles.trucksList}>
				{
					props.trucks.map(truck => {
						return (
							<div>
								<br />
								<li key={truck.cnn+Math.random(5)}>
									<b>{truck.applicant}</b> / {truck.location}
									<div>{truck.locationdesc}</div>
								</li>
							</div>
						)
					})
				}
			</ul>
		)
	} else {
			return <div></div>
	}
}

export default Truckslist;
