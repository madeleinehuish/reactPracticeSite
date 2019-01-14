import { FETCH_TRUCKS
			 } from './types';

 export const gettrucks = (filterValue, cb) => async dispatch => {
		  if(!cb && typeof filterValue === 'function') cb = filterValue;
		  //get current date and time
		  const date = new Date();
		  const day = date.getDay();
		  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		  const hour = date.getHours();
		  let minutes = date.getMinutes();
		  if (minutes < 10) {
		 	 minutes = '0' + minutes;
		  }
		  let hour12 = hour;
		  let twelve;
		  if(hour>12) {
		 	 hour12 = hour - 12;
		 	 twelve = 'PM'
		  } else if (hour===12){
		 	 twelve = 'PM';
		  } else twelve = 'AM';
		  const timeCurrent = hour12 + ':' + minutes + twelve;
		  const dayCurrent = days[day];
		  console.log(timeCurrent, dayCurrent); //logging so they are used. i plan to use these variables soon.

		  const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
		 	const query = `${baseUrl}?dayorder=${day}`;

		  const filteredByTime = arr => {
		 		 const filterThis = arr.filter(elem => {
		 			 const start24 = Number(elem.start24.substr(0,2));
		 			 const end24 = Number(elem.end24.substr(0,2));

		 			 return start24 <= hour && hour < end24;
		 		 })
		 		 return filterThis;
		 		}

		 	 const response = await fetch(query);
		 	 const truckArray = await response.json();

		 	 //filter by current time
		 	 const trucksFilteredByTime = filteredByTime(truckArray);

		 	 //trying input filter
		 	 if(filterValue.length) {
		 			const trucksFilteredByInputAndTime = trucksFilteredByTime.filter(elem => {
		 					 return elem.applicant.substr(0,filterValue.length).toUpperCase() === filterValue.toUpperCase();
		 			})
		 			dispatch({
		 				type: FETCH_TRUCKS,
		 					payload: trucksFilteredByInputAndTime
		 			});

		 	 } else {

		 		 dispatch ({
		 			 type: FETCH_TRUCKS,
		 			 payload: trucksFilteredByTime
		 		 });
		 	 }

		 	 cb();
 }
