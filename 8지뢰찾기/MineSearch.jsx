const React = require('react');
const { useReducer, useCallback, createContext, useMemo, useEffect } = React;
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
  
  // console.log('data??', tableData)
  return tableData;
}

const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: false
});


const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true, // 게임 중단 여부
  opendCount: 0,
}


const START_GAME = 'START_GAME';
const OPEN_CELL = 'OPEN_CELL';
const CLICK_MINE = 'CLICK_MINE';
const FLAG_CELL = 'FLAG_CELL';
const QUESTION_CELL = 'QUESTION_CELL';
const NORMALIZE_CELL = 'NORMALIZE_CELL';
const INCREMENT_TIMER = 'INCREMENT_TIMER';

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
        opendCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
        result: '',
      }

    case OPEN_CELL: {
      const tableData = [...state.tableData];
      // tableData[action.row] = [...state.tableData[action.row]];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      })

      const checked = [];
      let opendCount = 0; // 열린 칸 갯수 체크

      function checkArround(row, cell) {
        if ([  // 열린 칸이거나 지뢰가 있는 칸인 경우
            CODE.OPENED, 
            CODE.FLAG_MINE, 
            CODE.FLAG, 
            CODE.QUESTION_MINE, 
            CODE.QUESTION
          ].includes(tableData[row][cell])
        ) return;

        if (  // 상하좌우칸이 없는 칸인 경우
          row < 0
          || row >= tableData.length
          || cell < 0
          || cell >= tableData[0].length
        ) return;

        if (checked.includes(`${row},${cell}`)) return; // 이미 오픈한 칸은 건너뜀
        checked.push(`${row},${cell}`); // 클릭한 칸을 기억하기 위해

        let around = [];
        if (tableData[row - 1]) { // 윗 줄이 있는 경우
          around.push(tableData[row - 1][cell - 1]);
          around.push(tableData[row - 1][cell]);
          around.push(tableData[row - 1][cell + 1]);
        }
        around.push(tableData[row][cell - 1]);
        around.push(tableData[row][cell + 1]);

        if (tableData[row + 1]) { // 아랫 줄이 있는 경우
          around.push(tableData[row + 1][cell - 1]);
          around.push(tableData[row + 1][cell]);
          around.push(tableData[row + 1][cell + 1]);
        }
        
        const count = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v));

        // 주변에 지뢰 칸이 없는 경우 재귀함수 호출
        if (count.length === 0) {

          if (row > -1) {
            const near = [];
            if (row > 0) {
              near.push([row -1, cell - 1]);
              near.push([row -1, cell]);
              near.push([row -1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row < tableData.length - 1) {
              near.push([row +1, cell - 1]);
              near.push([row +1, cell]);
              near.push([row +1, cell + 1]);
            }
            near.forEach(v => {
              if (tableData[v[0]][v[1]] !== CODE.OPENED) checkArround(v[0], v[1]);
            })
          }
        }

        if (tableData[row][cell] === CODE.NORMAL) opendCount++; // 닫힌 칸이 열린 경우만 카운트
        tableData[row][cell] = count.length; // 주변 지뢰 갯수
      }

      checkArround(action.row, action.cell);

      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.opendCount + opendCount) { // 지뢰찾기 전체 칸 - 지뢰칸 === 오픈한 칸 갯수 -> 승리조건
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다`;
      }

      return {
        ...state,
        tableData,
        opendCount: state.opendCount + opendCount,
        halted,
        result,
      } 
    }

    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      return {
        ...state,
        tableData,
        halted: true // 게임 중단
      }
    }

    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.MINE) tableData[action.row][action.cell] = CODE.FLAG_MINE;
      else tableData[action.row][action.cell] = CODE.FLAG;

      return {
        ...state,
        tableData,
      }
    }

    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      else tableData[action.row][action.cell] = CODE.QUESTION;

      return {
        ...state,
        tableData,
      }
    }

    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) tableData[action.row][action.cell] = CODE.MINE;
      else tableData[action.row][action.cell] = CODE.NORMAL;

      return {
        ...state,
        tableData,
      }
    }

    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    
    default:
      return state;
  }
}

const MineSearch = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ // 리렌더링 방지를 위해 캐싱처리
    tableData: state.tableData, 
    halted: state.halted, 
    dispatch: dispatch
  }), [state.tableData, state.halted])

  useEffect(() => {
    let timer;
    if (!state.halted) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER })
      }, 1000)
    }

    return () => {
      clearInterval(timer);
    }
  }, [state.halted])

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
exports.CLICK_MINE = CLICK_MINE;
exports.FLAG_CELL = FLAG_CELL;
exports.QUESTION_CELL = QUESTION_CELL;
exports.NORMALIZE_CELL = NORMALIZE_CELL;
exports.INCREMENT_TIMER = INCREMENT_TIMER;

