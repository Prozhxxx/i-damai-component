import {createStore} from "redux";
import {locationReducer} from "@/redux/reducer";
import GlobalConstant from "@/util/GlobalConstant";

const store = createStore(locationReducer, window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']());
GlobalConstant.store = store;
export default store;
