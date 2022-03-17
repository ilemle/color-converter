import { combineReducers } from "redux";
import { colorReducer } from "./colorReducer";


export const rootReducer=combineReducers({
    colors: colorReducer
})

export type RootState = ReturnType<typeof rootReducer>;
