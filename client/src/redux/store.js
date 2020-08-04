// import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore } from "redux-persist";
// import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";

// import rootReducer from "./root-reducer";
// import rootSaga from "./root-saga";

// const sagaMiddleware = createSagaMiddleware();

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middlewares = [sagaMiddleware];

// if (process.env.NODE_ENV === "development") {
//   middlewares.push(logger);
// }

// export const store = createStore(
//   rootReducer,
//   //applyMiddleware(...middlewares),
//   composeEnhancers(applyMiddleware(...middlewares))
// );

// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);

// export default { store, persistStore };

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default { store, persistStore };
