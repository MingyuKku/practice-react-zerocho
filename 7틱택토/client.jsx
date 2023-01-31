const React = require('react');
const { createRoot } = require('react-dom/client');
const TicTacToe = require('./TicTacToe');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <TicTacToe />
)