const React = require('react');
const { Component } = React;
const BallClass = require('./BallClass');

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

class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false
  }

  timeouts = [];

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false
    })
    this.timeouts = [];
  }

  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length-1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prev => {
          return {
            winBalls: [
              ...prev.winBalls,
              winNumbers[i]
            ]
          }
        })
      }, (i+1) * 1000)
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true
      })
    }, 7000)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentDidMount () {
    this.runTimeouts();
  }

  componentWillUnmount () {
    this.timeouts.forEach(t => {
      clearTimeout(t);
    })
  }

  
  render () {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id='결과창'>
          { winBalls.map(v => <BallClass key={ v } number={ v } />) }
        </div>
        { bonus && <div>보너스!</div> }
        { bonus && <BallClass number={ bonus } /> }
        { redo && <button onClick={ this.onClickRedo }>한 번 더!</button> }
      </>
    )
  }
}

module.exports = LottoClass;