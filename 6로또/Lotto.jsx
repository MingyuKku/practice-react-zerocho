const React = require('react');
const { useState, useRef, useEffect, useMemo } = React;
const Ball = require('./Ball');

function testtest() {
  console.log('테스트')
}

function getWinNumbers() {
  console.log('머여')
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
  const memoTest = useMemo(() => testtest(), [])
  const [ winNumbers, setWinNumbers ] = useState(getWinNumbers);
  const [ winBalls, setWinBalls ] = useState([]);
  const [ bonus, setBonus ] = useState(null);
  const [ redo, setRedo ] = useState(false);

  const [ test, setTest ] = useState(memoTest)

  const timeouts = useRef([]);

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers);
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];

    runTimeouts();
  }

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length-1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prev => {
          return [
            ...prev,
            winNumbers[i]
          ]
        })
      }, (i+1) * 1000)
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000)
  }
  
  useEffect(() => {
    console.log('이펙트')
    runTimeouts();
    return () => {
      timeouts.current.forEach(t => {
        clearTimeout(t);
      })
    }
  }, [winNumbers.length === 0])

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