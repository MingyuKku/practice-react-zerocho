const React = require('react');
const { useReducer, useCallback, createContext, useMemo } = React;
const Table = require('./Table');
const Form = require('./Form');

const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};
exports.CODE = CODE;


function plantMine(row, cell, mine) {
  const candidate = new Array(row * cell).fill().map((v,i) => i);
  const shuffle = [];
  
  while (candidate.length > (row * cell) - mine) {
    const choose = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(choose);
  }
  
  const tableData = [];
  
  for (let i = 0; i < row; i++) {
    const rowData = [];
    tableData.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    tableData[ver][hor] = CODE.MINE;
  }
  
  console.log('data??', tableData)
  return tableData;
}

const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: ''
}


const START_GAME = 'START_GAME';
const OPEN_CELL = 'OPEN_CELL';

function reducer(state, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    
    default:
      return state;
  }
}

const MineSearch = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const value = useMemo(() => ({tableData: state.tableData, dispatch: dispatch}), [state.tableData])

  return (
    <TableContext.Provider value={ value }>
      <Form />
      <div>{ state.timer }</div>
      <Table />
      <div>{ state.result }</div>
    </TableContext.Provider>
  )
}

module.exports = MineSearch;
exports.TableContext = TableContext;
exports.START_GAME = START_GAME;
exports.OPEN_CELL = OPEN_CELL;

