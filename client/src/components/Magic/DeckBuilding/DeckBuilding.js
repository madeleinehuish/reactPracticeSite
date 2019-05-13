import React, { Component } from 'react';
import styles from './DeckBuilding.css';
import EmptyWrapper from '../../EmptyWrapper/EmptyWrapper';
import { connect } from 'react-redux';
import * as actions from '../../../actions/magic';


const Decks = props => {
	console.log('props in Decks: ', props);
	const cb = () => {console.log('callback in Decks')}
	if(!props.decks) {
		return (
			<select className={styles.select}>
				decks
			</select>
		)
	} else {
		const deckArr = props.decks.map((deck,index) => {
			// console.log('deck: ', deck.deck_name)
				return (
					<option key={index}>{deck.deck_name}</option>
				)
		})
		// console.log('deckArr: ', deckArr);
		return (
			<select
				className={styles.select}
				// onChange={()=>{console.log('clicked')}}
				onChange={(event)=> {
					const deck = props.decks.filter(d => d.deck_name===event.target.value);
					console.log('inside onChange, decks==', props.decks);
					console.log('inside onChange, deck==', deck);
					props.switchCurrentDeck({ name: event.target.value, deck: deck[0].data })
				}}
				>
				<option key='001'>decks</option>
				{deckArr}
			</select>
		)
	}
}

// eslint-disable-next-line
const Multiples = (props) => {
	let multiplesArr=[];
	// let multiplesArr = [<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } key='1' onClick={()=>props.deckModify(props.card, 'delete')} onMouseOver={()=>{props.handleHover(props.card.info)}} style={{ position: 'absolute', zIndex: i, marginTop: `${margin}px`, marginLeft: `${margin}px`}} className={styles.cardImage} alt="magic card" height="100px" />];
	for(let i = 1; i <= props.card.number; i++){
		let margin;
		if(i > 1) {
			margin=5*(i-1);
		} else margin=0;

		multiplesArr.push(
			<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null }
					 key={i}
					 onClick={()=>props.deckModify(props.card, 'delete')}
					 onMouseOver={()=>{props.handleHover(props.card.info)}}
					 style={{ position: 'absolute', zIndex: i, top: `${margin}px`, left: `${margin}px`}}
					 className={styles.cardImage}
					 alt="magic card"
					 height="100px" />
		)
	}

	return (
		<EmptyWrapper>

			<div className={styles.cardDiv}>
				<div className={styles.relativeDiv}>
					{multiplesArr}
				</div>
			</div>

		</EmptyWrapper>
	)
}

// const ForwardRef = (props, ref) => {
// 	return <DeckNameInput {...props } forwardedRef={ref}/>
// }

// const Forwarded = React.forwardRef(ForwardRef);



class DeckBuilding extends Component {

	state = {
		view3d: false,
		numberOfExtraDeckCalls: 0,
		inputValueDeck: ''
	}

	componentDidMount() {
		//this crazy stuff is due to the deck calls in redux not happening after hot reload in dev
		//this lifecycle method should be modified for production
		const cb = decks => {
			if(!decks) {
				setTimeout(() => {
					console.log('resetting decks in setTimeout due to hot reload');
					if(this.state.numberOfExtraDeckCalls < 3) {
						this.setState({ numberOfExtraDeckCalls: this.state.numberOfExtraDeckCalls + 1})
						this.props.getDecksFromDB(cb);
					}
				}, 5000);
			} else {
				//do not attempt extra calls more than twice
				this.setState({ numberOfExtraDeckCalls: 0 })
			}
		}

		try {
			this.props.getDecksFromDB(cb);
		} catch {
			console.log('catch error axios')
		}

	}

	componentDidUpdate(prevProps) {
		const cb = () => {
			// console.log('component did update finished...')
		}

		if(prevProps.decks===undefined) {
			this.props.getDecksFromDB(cb);
		}
	}

	toggleView = () => {
		this.setState({ view3d: !this.state.view3d })
	}

	handleInput = (event) => {
		this.setState({ inputValueDeck: event.target.value })
		this.props.storeDeckName(event.target.value);
	}

	//TODO add deckModify to select function in deckbuilding send in null, and maybe add deck to parameters
	deckModify = (card, type, newDeck) => { //TODO add parameter newDeck after type
		console.log('card, type in deckModify:  ', card, type);

		const cb = () => {
			this.forceUpdate();
			// console.log('deckModify completed...')
		}

		// console.log('inside of deckModify');

		let deck = newDeck || this.props.currentDeck; //TODO possibly change this to add an || newDeck
		if(card && card.name==="There are no cards with these given filters") return;
		if(type==='reset') {
			// console.log('value of input ref in magic: ', this.inputDeck.current.value);
			this.inputDeck.current.value = '';
			// forceUpdate();
			// console.log('value after reset: ', this.inputDeck.current.value)
		}

		this.props.modifyDeck(card, deck, type, cb);

	}

