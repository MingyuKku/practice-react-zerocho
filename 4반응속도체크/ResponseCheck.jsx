const React = require('react');
const { useMemo, useState, useRef } = React;

const ResponseCheck = () => {
  const [ state, setState ] = useState('waiting');
  const [ message, setMessage ] = useState('클릭해서 시작하세요.');
  const [ result, setResult ] = useState([]);

  const timeout = useRef(null); // 타이머 함수의 아디
  const startTime = useRef(); // 타이머 함수 안에서 수정
  const endTime = useRef(); // 타이머 함수 안에서 수정

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 출력하세요.');
      
      timeout.current = setTimeout(() => {
        startTime.current = new Date();
        setState('now');
        setMessage('지금 클릭!!');
      }, Math.floor(Math.random() * 1000) + 2000) // 2 ~ 3초 후 실행

    } else if (state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급함, 초록색에 클릭해주심');

    } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prev) => {
        return [
          ...prev,
          endTime.current - startTime.current
        ]
      })
    }
  }

  const onReset = () => {
    setResult([])
  }

  return (
    <>
      <div
          id='screen'
          className={ state }
          onClick={ onClickScreen }
        >
          { message }
        </div>
        {
          result.length
          ? 
            <>
              <div>평균 시간: { result.reduce((a,b) => a + b) / result.length }ms</div>
              <button onClick={ onReset }>리셋</button>
            </>          
          : null
        }
    </>
  )
}


module.exports = ResponseCheck;