import { createSlice } from "@reduxjs/toolkit";


let initialState = {
	price: '3 300 000',
	values: [3300000],
	percent: '13',
	percentValues: [13],
	percentPrice: '429 000 ₽',
	month: 60,
	monthValues: [60],
	finalPrice: '7 334 640',
	monthPrice: '115 094',
	loader: false,
};

const calculator = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setPrice(state, action) {
      state.price = action.payload;
    },
    setPriceValues(state, action) {
      state.values = action.payload;
    },
    setPercent(state, action) {
      state.percent = action.payload;
    },
    setPercentPrice(state, action) {
      let rePrice = /(\d)(?=(\d{3})+(?!\d))/g;
      let value = String(action.payload);
      state.percentPrice = `${value.replace(rePrice, ('$1 '))} ₽`;
    },
    setPercentValues(state, action) {
      state.percentValues = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
    setMonthValues(state, action) {
      state.monthValues = action.payload;
    },
    setFinalPrice(state) {
      let {percentPrice, month, monthPrice} = state;
      percentPrice = parseInt(percentPrice.replaceAll(' ', ''));
      month = parseInt(month);
      monthPrice = parseInt(monthPrice.replaceAll(' ', ''));

      let rePrice = /(\d)(?=(\d{3})+(?!\d))/g;
      const value = percentPrice + month * monthPrice;
      state.finalPrice = String(Math.trunc(value)).replace(rePrice, ('$1 '));
    },
    setMonthPrice(state) {
      let {price, percentPrice, month} = state
      price = parseInt(price.replaceAll(' ', ''));
      percentPrice = parseInt(percentPrice.replaceAll(' ', ''));
      month = parseInt(month)

      let rePrice = /(\d)(?=(\d{3})+(?!\d))/g;
      const value = (price - percentPrice) * (0.035 * Math.pow((1 + 0.035), month)) / (Math.pow((1 + 0.035), month) - 1)
      state.monthPrice = String(Math.trunc(value)).replace(rePrice, ('$1 '));
    },
    setLoader(state, action) {
      state.loader = action.payload;
    }
  }
})

export const {
  setPrice,
  setPriceValues,
  setPercent,
  setPercentPrice,
  setPercentValues,
  setMonth,
  setMonthValues,
  setFinalPrice,
  setMonthPrice,
  setLoader
} = calculator.actions
export default calculator.reducer;