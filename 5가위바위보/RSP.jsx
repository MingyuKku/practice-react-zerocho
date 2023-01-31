const React = require('react');
const { Component, useState, useRef, useEffect, useLayoutEffect } = React;
import useInterval from './useInterval';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => v[1] === imgCoord)[0];
};

function RSP() {
  const [ result, setResult ] = useState('');
  const [ score, setScore ] = useState(0);
  const [ imgCoord, setImgCoord ] = useState(rspCoords.바위);
  const interval = useRef(0);

  // useLayoutEffect(() => {
  //   console.log('화면 바뀌나여')
  // })

  useEffect(() => { // componentDidMount, componentDidUpdate의 역할을 함
    interval.current = setInterval(changeHand, 100); // componentDidMount시 실행했던 함수

    return () => {  // componentWillUnmount의 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]) // 2번째 인수인 배열 안에 값이 바뀔 때마다 useEffect가 재실행됨


  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);

    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);

    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);

    }
  };

  useInterval(changeHand, isRunning ? 100 : null);

  const onClickBtn = (choice) => {
    return (e) => {
      clearInterval(interval.current);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult('비겼습니다!');
        
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다!');
        setScore((prev) => prev + 1);

      } else {
        setResult('졌습니다!');
        setScore((prev) => prev - 1);
      }

      setTimeout(() => {
        interval.current = setInterval(changeHand, 100);
      }, 1000);
    }
    
  }
  
  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}

module.exports = RSP;