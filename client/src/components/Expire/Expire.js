import React, { Component } from 'react';

// from https://stackoverflow.com/questions/24171226/removing-element-from-dom-after-set-amount-of-time
class Expire extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true }
  }

  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({visible: true});
    }
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    // clear any existing timer
    if (this._timer != null) {
      clearTimeout(this._timer)
    }

    // hide after `delay` milliseconds
    this._timer = setTimeout(function(){
      this.setState({visible: false});
      this._timer = null;
    }.bind(this), this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  render() {
    // console.log('this.props.children: ', this.props.children);
    return this.state.visible
      ? <div>{this.props.children}</div>
      : <span />;
  }
}

export default Expire;
