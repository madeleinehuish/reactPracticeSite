import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header/Header';
import Welcome from './Welcome/Welcome';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import Feature from './Feature/Feature';
import styles from './App.css';

export default (props) => {
	return (
		<BrowserRouter>
			<div className={styles.app}>
				<Header />
				{/* {props.children} */}
				<Route path="/" exact component={Welcome} />
				<Route path="/signup" component={Signup} />
				<Route path="/signin" component={Signin} />
				<Route path="/signout" component={Signout} />
				<Route path="/feature" component={Feature} />
			</div>
		</BrowserRouter>
	)
}
