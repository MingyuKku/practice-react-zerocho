const React = require('react');
const { useState } = React;

function TestRender() {
  const [ text, setText ] = useState('안녕하신가')

  const changeText = () => {
    setText('오우!')
  }

  const renderDescription = () => {
    return (
      text === '오우!'
      ? 
        <>
          <p>요게 생겨버렸디</p>
          <p>오함마 가져와라잉</p>
        </>
      : null
    )
  }

  return (
    <>
      <h1>{ text }</h1>
      <button onClick={ changeText }>텍스트교체</button>

      { renderDescription() }
    </>
  )
}

module.exports = TestRender;