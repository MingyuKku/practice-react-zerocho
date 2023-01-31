const React = require('react');
const { useState, useRef, useEffect, useMemo, useCallback } = React;
const Ball = require('./Ball');


function getWinNumbers() {
  const candidate = new Array(45).fill(0).map((v,i) => v + i);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
  }

  const bounceNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0,6).sort((a,b) => a - b);

  return [
    ...winNumbers,
    bounceNumber
  ]
}

function LottoClass() {
  console.log('렌더')
  const getNumberMemo = useMemo(() => getWinNumbers(), []);
  const [ winNumbers, setWinNumbers ] = useState(getNumberMemo);
  const [ winBalls, setWinBalls ] = useState([]);
  const [ bonus, setBonus ] = useState(null);
  const [ redo, setRedo ] = useState(false);

  const timeouts = useRef([]);

  useEffect(() => {
    runTimeouts();
    return () => {
      timeouts.current.forEach(t => {
        clearTimeout(t);
      })
    }
  }, [timeouts.current])


  const onClickRedo = useCallback(() => {
    console.log('당첨숫자', winNumbers) // winNumbers의 값은 초기값만 찍힘 업뎃된 값으로 안바뀜
    // 따라서 useCallback안에서 사용되는 state는 두번째 인자 배열 안에 넣어줘야 업뎃이 됨
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  }, [winNumbers])

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length-1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prev => {
          return [
            ...prev,
            winNumbers[i]
          ]
        })
      }, (i+1) * 500)
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 3000)
  }

  const styleGood = {
    fontSize: '30px',
    fontWeight: 500,
    marginTop: '20px'
  }

  return (
    <>
      <div style={ styleGood }>당첨 숫자</div>
      <div id='결과창'>
        { winBalls.map(v => <Ball key={ v } number={ v } />) }
      </div>
      { bonus && <div>보너스!</div> }
      { bonus && <Ball number={ bonus } /> }
      { redo && <button onClick={ onClickRedo }>한 번 더!</button> }
    </>
  )

}



module.exports = LottoClass;