	handleDeckNameSubmit = (event, value) => {

		const cb = () => {
			// this.forceUpdate(()=>{
			// });
		};
		event.preventDefault();

	}

	saveDeck = () => {
		if(!this.state.inputValueDeck.length) {
			alert('you need to enter a deck name!!!');
			return;
		}
		this.props.saveDeckToDB({
			deck_name: this.state.inputValueDeck,
			deck: this.props.currentDeck
		})
		console.log('save Deck')
	}

	render() {
		console.log('deckBuilding render, this.props: ', this.props);
			return (
				<EmptyWrapper>
					<header className={styles.controlBar}>
						<div className={styles.titleWrapper}>
							<b className={styles.title}>{this.props.currentDeckName || this.state.inputValueDeck || 'new deck'}</b>
						</div>

						<div className={styles.filters}>
							<input
								className={styles.input}
								value={this.state.inputValueDeck}
								onChange={(event)=> this.handleInput(event, this.state.inputValueDeck)}
								type='text'
								placeholder='change deck name'
								// ref={this.props.refInput}
								>
							</input>
						</div>
						<div className={styles.filters}>
							<button className={styles.button} onClick={this.saveDeck}>Save</button>
						</div>
						<div className={styles.filters}>
							<Decks decks={this.props.decks} currentDeck={this.props.currentDeck} deckModify={this.deckModify} />
						</div>

						{/* <div className={styles.filters}>
							<button className={styles.button}>Analysis</button>
						</div> */}
						<div className={styles.filters}>
							<button
								className={styles.buttonSmall}
								onClick={() => {
									// refInput.current.value='';
									this.props.deckModify(null, 'reset');
								}}
							>R</button>
						</div>
						<div className={styles.filters}>
							<button
								className={styles.buttonSmall}
								onClick={this.toggleView}
							>V</button>
						</div>
					</header>
					{/* do NOT!!!! delete this next section... */}
					{this.state.view3d ? <div className={styles.deckWrapper}>
						<div className={styles.deckGrid}>
							{this.props.deck.map((card, index) => {
								if (card.number > 1) {
									return <Multiples key={index} card={card} handleHover={this.props.handleHover} deckModify={this.props.deckModify} />
								} else {
									return (
										<div className={styles.cardDiv} key={index}>
											<img src={card.info.image_uris ? card.info.image_uris.small : null} onClick={() => this.props.deckModify(card, 'delete')} onMouseOver={() => { this.props.handleHover(card.info) }} className={styles.cardImage} alt="magic card" height="100px" />
										</div>
									)
								}
							})}
						</div>
					</div> : <div className={styles.deckWrapper}>
							<div className={styles.deckListedByLine}>
								{this.props.currentDeck.map((card, index) => {
									// if (card.number > 0) {
									return <div
										className={styles.cardLine}
										onMouseOver={() => { this.props.handleHover(card.info) }}
										onClick={() => this.props.deckModify(card, 'delete')}
									>{card.name}&nbsp;&nbsp;{card.number}
									</div>
									// <Multiples key={index} card={card} handleHover={props.handleHover} deckModify={props.deckModify} />
									// }
									// else {
									// 	return (
									// 		<div className={styles.cardDiv} key={index}>
									// 			<div>{card.name}&nbsp;&nbsp;{card.number}</div>
									// 			{/* <img src={card.info.image_uris ? card.info.image_uris.small : null} onClick={() => props.deckModify(card, 'delete')} onMouseOver={() => { props.handleHover(card.info) }} className={styles.cardImage} alt="magic card" height="100px" /> */}
									// 		</div>
									// 	)
									// }
								})}
							</div>
						</div>}
					{/* <div className={styles.deckWrapper}>
						<div className={styles.deckGrid}>
							{props.deck.map((card, index) => {
								if(card.number>1) {
									return <Multiples key={index} card={card} handleHover={props.handleHover} deckModify={props.deckModify}/>
								} else {
									return (
										<div className={styles.cardDiv} key={index}>
											<img src={ card.info.image_uris ? card.info.image_uris.small : null } onClick={()=>props.deckModify(card, 'delete')} onMouseOver={()=>{props.handleHover(card.info)}} className={styles.cardImage} alt="magic card" height="100px" />
										</div>
									)
								}
							})}
						</div>
					</div> */}

				</EmptyWrapper>
			)
	}

}

