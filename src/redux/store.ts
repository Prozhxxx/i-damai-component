import {createStore} from "redux";
import {locationReducer} from "@/redux/reducer";
import GlobalConstant from "@/util/GlobalConstant";

const store = createStore(locationReducer);
GlobalConstant.store = store;
export default store;
