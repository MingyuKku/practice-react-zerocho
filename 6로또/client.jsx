const React = require('react');
const { createRoot } = require('react-dom/client');
const Lotto = require('./Lotto');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Lotto />
)