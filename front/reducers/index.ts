import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from "@reduxjs/toolkit";

import userReducer from './userReducer';

// (이전상태, 액션) => 다음상태
const reducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				userReducer
			});
			return combinedReducer(state, action);
		}
	}
};

export type ReducerType = ReturnType<typeof reducer>;

export default reducer;
