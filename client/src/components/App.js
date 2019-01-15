import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header/Header';
import Welcome from './Welcome/Welcome';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import Main from './Main/Main';
import Trucks from './Trucks/Trucks';
import Magic from './Magic/Magic'
import styles from './App.css';

export default (props) => {
	return (
		<BrowserRouter>
			<div className={styles.app}>
				<Header />
				{/* {props.children} */}
				{/* <Route path="/" exact component={Welcome} /> */}
				<Route path="/" exact component={Magic} />
				<Route path="/signup" component={Signup} />
				<Route path="/signin" component={Signin} />
				<Route path="/signout" component={Signout} />
				<Route path="/main" component={Main} />
				<Route path="/trucks" component={Trucks} />
				{/* <Route path="/magic" component={Magic} /> */}
			</div>
		</BrowserRouter>
	)
}
