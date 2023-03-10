const React = require('react');
const { useEffect, useState, useCallback, useContext, memo } = React;
const MineSearch = require('./MineSearch');

const Form = () => {
  const [ row, setRow ] = useState(10);
  const [ cell, setCell ] = useState(10);
  const [ mine, setMine ] = useState(20);
  const { dispatch } = useContext(MineSearch.TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value)
  }, [])

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value)
  }, [])

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value)
  }, [])

  const onClickBtn = useCallback(() => {
    dispatch({ type: MineSearch.START_GAME, row, cell, mine })
  }, [row, cell, mine])

  return (
    <div>
      <input type="number" placeholder='세로' value={ row } onChange={ onChangeRow } />
      <input type="number" placeholder='가로' value={ cell } onChange={ onChangeCell } />
      <input type="number" placeholder='지뢰' value={ mine } onChange={ onChangeMine } />
      <button onClick={ onClickBtn }>시작</button>
    </div>
  )
}

module.exports = memo(Form);