import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  discountCode: "",
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId } = action.payload;

      const cartItemsInLocalStorage = JSON.parse(localStorage.getItem(`cart_of_${userId}`)) || [];

      const existingItemIndex = cartItemsInLocalStorage.findIndex((item) => item.productId === action.payload.productId);

      if (existingItemIndex === -1) {
        state.cartItems.push(action.payload);
        cartItemsInLocalStorage.push(action.payload);
      } else {
        state.cartItems[existingItemIndex] = action.payload;
      }

      localStorage.setItem(`cart_of_${userId}`, JSON.stringify(cartItemsInLocalStorage));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
    },

    loadCartFromLocalStorage: (state, action) => {
      const { userId } = action.payload;
      const cartItems = localStorage.getItem(`cart_of_${userId}`);
      if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        state.cartItems = Array.isArray(parsedCartItems) ? parsedCartItems : [parsedCartItems];
      }
    },

    removeItemFromLocalStorage: (state, action) => {
      const { userId } = action.payload;
      const productId = action.payload.productId;
      const updatedCartItems = state.cartItems.filter((item) => item.productId !== productId);
      localStorage.setItem(`cart_of_${userId}`, JSON.stringify(updatedCartItems));
    },

    clearCartFromLocalStorage: (state, action) => {
      const { userId } = action.payload;
      localStorage.removeItem(`cart_of_${userId}`);
    },

    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
      const tax = Math.round(subtotal * 0.18);
      let shippingCharges = 0;
      if (subtotal > 0 && subtotal <= 5000) {
        shippingCharges = 100;
      } else if (subtotal > 5000) {
        shippingCharges = 250;
      }
      const total = subtotal + shippingCharges - state.discount;
      state.subTotal = subtotal;
      state.tax = tax;
      state.shippingCharges = shippingCharges;
      state.total = total;
    },

    applyDiscount: (state, action) => {
      state.discount = action.payload.discount;
      state.discountCode = action.payload.coupon;
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },

    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  calculatePrice,
  applyDiscount,
  saveShippingInfo,
  resetCart,
  loadCartFromLocalStorage,
  removeItemFromLocalStorage,
  clearCartFromLocalStorage,
} = cartReducer.actions;
