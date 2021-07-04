import { fork, all, takeLatest, call, put } from "redux-saga/effects";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../types/user";
import { getUsersAPI } from "../services/user";

function* watchUserList() {
  yield takeLatest(GET_USER_REQUEST, getUsersFromAPI);
}

function* getUsersFromAPI(action) {
  const { response, error } = yield call(getUsersAPI, action.payload);
  if (response) {
    yield put({
      type: GET_USER_SUCCESS,
      payload: response.data.results,
    });
  } else {
    yield put({
      type: GET_USER_FAILURE,
      payload: error,
    });
  }
}

export default function* blogsSaga() {
  yield all([fork(watchUserList)]);
}
