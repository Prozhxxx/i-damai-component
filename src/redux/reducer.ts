import {Action} from "redux";
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_LOCATION_CITY = 'UPDATE_LOCATION_CITY';
const UPDATE_USER_LOCATION_CITY = 'UPDATE_USER_LOCATION_CITY';

const defaultCityId = 110100;
const defaultLocation = {
   latitude: 39.908,
   longitude: 116.397,
   hasLocation: false
};

const defaultLocationCity = {
   cityId: defaultCityId,
   address: '',
   name: '',
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
         return {
            ...state,
            location: {
               ...action['data']
            }
         };
      case UPDATE_LOCATION_CITY:
         return {
            ...state,
            locationCity: {
               ...action['data']
            }
         };
      case UPDATE_USER_LOCATION_CITY:
         return {
            ...state,
            userLocationCity: {
               ...action['data']
            }
         };
      default:
         return state;
   }
}