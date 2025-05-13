import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productId, colorId, sizeId } = action.payload;
      const product = state.items.some(
        (item) =>
          item.productId === productId &&
          item.colorId === colorId &&
          item.sizeId === sizeId
      );
      if (!product) {
        state.items.push({ productId, colorId, sizeId });
      }
    },
    removeProduct: (state, action) => {
      const { productId, colorId, sizeId } = action.payload;
      state.items = state.items.filter(
        (item) =>!(item.productId === productId &&
          item.colorId === colorId &&
          item.sizeId === sizeId)
      );
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
