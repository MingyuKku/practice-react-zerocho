const React = require('react');
const { useEffect, useReducer, useCallback, useContext, memo } = React;
const MineSearch = require('./MineSearch');
const Tr = require('./Tr');


const Table = () => {
  const { tableData } = useContext(MineSearch.TableContext);
  
  return (
    <table>
      <tbody>
        { new Array(tableData.length).fill().map((el,i) => 
          <Tr key={ `key${i}` } rowIndex={ i } />
        ) }
      </tbody>
    </table>
  )
}

module.exports = memo(Table);