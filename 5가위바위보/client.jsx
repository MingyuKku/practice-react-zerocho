const React = require('react');
const { createRoot } = require('react-dom/client');
const RSP = require('./RSP');
// const RSP = require('./Test');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <RSP />
)