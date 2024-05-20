import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import featuresSelection from './store/reducer/Input/featuresSelection'
import organizamSelector from './store/reducer/Input/OrganizamSelector'
import featureOutput from './store/reducer/output/featuresOutput'
import pagesRoutes from './store/reducer/pagesRoutes'
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  featuresSelection: featuresSelection,
  organizamSelector: organizamSelector,
  featureOutput:featureOutput,
  pagesRoutes :pagesRoutes
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


const app = (
  
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode>, */}
  </Provider>
);

ReactDOM.render(app, document.getElementById('root') || document.createElement('div'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
