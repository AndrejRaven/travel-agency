/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  if(filters.duration){
    const from = filters.duration.from;
    const to = filters.duration.to;

    output = output.filter(trip => 
      trip.days >= from && 
      trip.days <= to);
  }
    
  // TODO - filter by tags
  if(filters.tags > 1){
    const tags = filters.tags;

    output = output.filter(trip => trip.tags.includes(tags));
  }
  // TODO - sort by cost descending (most expensive goes first)
  output.sort((aTrip, bTrip ) => {
    const aTripInt = aTrip.cost.replace('$','').replace(',', '');
    const bTripInt = bTrip.cost.replace('$','').replace(',', '');

    if (parseInt(aTripInt) > parseInt(bTripInt)) return -1;
    if (parseInt(aTripInt) < parseInt(bTripInt)) return 1;
    else return 0;
  });

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter((trip) =>trip.id == tripId);
 
  // TODO - filter trips by tripId

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter((trip) =>trip.country.code == countryCode);

  // TODO - filter trips by countryCode

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}]; 
};

/* ACTIONS */


// // action name creator
// const reducerName = 'trips';
// const createActionName = name => `app/${reducerName}/${name}`;
// console.log(createActionName);
// // action types


// // action creators


// // reducer
// export default function reducer(statePart = [], action = {}) {
//   switch (action.type) {
//     default:
//       return statePart;
//   }
// }

