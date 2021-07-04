import userSaga from "./user";

const rootSaga = (sagaMiddleware) => {
  sagaMiddleware.run(userSaga);
};
export default rootSaga;
