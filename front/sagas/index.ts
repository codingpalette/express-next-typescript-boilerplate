import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from "./userSaga";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
	yield all([
		fork(userSaga),
	])
}
