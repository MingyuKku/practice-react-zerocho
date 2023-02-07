const React = require('react');
const { useEffect, useReducer, useCallback, useContext, memo } = React;
const MineSearch = require('./MineSearch');
const Td = require('./Td');


const Tr = ({ rowIndex }) => {
  const { tableData } = useContext(MineSearch.TableContext);
  
  return (
    <tr>
      { new Array(tableData[0].length).fill().map((el,i) => 
        <Td key={ `key${i}` } rowIndex={ rowIndex } cellIndex={ i } />
      ) }
    </tr>
  )
}

module.exports = memo(Tr);