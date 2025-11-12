import { combineReducers, configureStore } from "@reduxjs/toolkit"
import periodsReducer from "./slices/periodsSlice"

export default configureStore({
    reducer: combineReducers({
        ourPeriods: periodsReducer
    })
})