import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    name?: string;
    id?: string | number;
    age?: number;
};

const initialState: InitialState = {
    name: "John Doe",
    id: 123,
    age: 26,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName: (state, action: PayloadAction<{ name: string }>) => {
            state.name = action.payload.name;
        },
        updateAge: (state, action: PayloadAction<{ age: number }>) => {
            state.age = action.payload.age;
        },
        updateUser: (_, action: PayloadAction<InitialState | undefined>) => {
            return action.payload || {};
        },
    },
});

export const { updateAge, updateName, updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userReducer;