function mapStateToProps(state) {
	console.log('state in deckBuilding: ', state);
	return {
		currentDeckName: state.currentDeck.name,
		currentDeck: state.currentDeck.deck,
		decks: state.decks.decks,
	};
}

export default connect(mapStateToProps, actions)(DeckBuilding);

// export default DeckBuilding;


// const DeckBuilding = React.forwardRef((props, ref) => {

// 	const { refSelect, refInput } = ref;

// 	return (
// 		<EmptyWrapper>
// 			<header className={styles.controlBar}>
// 				<div className={styles.titleWrapper}>
// 					<b className={styles.title}>{props.deckName}</b>
// 				</div>

// 				<div className={styles.filters}>
// 					<Forwarded
// 						handleDeckNameSubmit={props.handleDeckNameSubmit}
// 						refInput={refInput}
// 					/>

// 				</div>
// 				<div className={styles.filters}>

// 					<Decks decks={props.decks} deckModify={props.deckModify} ref={refSelect} />
// 					{/* <select className={styles.select}>
// 							<option>decks</option>
// 						</select> */}
// 				</div>
// 				<div className={styles.filters}>
// 					<button className={styles.button} onClick={props.saveDeck}>Save</button>
// 				</div>
// 				{/* <div className={styles.filters}>
// 						<button className={styles.button}>Analysis</button>
// 					</div> */}
// 				<div className={styles.filters}>
// 					<button
// 						className={styles.button}
// 						onClick={() => {
// 							// refInput.current.value='';
// 							props.deckModify(null, 'reset');
// 						}}
// 					>Reset</button>
// 				</div>
// 			</header>
// 			{/* do NOT!!!! delete this next section... */}
// 			{/* <div className={styles.deckWrapper}>
// 					<div className={styles.deckGrid}>
// 						{props.deck.map((card, index) => {
// 							if(card.number>1) {
// 								return <Multiples key={index} card={card} handleHover={props.handleHover} deckModify={props.deckModify}/>
// 							} else {
// 								return (
// 									<div className={styles.cardDiv} key={index}>
// 										<img src={ card.info.image_uris ? card.info.image_uris.small : null } onClick={()=>props.deckModify(card, 'delete')} onMouseOver={()=>{props.handleHover(card.info)}} className={styles.cardImage} alt="magic card" height="100px" />
// 									</div>
// 								)
// 							}
// 						})}
// 					</div>
// 				</div> */}
// 			<div className={styles.deckWrapper}>
// 				<div className={styles.deckListedByLine}>
// 					{props.deck.map((card, index) => {
// 						// if (card.number > 0) {
// 						return <div
// 							className={styles.cardLine}
// 							onMouseOver={() => { props.handleHover(card.info) }}
// 							onClick={() => props.deckModify(card, 'delete')}
// 						>{card.name}&nbsp;&nbsp;{card.number}
// 						</div>
// 						// <Multiples key={index} card={card} handleHover={props.handleHover} deckModify={props.deckModify} />
// 						// }
// 						// else {
// 						// 	return (
// 						// 		<div className={styles.cardDiv} key={index}>
// 						// 			<div>{card.name}&nbsp;&nbsp;{card.number}</div>
// 						// 			{/* <img src={card.info.image_uris ? card.info.image_uris.small : null} onClick={() => props.deckModify(card, 'delete')} onMouseOver={() => { props.handleHover(card.info) }} className={styles.cardImage} alt="magic card" height="100px" /> */}
// 						// 		</div>
// 						// 	)
// 						// }
// 					})}
// 				</div>
// 			</div>
// 		</EmptyWrapper>
// 	)
// })

// const Decks = React.forwardRef((props, ref) => {
// 	console.log('props in Decks: ', props);
// 	if(!props.decks) {
// 		return (
// 			<select className={styles.select} ref={ref}>
// 				decks
// 			</select>
// 		)
// 	} else {
// 		const deckArr = props.decks.map((deck,index) => {
// 			// console.log('deck: ', deck.deck_name)
// 				return (
// 					<option key={index}>{deck.deck_name}</option>
// 				)
// 		})
// 		// console.log('deckArr: ', deckArr);
// 		return (
// 			<select
// 				className={styles.select}
// 				// onChange={()=>{console.log('clicked')}}
// 				onChange={()=>props.deckModify(null, 'changeDeck', deckArr)}
// 				>
// 				<option key='001'>decks</option>
// 				{deckArr}
// 			</select>
// 		)
// 	}
// })
