const React = require('react');
const { useEffect, useReducer, useCallback, useContext } = React;
const MineSearch = require('./MineSearch');

function getTdStyle(code) {
  switch (code) {
    case MineSearch.CODE.NORMAL:
    case MineSearch.CODE.MINE:
      return {
        background: '#444'
      }
    
    case MineSearch.CODE.OPENED:
      return {
        background: 'white'
      }

    default:
      return {
        background: 'white'
      }
  }
}

function getTdText(code) {
  switch (code) {
    case MineSearch.CODE.NORMAL:
      return '';

    case MineSearch.CODE.MINE:
      return 'X';
    
    default:
      return '';
  }
}


const Td = ({ rowIndex, cellIndex }) => {
  const { tableData } = useContext(MineSearch.TableContext);

  return (
    <td style={ getTdStyle(tableData[rowIndex][cellIndex]) }>
      { getTdText(tableData[rowIndex][cellIndex]) }
    </td>
  )
}

module.exports = Td;