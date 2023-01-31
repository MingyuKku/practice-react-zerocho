const React = require('react');
const { useRef, useState } = require('react');
const { Component } = React; 

module.exports = function WordRelay() {
// export default function WordRelay() {
  const onRefInput = useRef(null);
  const [ word, setWord ] = useState('강밍구');
  const [ value, setValue ] = useState('');
  const [ result, setResult ] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (value[0] === word[word.length-1]) {
      setWord(value);
      setValue('');
      setResult('딩동댕');
      
    } else {
      setWord('강밍구');
      setValue('');
      setResult('땡');
    }
    onRefInput.current.focus();
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
  
  
  return (
    <>
      <div>{ word }</div>
      <form onSubmit={ onSubmitForm }>
        <label htmlFor="wordInput">글자를 입력하세용</label>
        <input 
          type="text"
          id='wordInput'
          className='wordInput'
          ref={ onRefInput }
          value={ value }
          onChange={ onChangeInput }
        />
        <button>입력</button>
      </form>
      <div>{ result }</div>
    </>
  )
}

// module.exports = WordRelay;