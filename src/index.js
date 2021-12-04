import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import WorkService from './servises/workService';
import WorkServiceContext from './components/work-service-context';
import store from './store';

const workService = new WorkService()

ReactDOM.render(
  <Provider store={store}>
    <WorkServiceContext.Provider value={workService}>
      <Router>
        <App />
      </Router>
    </WorkServiceContext.Provider>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
