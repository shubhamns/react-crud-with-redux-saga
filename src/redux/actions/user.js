import {
  CREATE_USER_REQUEST,
  GET_USER_REQUEST,
  GET_USER_BYID_REQUEST,
  UPDATE_USER_BYID_REQUEST,
  DELETE_USER_BYID_REQUEST,
} from "./../types/user";

export function createUser(data, history) {
  return { type: CREATE_USER_REQUEST, payload: { data, history } };
}

export function getUsers() {
  return { type: GET_USER_REQUEST };
}

export function getUserById(id) {
  return { type: GET_USER_BYID_REQUEST, payload: id };
}

export function updateUserById(id, data, history) {
  return { type: UPDATE_USER_BYID_REQUEST, payload: { id, data, history } };
}

export function deleteUserById(id) {
  return { type: DELETE_USER_BYID_REQUEST, payload: id };
}
