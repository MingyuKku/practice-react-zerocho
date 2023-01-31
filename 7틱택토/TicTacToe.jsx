const React = require('react');
const { useEffect, useReducer, useCallback } = React;
const Table = require('./Table');

// import React, { useState, useReducer, useCallback } from 'react';
// import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['','',''],
    ['','',''],
    ['','',''],
  ],
  recentCell: [-1, -1]
}

const SET_WINNER = 'SET_WINNER';
const CLICK_SELL = 'CLICK_SELL';
const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WINNER':
      return { // 스프레드 문법으로 깊은 복사를 진행
        ...state,
        winner: action.winner
      }

    case 'CLICK_SELL':
      console.log('클릭 셀')
      const tableData= [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData: tableData,
        recentCell: [action.row, action.cell]
      };

    case 'CHANGE_TURN':
      console.log('첸지 턴')
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      };
  }
}



const TicTacToe = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  useEffect(() => {
    const { recentCell } = state
    console.log('유즈이펙트', recentCell)
  }, [state.tableData])


  const onClickTable = useCallback(() => {
    dispatch({type: SET_WINNER, winner: 'O'}) // dispatch인자가 reducer의 두번째 매개변수 action으로 들어감
  }, [])

  return (
    <>
      <Table tableData={ state.tableData } dispatch={ dispatch } />
      { state.winner && <div>{ state.winner }님의 승리</div> }
    </>
  )
}

module.exports = TicTacToe;

exports.SET_WINNER = SET_WINNER;
exports.CLICK_SELL = CLICK_SELL;
exports.CHANGE_TURN = CHANGE_TURN;
// export default TicTacToe