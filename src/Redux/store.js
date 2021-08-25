import { combineReducers , createStore } from "redux";
import selectReducer from "./selectReducer";

let reducers = combineReducers({
        select: selectReducer
})

const store = createStore(reducers)

export default store;
window.store = store