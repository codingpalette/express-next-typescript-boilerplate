import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


export interface User {
	loadMyInfoLoading: boolean;
	loadMyInfoDone: boolean;
	loadMyInfoError: any;
	me: any;

	userAddLoading: boolean;
	userAddDone: boolean;
	userAddError: any;

	userLogInLoading: boolean;
	userLogInDone: boolean;
	userLogInError: any;

	userLogOutLoading: boolean;
	userLogOutDone: boolean;
	userLogOutError: any;
}


export const initialState = {
	loadMyInfoLoading: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,
	me: null,

	userAddLoading: false,
	userAddDone: false,
	userAddError: null,

	userLogInLoading: false,
	userLogInDone: false,
	userLogInError: null,

	userLogOutLoading: false,
	userLogOutDone: false,
	userLogOutError: null,
} as User;


export const userReducer = createSlice({
	name: 'users',
	initialState,
	reducers: {
		LOAD_MY_INFO_REQUEST(state) {
			state.loadMyInfoLoading = true;
			state.loadMyInfoDone = false;
			state.loadMyInfoError = null;
		},
		LOAD_MY_INFO_SUCCESS(state, action) {
			state.loadMyInfoLoading = false;
			state.loadMyInfoDone = true;
			state.me = action.payload;
		},
		LOAD_MY_INFO_FAILURE(state, action) {
			state.loadMyInfoLoading = false;
			state.loadMyInfoError = action.payload;
		},
		USER_ADD_REQUEST(state, action) {
			state.userAddLoading = true;
			state.userAddDone = false;
			state.userAddError = null;
		},
		USER_ADD_SUCCESS(state) {
			state.userAddLoading = false;
			state.userAddDone = true;
		},
		USER_ADD_FAILURE(state, action) {
			state.userAddLoading = false;
			state.userAddError = action.payload;
		},
		USER_LOG_IN_REQUEST(state, action) {
			state.userLogInLoading = true;
			state.userLogInDone = false;
			state.userLogInError = null;
		},
		USER_LOG_IN_SUCCESS(state, action) {
			state.userLogInLoading = false;
			state.userLogInDone = true;
			state.me = action.payload;
		},
		USER_LOG_IN_FAILURE(state, action) {
			state.userLogInLoading = false;
			state.userLogInError = action.payload;
		},
		USER_LOG_OUT_REQUEST(state, action) {
			state.userLogOutLoading = true;
			state.userLogOutDone = false;
			state.userLogOutError = null;
		},
		USER_LOG_OUT_SUCCESS(state, action) {
			state.userLogOutLoading = false;
			state.userLogOutDone = true;
			state.me = null;
		},
		USER_LOG_OUT_FAILURE(state, action) {
			state.userLogOutLoading = false;
			state.userLogOutError = action.payload;
		},
	}
});


export const {
	LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
	USER_ADD_REQUEST, USER_ADD_SUCCESS, USER_ADD_FAILURE,
	USER_LOG_IN_REQUEST, USER_LOG_IN_SUCCESS, USER_LOG_IN_FAILURE,
	USER_LOG_OUT_REQUEST, USER_LOG_OUT_SUCCESS, USER_LOG_OUT_FAILURE,
} = userReducer.actions;
export default userReducer.reducer;
