import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import type { Period } from "../modules/periodsApi";

interface PeriodsState {
    Periods: Period[];
    searchQuery: string;
}

const periodsSlice = createSlice({
    name: "periods",
    initialState: {
        Periods: [],
        searchQuery: '',
    } as PeriodsState,
    reducers: {
        setPeriods(state, action: PayloadAction<Period[]>) {
            state.Periods = action.payload
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload
        }
    }
})

export const usePeriods = () =>
    useSelector((state: any) => state.ourPeriods.Periods)

export const useSearchQuery = () =>
    useSelector((state: any) => state.ourPeriods.searchQuery)

export const {
    setPeriods: setPeriodsAction,
    setSearchQuery: setSearchQueryAction
} = periodsSlice.actions

export default periodsSlice.reducer