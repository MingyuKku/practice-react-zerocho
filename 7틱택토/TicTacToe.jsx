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
const RESET_GAME = 'RESET_GAME';

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

    case 'RESET_GAME':
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['','',''],
          ['','',''],
          ['','',''],
        ],
        recentCell: [-1, -1]
      }
  }
}



const TicTacToe = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { tableData, recentCell, turn } = state;

  useEffect(() => {
    console.log('유즈이펙트', recentCell)
    
    const [ row, cell ] = recentCell;

    if (row < 0) {
      return;
    }

    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) win = true;
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) win = true;
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) win = true;
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) win = true;

    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });

    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });

      if (all) {
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });

      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }

  }, [state.recentCell])


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
exports.RESET_GAME = RESET_GAME;
// export default TicTacToe