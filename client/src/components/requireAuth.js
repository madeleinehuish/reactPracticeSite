import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (!this.props.auth.authenticated) { //this originally had !this.props.auth
        this.props.history.push('/');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    console.log(' in requireAuth: state.auth: ', state.auth);
    return { auth: state.auth  }; //this originally had state.auth.authenticated
  }
  return connect(mapStateToProps)(ComposedComponent);
};
