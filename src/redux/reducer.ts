import {Action} from "redux";
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_LOCATION_CITY = 'UPDATE_LOCATION_CITY';
const UPDATE_USER_LOCATION_CITY = 'UPDATE_USER_LOCATION_CITY';
const UPDATE_UI_LAYER_CITY_LAYER = 'UPDATE_UI_LAYER_CITY_LAYER';
const UPDATE_UI_NAVIGATOR = 'UPDATE_UI_NAVIGATOR';
const UPDATE_USER = 'UPDATE_USER';

const defaultCityId = 110100;
const defaultLocation = {
   latitude: 39.908,
   longitude: 116.397,
   hasLocation: false
};

const defaultLocationCity = {
   cityId: defaultCityId,
   name: '',
   hasLocationCity: false
};

const defaultAccount = {
   openId: ''
};

const initState = {
   site: {
      location: defaultLocation,
      locationCity: defaultLocationCity,
      userLocationCity: defaultLocationCity,
   },
   account: defaultAccount,
   ui: {
      layer: {
         cityLayer: false
      },
      navigator: {
         title: '',
         leftItem: null,
         rightItem: null
      }
   }
};

function locationReducer(state, action) {
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

function accountReducer(state, action) {
   switch (action.type) {
      case UPDATE_USER:
         return {
            ...state,
            account: action['data']
         };
      default:
         return state;
   }
}


function layerReducer(state, action) {
   switch (action.type) {
      case UPDATE_UI_LAYER_CITY_LAYER:
         return {
            ...state,
            cityLayer: action['data']
         };
      default:
         return state;
   }
}

function navigatorReducer(state, action) {
   switch (action.type) {
      case UPDATE_UI_NAVIGATOR:
         return {
            ...state,
            ...action['data']
         };
      default:
         return state;
   }
}

function uiReducer(state, action) {
   return {
      layer: layerReducer(state.layer, action),
      navigator: navigatorReducer(state.navigator, action),
   }
}

export function reducers(state: any = initState, action: Action) {
   return {
      site: locationReducer(state.site, action),
      account: accountReducer(state.account, action),
      ui: uiReducer(state.ui, action),
   }
}