import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// enhancer to be able to use chrome redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === "development") middlewares.push(logger);

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
