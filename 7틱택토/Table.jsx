const React = require('react');
const Tr = require('./Tr');

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        { 
          new Array(tableData.length).fill().map((v,i) => 
            <Tr key={ `${i}key` } dispatch={ dispatch } rowData={ tableData[i] } rowIndex={ i } ></Tr>
          ) 
        }
      </tbody>
    </table>
  )
}

module.exports = Table;