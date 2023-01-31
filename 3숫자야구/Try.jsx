const React = require('react');
const { useState } = React;

const Try = ({tryInfo}) => {
  const [ result, setResult ] = useState(tryInfo.result)
  
  const onClick = () => {
    setResult('키득')
  }

  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
      <button onClick={ onClick }>{ result }</button>
    </>
  );
};

// Try.displayName = 'Try';

module.exports = React.memo(Try);