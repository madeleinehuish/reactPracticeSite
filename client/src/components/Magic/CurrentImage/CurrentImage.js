import React, { Component } from 'react';
import styles from './CurrentImage.css';
import rotateImage from '../../../data/images/rotate.png';

class CurrentImage extends Component {

	//accessible as this.props.flipped;

	constructor(props) {
		super(props);

		this.state ={
			// toggleCard : props.flipped,
			currentCard: props.currentCard
		}

	}

	// handleClick = () => {
	// 	this.props.flipCurrentCard(); //will not reset
	// 	this.forceUpdate()
	// 	this.setState({ toggleCard: this.state.toggleCard });
	// }
// 	componentDidMount() {
// 		console.log('switched')
// 	}
//
// 	static getDerivedStateFromProps(nextProps, prevState) {
// 		console.log('nextProps.currentCard.name: ', nextProps.currentCard.name, 'prevState.currentCard.name: ', prevState.currentCard.name);
//    if(nextProps.currentCard!==prevState.currentCard && !prevState.toggleCard){
// 		 return { toggleCard: false };
//   }
//   else return null;
// }


	handleClick = () => {
		this.props.flipCurrentCard(); //will not reset
		this.forceUpdate()
		this.setState({ toggleCard: this.state.toggleCard });
	}

	render() {
		if(!this.props.currentCard) return <img src={"http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card"} alt="there are no cards that fit the current search" height="320px"/>

		if(this.props.currentCard.imageUrl) {

			return <img src={ this.props.currentCard ? this.props.currentCard.imageUrl : null } className={styles.cardImage} alt="magic card" height="320px" />
		}
		if(this.props.currentCard.card_faces) {
			if(this.props.currentCard.image_uris) {

				return (

					<img src={ this.props.currentCard ? this.props.currentCard.image_uris.large : null } className={styles.cardImage} alt="magic card" height="320px" />
				)
			}
			if(!this.props.flipped) {

				return (
					<React.Fragment>
						<img src={this.props.currentCard ? this.props.currentCard.card_faces[0].image_uris.large : null } className={styles.cardImageDouble} alt="magic card" height="320px" />
						<img src={rotateImage} id="rotateIcon" className={styles.rotateImage}
							onClick={()=>{
								this.props.flipCurrentCard(false);
								// this.handleClick();
							}} alt="rotate icon"/>
					</React.Fragment>
				)
			} else {

				let set = this.props.currentCard.set;
				let cn = this.props.currentCard.collector_number;
				let imgUrl = `https://api.scryfall.com/cards/${set}` + `/${cn}` + `?format=image&face=back`;
				return (
					<React.Fragment>
						<img src={ this.props.currentCard ? imgUrl : null } className={styles.cardImageDouble} alt="magic card" height="320px" />
						<img src={rotateImage} id="rotateIcon" className={styles.rotateImage} onClick={()=>{
							this.props.flipCurrentCard(false);
							// this.handleClick();
						}} alt="rotate icon"/>
					</React.Fragment>
				)
			}
		} else {
			let set = this.props.currentCard.set;
			let cn = this.props.currentCard.collector_number;
			let imgUrl = `https://api.scryfall.com/cards/${set}/${cn}?format=image`;
			let onErrorUrl = `this.src='${imgUrl}'`
			return (
				// <img src={record.picture} onError={(e)=>{e.target.onerror = null; e.target.src="image_path_here"}}/>

				<img src={ this.props.currentCard ? this.props.currentCard.image_uris.large : null } onError={(e)=>{e.target.onerror = null; e.target.src=imgUrl}} className={styles.cardImage} alt="magic card" height="320px" />
			)
		}
	}
}

export default CurrentImage;
