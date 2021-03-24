import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';

import {
	LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
	USER_ADD_REQUEST, USER_ADD_SUCCESS, USER_ADD_FAILURE,
	USER_LOG_IN_REQUEST, USER_LOG_IN_SUCCESS, USER_LOG_IN_FAILURE,
	USER_LOG_OUT_REQUEST, USER_LOG_OUT_SUCCESS, USER_LOG_OUT_FAILURE,
} from '../reducers/userReducer';


function loadMyInfoAPI() {
	return axios.get('/user' )
}

function* loadMyInfo() {
	try {
		// yield delay(1000);
		const res = yield call(loadMyInfoAPI)
		yield put(LOAD_MY_INFO_SUCCESS(res.data));
	} catch (err) {
		console.error(err);
		yield put(LOAD_MY_INFO_FAILURE(err));
	}
}

function userAddAPI(data: {email: string,  password: string}) {
	return axios.post('/user', data);
}

function* userAdd(action: PayloadAction<{email: string, password: string}>) {
	try {
		const data = {
			email: action.payload.email,
			password: action.payload.password
		}
		yield call(userAddAPI, data)
		yield put(USER_ADD_SUCCESS());
	} catch (err) {
		console.error(err);
		yield put(USER_ADD_FAILURE(err));
	}
}

function userLogInAPI(data: {email: string, password: string}) {
	return axios.post('/user/login', data);
}

function* userLogIn(action: PayloadAction<{email: string, password: string}>) {
	try {
		const data = {
			email: action.payload.email,
			password: action.payload.password
		}
		const res = yield call(userLogInAPI, data)
		console.log(res.data);
		yield put(USER_LOG_IN_SUCCESS(res.data));
	} catch (err) {
		console.error(err);
		yield put(USER_LOG_IN_FAILURE(err));
	}
}

function userLogOutAPI() {
	return axios.post('/user/logout');
}

function* userLogOut() {
	try {
		yield call(userLogOutAPI )
		// yield  delay(1000)
		yield put({
			type: USER_LOG_OUT_SUCCESS,
		})
	} catch (e) {
		console.log(e);
		yield put({
			type: USER_LOG_OUT_FAILURE,
			error: e.response.data
		})
	}
}


function* watchLoadMyInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchUserAdd() {
	yield takeLatest(USER_ADD_REQUEST, userAdd)
}

function* watchUserLogin() {
	yield takeLatest(USER_LOG_IN_REQUEST, userLogIn)
}

function* watchUserLogOut() {
	yield takeLatest(USER_LOG_OUT_REQUEST, userLogOut)
}



export default function* userSaga() {
	yield all([
		fork(watchLoadMyInfo),
		fork(watchUserAdd),
		fork(watchUserLogin),
		fork(watchUserLogOut),
	])
}
