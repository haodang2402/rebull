import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: "product",
    initialState: { products: [], isLoading: false },
    reducers: {

    },
})

export default ProductSlice.reducer;

export const { } = ProductSlice.actions;