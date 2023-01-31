const React = require('react');
const { Component } = React;

// 라이프 싸이클
// constructor -> 
// render -> 
// ref -> 
// componentDidMount -> 
// -> 브라우저 화면에 표출 ->
// setState/props 바뀔 때 -> 
// shouldComponentUpdate(true) -> 
// 리렌더링 render -> 
// componentDidUpdate -> 
// 컴포넌트 제거시 componentWillUnmount -> 
// 컴포넌트 소멸

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

class RSP extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: rspCoords.바위
  };

  interval;

  componentDidMount () { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
    this.interval = setInterval(this.changeHand, 100);
  }

  componentDidUpdate () { // 해당 컴포넌트 리렌더링 후 실행됨
    
  }

  componentWillUnmount () { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
    clearInterval(this.interval);
  }

  changeHand = () => {
    const {imgCoord} = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };
  
  onClickBtn = (choice) => {
    return (e) => {
      console.log('이거는??', e)
      console.log('스테잇', this.state)
      // e.preventDefault();
      
      const {imgCoord} = this.state;
      clearInterval(this.interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        this.setState({
          result: '비겼습니다!',
        });
      } else if ([-1, 2].includes(diff)) {
        this.setState((prevState) => {
          return {
            result: '이겼습니다!',
            score: prevState.score + 1,
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            result: '졌습니다!',
            score: prevState.score - 1,
          };
        });
      }
      setTimeout(() => {
        this.interval = setInterval(this.changeHand, 100);
      }, 1000);
    }
    
  }

  render () {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )  
  }
}


module.exports = RSP;