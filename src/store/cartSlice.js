import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(){},
    remove(){}
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
