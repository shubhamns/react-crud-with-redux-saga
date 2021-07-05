import { fork, all, takeLatest, call, put } from "redux-saga/effects";
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_BYID_REQUEST,
  GET_USER_BYID_SUCCESS,
  GET_USER_BYID_FAILURE,
  UPDATE_USER_BYID_REQUEST,
  UPDATE_USER_BYID_SUCCESS,
  UPDATE_USER_BYID_FAILURE,
  DELETE_USER_BYID_REQUEST,
  DELETE_USER_BYID_SUCCESS,
  DELETE_USER_BYID_FAILURE,
} from "../types/user";
import {
  createUserAPI,
  getUsersAPI,
  getUserByIdAPI,
  updateUserByIdAPI,
  deleteUserByIdAPI,
} from "../services/user";
import { toast } from "react-toastify";

function* watchCreateUser() {
  yield takeLatest(CREATE_USER_REQUEST, createUserFromAPI);
}

function* watchUserList() {
  yield takeLatest(GET_USER_REQUEST, getUserListFromAPI);
}

function* watchUser() {
  yield takeLatest(GET_USER_BYID_REQUEST, getUserFromAPI);
}

function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER_BYID_REQUEST, updateUserFromAPI);
}

function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_BYID_REQUEST, deleteUserFromAPI);
}

function* createUserFromAPI(action) {
  try {
    const { data, history } = action.payload;
    const user = yield call(createUserAPI, data);
    console.log(user);
    if (user.data.status === 201) {
      yield put({
        type: CREATE_USER_SUCCESS,
        payload: user.data.results,
      });
      toast(user.data.message);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  } catch (error) {
    const { response } = error;
    yield put({
      type: CREATE_USER_FAILURE,
      payload: response.data.message,
    });
    toast(response.data.message);
  }
}

function* getUserListFromAPI(action) {
  try {
    const user = yield call(getUsersAPI, action.payload);
    console.log(user);
    if (user.data.status === 200) {
      yield put({
        type: GET_USER_SUCCESS,
        payload: user.data.results,
      });
    }
  } catch (err) {
    const { response } = err;
    yield put({
      type: GET_USER_FAILURE,
      payload: response.data.message,
    });
  }
}

function* getUserFromAPI(action) {
  try {
    const user = yield call(getUserByIdAPI, action.payload);
    console.log(user);
    if (user.data.status === 200) {
      yield put({
        type: GET_USER_BYID_SUCCESS,
        payload: user.data.response,
      });
    }
  } catch (err) {
    const { response } = err;
    yield put({
      type: GET_USER_BYID_FAILURE,
      payload: response.data.message,
    });
  }
}

function* updateUserFromAPI(action) {
  try {
    const { id, data, history } = action.payload;
    const user = yield call(updateUserByIdAPI, id, data);
    console.log(user);
    if (user.data.status === 200) {
      yield put({
        type: UPDATE_USER_BYID_SUCCESS,
        payload: user.data.results,
      });
      toast(user.data.message);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  } catch (err) {
    const { response } = err;
    yield put({
      type: UPDATE_USER_BYID_FAILURE,
      payload: response.data.message,
    });
    toast(response.data.message);
  }
}

function* deleteUserFromAPI(action) {
  try {
    const user = yield call(deleteUserByIdAPI, action.payload);
    console.log(user);
    if (user.data.status === 200) {
      yield put({
        type: DELETE_USER_BYID_SUCCESS,
        payload: action.payload,
      });
      toast(user.data.message);
    }
  } catch (err) {
    const { response } = err;
    yield put({
      type: DELETE_USER_BYID_FAILURE,
      payload: response.data.message,
    });
    toast(response.data.message);
  }
}

export default function* blogsSaga() {
  yield all([
    fork(watchCreateUser),
    fork(watchUserList),
    fork(watchUser),
    fork(watchUpdateUser),
    fork(watchDeleteUser),
  ]);
}
