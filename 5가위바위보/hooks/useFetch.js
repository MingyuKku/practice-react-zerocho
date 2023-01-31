const React = require('react');
const { useState, useEffect } = React;

function useFetch(url) {
  const [ value, setValue ] = useState();

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
      setValue(res);
    })
  }, [url])

  return value;
}

module.exports = useFetch;