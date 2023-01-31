const React = require('react');
const { useCallback } = React;
const TicTacToe = require('./TicTacToe')

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickRd = useCallback(() => {
    if (cellData) return; // 이미 클릭한 경우

    dispatch({type: TicTacToe.CLICK_SELL, row: rowIndex, cell: cellIndex}); // dispatch인자가 reducer의 두번째 매개변수 action으로 들어감
    dispatch({type: TicTacToe.CHANGE_TURN});
  }, [cellData])
  
  return (
    <td onClick={ onClickRd }>{ cellData }</td>
  )
}

module.exports = Td;