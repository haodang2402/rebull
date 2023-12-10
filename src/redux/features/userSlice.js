import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: { user: null, auth: false },
    reducers: {

    },
})

export default UserSlice.reducer;

export const { } = UserSlice.actions;