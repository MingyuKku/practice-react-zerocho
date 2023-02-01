const React = require('react');
const { createRoot } = require('react-dom/client');
const MineSearch = require('./MineSearch');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <MineSearch />
)