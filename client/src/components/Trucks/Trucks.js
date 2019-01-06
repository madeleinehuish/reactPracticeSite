import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Truckslist from './Truckslist/Truckslist';
import styles from './Trucks.css';


class Trucks extends Component {

	handleInput = (event) => {
		const filterValue = event.target.value;
		// console.log(event.target.value);

		const cb = () => {
			this.forceUpdate();
		};

		this.props.gettrucks(filterValue, cb);
	}

	handleTruckButton = () => {
		const cb = () => {
			this.forceUpdate();
		};

		this.props.gettrucks(cb);
	}

	render() {
		console.log('in Trucks, this.props.trucks: ', this.props.trucks);

		return (
			<div>
				<br />
				<div className={styles.truckContainer}>
					<h3 className={styles.title}>Food Trucks of San Francisco!</h3>
					<h4>Push button to get list of current food trucks open in San Francisco.</h4>
					<h4 className={styles.goUp}>Type into the input field to filter the results!</h4>
					<button id="truckButton" className={styles.button} onClick={()=>this.handleTruckButton()}>Get Trucks</button>
					<input className={styles.input} onChange={(event)=>this.handleInput(event)}/>
					<div >
						<Truckslist trucks={this.props.trucks} />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log('state in trucks: ', state);
	return { trucks: state.trucks.trucks };
}

export default connect(mapStateToProps, actions)(Trucks);
