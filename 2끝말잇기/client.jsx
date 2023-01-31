const React = require('react');
const { createRoot } = require('react-dom/client');
const WordRelay = require('./WordRelay');
// 아래와 같이 import로 사용해도 됨
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import WordRelay from './WordRelay';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <WordRelay />
);
