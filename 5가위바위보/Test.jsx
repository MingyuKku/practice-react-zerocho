const React = require('react');
const { useState, useEffect } = React;
const useFetch = require('./hooks/useFetch');

function Test() {
  // const url = 'https://jsonplaceholder.typicode.com/posts';
  const user = useFetch('https://jsonplaceholder.typicode.com/posts');

  // const [ user, setUser ] = useState();
  
  // useEffect(() => {
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(res => {
  //     setUser(res);
  //   })
  // }, [])

  const testClick = () => {
    console.log('클릭!', user)
  }

  return (
    <>
      <h4>테스트</h4>
      <button onClick={ testClick }>클릭</button>
    </>
  )
}

module.exports = Test;