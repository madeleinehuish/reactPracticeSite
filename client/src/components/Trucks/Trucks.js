import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Truckslist from './Truckslist/Truckslist';
import styles from './Trucks.css';


class Trucks extends Component {

	handleTruckButton = () => {
		const cb = () => {
			this.forceUpdate();
		};

		this.props.gettrucks(cb);
	}

	render() {
		console.log('in Trucks, this.props.trucks: ', this.props.trucks);

		return (
				<div className={styles.truckContainer}>
					<h3 className={styles.title}>Food Trucks of San Francisco!</h3>
					<h4>Push button to get list of current food trucks open in San Francisco</h4>
					<button id="truckButton" className={styles.button} onClick={()=>this.handleTruckButton()}>Get Trucks</button>
					<div >
						<Truckslist trucks={this.props.trucks} />
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
