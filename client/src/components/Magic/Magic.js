import React, { Component } from 'react';
import styles from './Magic.css';

class Magic extends Component {

	// handleInput = (event) => {
	// 	const filterValue = event.target.value;
	// 	// console.log(event.target.value);
	//
	// 	const cb = () => {
	// 		this.forceUpdate();
	// 	};
	//
	// 	this.props.getcards(filterValue, cb);
	// }
	//
	// handleTruckButton = () => {
	// 	const cb = () => {
	// 		this.forceUpdate();
	// 	};
	//
	// 	this.props.getcards(cb);
	// }

	render() {
		return (
			<div>
				<br />
				<div className={styles.magicContainer}>
					<h3 className={styles.title}>Magic the Gathering Cards!</h3>
					<h4>Push button to get list of cards from the Ixalan Set.</h4>
					<h4 className={styles.goUp}>Type into the input field to filter the results!</h4>
					{/* <button id="truckButton" className={styles.button} onClick={()=>this.handleTruckButton()}>Get Trucks</button> */}
					{/* <input className={styles.input} onChange={(event)=>this.handleInput(event)}/> */}
					<div >
						{/* <Truckslist trucks={this.props.trucks} /> */}
					</div>
				</div>
			</div>
		)
	}
}

export default Magic;
