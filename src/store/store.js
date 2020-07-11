import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './domains';
import { rootSaga } from '../sagas';

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware)
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(middlewares)
  );
  // run rootSaga to handle side effects 
  sagaMiddleware.run(rootSaga);

  return store;
}