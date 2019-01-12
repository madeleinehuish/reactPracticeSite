import React, { Component } from 'react';
import styles from './CurrentImage.css';

class CurrentImage extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		toggleCard: false
	}

	handleClick = () => {
		this.setState({ toggleCard: !this.state.toggleCard });
	}

	render() {
		if(this.props.currentCard.imageUrl) {
			return <img src={ this.props.currentCard ? this.props.currentCard.imageUrl : null } className={styles.cardImage} alt="magic card" height="320px" />
		}
		if(this.props.currentCard.card_faces) {
			if(this.props.currentCard.image_uris) {
				return (
					<img src={ this.props.currentCard ? this.props.currentCard.image_uris.large : null } className={styles.cardImage} alt="magic card" height="320px" />
				)
			}
			if(!this.state.toggleCard) {
				return (
					<img src={ this.props.currentCard ? this.props.currentCard.card_faces[0].image_uris.large : null } onClick={()=> this.toggleCard} className={styles.cardImageDouble} alt="magic card" height="320px" />
				)
			} else {
				return (
					<img src={ this.props.currentCard ? this.props.currentCard.card_faces[1].image_uris.large : null } onClick={()=> this.toggleCard} className={styles.cardImageDouble} alt="magic card" height="320px" />
				)
			}
		} else {
			return (
				<img src={ this.props.currentCard ? this.props.currentCard.image_uris.large : null } className={styles.cardImage} alt="magic card" height="320px" />
			)
		}
	}
}

export default CurrentImage;
