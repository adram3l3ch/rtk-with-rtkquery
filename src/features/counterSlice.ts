import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: state => {
            state.count += 1;
        },
        decrease: state => {
            state.count -= 1;
        },
        reset: () => initialState,
    },
});

export const { decrease, increase, reset } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
export default counterReducer;
