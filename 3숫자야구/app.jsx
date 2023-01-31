const React = require('react');
const { createRoot } = require('react-dom/client');
// const NumberBaseball = require('./NumberBaseball');
const NumberBaseball = require('./NumberBaseball');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <NumberBaseball />
);
