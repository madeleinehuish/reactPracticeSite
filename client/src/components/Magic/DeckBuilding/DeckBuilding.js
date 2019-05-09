import React, { Component } from 'react';
import styles from './DeckBuilding.css';
import EmptyWrapper from '../../EmptyWrapper/EmptyWrapper';


const Decks = React.forwardRef((props, ref) => {
	console.log('props in Decks: ', props);
	if(!props.decks) {
		return (
			<select className={styles.select} ref={ref}>
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
				onChange={()=>props.deckModify(null, 'changeDeck', deckArr)}
				>
				<option key='001'>decks</option>
				{deckArr}
			</select>
		)
	}
})

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

const ForwardRef = (props, ref) => {
	return <DeckNameInput {...props } forwardedRef={ref}/>
}

const Forwarded = React.forwardRef(ForwardRef);

class DeckNameInput extends Component {


	state = {
		inputValueDeck: ''
	}

	handleInput = (event) => {
		this.setState({ inputValueDeck: event.target.value })
	}

	render() {
		// console.log('inside of DeckNameInput, forwardRef: ', this.props.refInput)
		return (
			<form onSubmit={(event)=> this.props.handleDeckNameSubmit(event, this.state.inputValueDeck)}>
				<input
					className={styles.input}
					value={this.state.inputValueDeck}
					onChange={this.handleInput}
					type='text'
					placeholder='change deck name'
					ref={this.props.refInput}
					>
				</input>
			</form>
		)
	}
}

const DeckBuilding = React.forwardRef((props, ref) => {

		const { refSelect, refInput } = ref;

		return (
			<EmptyWrapper>
				<header className={styles.controlBar}>
					<div className={styles.titleWrapper}>
						<b className={styles.title}>{props.deckName}</b>
					</div>

					<div className={styles.filters}>
						<Forwarded
							handleDeckNameSubmit={props.handleDeckNameSubmit}
							refInput={refInput}
						/>

					</div>
					<div className={styles.filters}>

						<Decks decks={props.decks} deckModify={props.deckModify} ref={refSelect} />
						{/* <select className={styles.select}>
							<option>decks</option>
						</select> */}
					</div>
					<div className={styles.filters}>
						<button className={styles.button} onClick={props.saveDeck}>Save</button>
					</div>
					{/* <div className={styles.filters}>
						<button className={styles.button}>Analysis</button>
					</div> */}
					<div className={styles.filters}>
						<button
							className={styles.button}
							onClick={()=>{
								// refInput.current.value='';
								props.deckModify(null, 'reset');
							}}
						>Reset</button>
					</div>
				</header>
				{/* do NOT!!!! delete this next section... */}
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
				<div className={styles.deckWrapper}>
					<div className={styles.deckListedByLine}>
						{props.deck.map((card, index) => {
							if (card.number > 1) {
								return <div 
								          className={styles.cardLine} 
								          onMouseOver={() => { props.handleHover(card.info) }} 
													>{card.name}&nbsp;&nbsp;{card.number}
											 </div>
								// <Multiples key={index} card={card} handleHover={props.handleHover} deckModify={props.deckModify} />
							} else {
								return (
									<div className={styles.cardDiv} key={index}>
										<div>{card.name}&nbsp;&nbsp;{card.number}</div>
										{/* <img src={card.info.image_uris ? card.info.image_uris.small : null} onClick={() => props.deckModify(card, 'delete')} onMouseOver={() => { props.handleHover(card.info) }} className={styles.cardImage} alt="magic card" height="100px" /> */}
									</div>
								)
							}
						})}
					</div>
				</div>
			</EmptyWrapper>
		)
})

export default DeckBuilding;
