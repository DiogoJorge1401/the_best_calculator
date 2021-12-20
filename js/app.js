const { addActions, getActions, reset, deleteOne, clearActions } = (() => {
  let actions = []
  const addActions = (action) => actions.push(action)
  const getActions = () => actions
  const reset = () => (actions = [])
  const deleteOne = () => (actions = [...actions.slice(0, -1)])
  const clearActions = (q) => {
    reset()
    for (let i = 0; i < q; i++) {
      addActions('number')
    }
  }

  return {
    addActions,
    getActions,
    reset,
    deleteOne,
    clearActions,
  }
})()

const clean = () => {
  document.getElementById('painel').value = ''
  reset()
}
const validateFields = () => {
  const actions = getActions()
  const idx = actions.length - 1
  if (actions[idx] === 'action') return false
  if (actions[idx] !== 'number') return false
  return true
}
const lessThan1 = (value) => {
  if (
    value === '+' ||
    value === '-' ||
    value === '*' ||
    value === '/' ||
    value === '.'
  ) {
    if (!validateFields()) return
    addActions('action')
  }
  return true
}
const lastIsDote = (v) => {
  if (v !== '.') return true
  try {
    Function('return ' + document.getElementById('painel').value + '.')()
    return true
  } catch (error) {
    return false
  }
}
const deleteOneField = () => {
  let v = document.getElementById('painel').value
  v = v.substring(0, v.length - 1)
  document.getElementById('painel').value = v

  deleteOne()
}
const actionEqual = () => {
  if (!validateFields()) return
  const value_campo = Function(
    'return ' + document.getElementById('painel').value
  )()
  clearActions(String(value_campo).length)
  document.getElementById('painel').value = value_campo
}
const calcClick = (type, value) => {
  if (type === 'action') {
    if (value === 'c') {
      clean()
      return
    }
    if (!lastIsDote(value)) return
    if (!lessThan1(value)) return

    if (value === '=') {
      actionEqual()
      return
    }
    if (value === 'Backspace') deleteOneField()
    else document.getElementById('painel').value += value
  } else if (type == 'value') {
    document.getElementById('painel').value += value
    addActions('number')
  }
}
const calcType = (e) => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const actions = ['+', '-', '*', '/', '.', '=', 'c', 'Backspace']
  const key = e.key

  if (numbers.includes(key)) calcClick('value', key)

  if (actions.includes(key)) calcClick('action', key)

  return
}
window.addEventListener('keydown', calcType)
