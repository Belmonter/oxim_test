import { configureStore } from '@reduxjs/toolkit';

import priceReducer from './calculatorSlice';

export default configureStore({
	reducer: {
		calculator: priceReducer,
	},
});
