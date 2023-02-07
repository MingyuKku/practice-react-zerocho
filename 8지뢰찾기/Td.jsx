const React = require('react');
const { useEffect, useReducer, useCallback, useContext, memo, useMemo } = React;
const MineSearch = require('./MineSearch');

function getTdStyle(code) {
  switch (code) {
    case MineSearch.CODE.NORMAL:
    case MineSearch.CODE.MINE:
      return {
        background: '#444'
      };
    
    case MineSearch.CODE.OPENED:
    case MineSearch.CODE.CLICKED_MINE:
      return {
        background: 'white'
      };

    case MineSearch.CODE.QUESTION:
    case MineSearch.CODE.QUESTION_MINE:
      return {
        background: 'yellow'
      };

    case MineSearch.CODE.FLAG:
    case MineSearch.CODE.FLAG_MINE:
      return {
        background: 'red'
      };

    default:
      return {
        background: 'white'
      };
  }
}

function getTdText(code) {
  switch (code) {
    case MineSearch.CODE.NORMAL:
      return '';

    case MineSearch.CODE.MINE:
      return 'X';

    case MineSearch.CODE.CLICKED_MINE:
      return '펑';

    case MineSearch.CODE.FLAG:
    case MineSearch.CODE.FLAG_MINE:
      return '!';
    
    case MineSearch.CODE.QUESTION:
    case MineSearch.CODE.QUESTION_MINE:
      return '?';

    default:
      return code || ''; // 주변에 지뢰가 없으면 공백
  }
}


const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(MineSearch.TableContext);

  const onClickTd = useCallback(() => {
    if (halted) return; // 게임 종료시

    switch (tableData[rowIndex][cellIndex]) {
      case MineSearch.CODE.OPENED:
      case MineSearch.CODE.FLAG_MINE:
      case MineSearch.CODE.FLAG:
      case MineSearch.CODE.QUESTION_MINE:
      case MineSearch.CODE.QUESTION:
        return;

      case MineSearch.CODE.NORMAL:
        dispatch({type: MineSearch.OPEN_CELL, row: rowIndex, cell: cellIndex});
        return;

      case MineSearch.CODE.MINE:
        dispatch({type: MineSearch.CLICK_MINE, row: rowIndex, cell: cellIndex});
        return;
    }

  }, [tableData[rowIndex][cellIndex], halted])

  const onClickRightTd = useCallback((e) => {
    e.preventDefault();
    if (halted) return; // 게임 종료시

    switch (tableData[rowIndex][cellIndex]) {
      case MineSearch.CODE.NORMAL:
      case MineSearch.CODE.MINE:
        dispatch({type: MineSearch.FLAG_CELL, row: rowIndex, cell: cellIndex});
        return;
       
      case MineSearch.CODE.FLAG:  
      case MineSearch.CODE.FLAG_MINE:  
        dispatch({type: MineSearch.QUESTION_CELL, row: rowIndex, cell: cellIndex});
        return;
      
      case MineSearch.CODE.QUESTION:  
      case MineSearch.CODE.QUESTION_MINE:
        dispatch({type: MineSearch.NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
        return;

      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted])

  return useMemo(() => ( // context로 인해 리렌더링을 방지하기 위해
    <td 
      style={ getTdStyle(tableData[rowIndex][cellIndex]) } 
      onClick={ onClickTd }
      onContextMenu={ onClickRightTd }
    >
      { getTdText(tableData[rowIndex][cellIndex]) }
    </td>
  ), [tableData[rowIndex][cellIndex]])
}

module.exports = memo(Td);