import React from 'react';
import ReactDOM from 'react-dom/client';

// const ResponseCheck = require('./TestRender')
// const ResponseCheck = require('./ResponseCheckClass')
const ResponseCheck = require('./ResponseCheck')

ReactDOM.createRoot(document.querySelector('#root')).render(
  <ResponseCheck />
);



// const React = require('react');
// const { createRoot } = require('react-dom/client');
// const ResponseCheck = require('./ResponseCheckClass');

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
// root.render(
//   <ResponseCheck />
// );