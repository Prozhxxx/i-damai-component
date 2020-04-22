import {Action} from "redux";
const UPDATE_LOCATION = 'UPDATE_LOCATION';

const defaultCityId = 110100;
const defaultLocation = {
   latitude: 31.23,
   longitude: 121.47,
   hasLocation: false
};

const defaultLocationCity = {
   cityId: defaultCityId,
   hasLocationCity: false
};

const initState = {
   location: defaultLocation,
   locationCity: defaultLocationCity,
   userLocationCity: defaultLocationCity
};

export function locationReducer(state: any = initState, action: Action) {
   switch (action.type) {
      case UPDATE_LOCATION:
         return {...state, ...action['data']};
      default:
         return state;
   }
}