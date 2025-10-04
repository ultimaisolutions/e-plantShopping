import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
     //const item = state[action.payload];
     state.items.push(action.payload);
     const plainItems = state.items.map((item) => ({ ...item })); //debugging purposes, used to display all of the current items 
     console.log("Item has been added via addItem: ", action.payload);
     console.log("The current cart has:", plainItems);
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      
      console.log(`Item with name ${action.payload} has been removed`);
      
      const plainItems = state.items.map((item) => ({...item}));
      
      console.log("Updated cart items:", plainItems);
    },
    
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;

      const itemToUpdate = state.items.find((item) => item.name === name);
      if(itemToUpdate){
        itemToUpdate.quantity = quantity;
      }
      

    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
