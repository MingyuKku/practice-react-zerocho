const React = require('react');
const Td = require('./Td');

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      { 
        new Array(rowData.length).fill().map((v,i) => 
          <Td key={`${i}keyd`} dispatch={ dispatch } rowIndex={ rowIndex } cellData={ rowData[i] } cellIndex={ i }></Td>
        )
      }
    </tr>
  )
}

module.exports = Tr;