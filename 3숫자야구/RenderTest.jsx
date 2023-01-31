// import React, { Component } from 'react';
const React = require('react');
const { PureComponent } = React;


class RenderTest extends PureComponent {
  state = {
    counter: 0,
    arr: []
  }

  onClick = () => {
    this.setState((prev) => {
      console.log('기존값', prev)
      prev.counter++;
      // prev.arr.push(prev.counter)
      return {
        // counter: prev.counter++,
        arr: [...prev.arr, prev.counter]
        // arr: prev.arr
      }
    }, () => {
      console.log('셋스테잇 후', this.state, this.state.arr)
    });
  }

  render () {
    // onClick 함수 실행시 실제 state값을 변경하지 않았지만 렌더링이 재호출된다
    // 왜?? 리액트가 멍청해서 setState함수만 호출되도 리렌더링 시키기 때문에...
    // console.log('렌더링', this.state)
    return (
      <>
        <button onClick={ this.onClick }>클릭</button>
        <p>{ this.state.counter }</p>
        <p>{ this.state.arr }</p>
      </>
    )
  }
}

module.exports = RenderTest;