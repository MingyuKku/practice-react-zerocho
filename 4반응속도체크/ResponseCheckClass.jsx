const React = require('react');
const { PureComponent } = React;
// import React, { Component } from 'react';


class ResponseCheckClass extends PureComponent {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: []
  }

  timeout;
  startTime;
  endTime;
  
  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 출력하세요.'
      });
      
      this.timeout = setTimeout(() => {
        this.startTime = new Date();
        this.setState({
          state: 'now',
          message: '지금 클릭!!'
        })
      }, Math.floor(Math.random() * 1000) + 2000) // 2 ~ 3초 후 실행

    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급함, 초록색에 클릭해주심'
      })

    } else if (state === 'now') { // 반응속도 체크
      this.endTime = new Date();
      this.setState((prev) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [
            ...prev.result,
            this.endTime - this.startTime
          ]
        }
      })
    }
    
  }

  onReset = () => {
    this.setState({
      result: []
    })
  }

  render () {
    return (
      <>
        <div
          id='screen'
          className={ this.state.state }
          onClick={ this.onClickScreen }
        >
          { this.state.message }
        </div>
        {
          this.state.result.length
          ? 
            <>
              <div>평균 시간: { this.state.result.reduce((a,b) => a + b) / this.state.result.length }ms</div>
              <button onClick={ this.onReset }>리셋</button>
            </>          
          : null
        }
      </>
    )
  }
}

module.exports = ResponseCheckClass;
// export default ResponseCheckClass;