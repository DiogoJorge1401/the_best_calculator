const { addActions, getActions, reset } = (() => {
  let actions = []
  const addActions = (action) => actions.push(action)
  const getActions = () => actions
  const reset = () => (actions = [])
  return {
    addActions,
    getActions,
    reset,
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
const calcClick = (type, value) => {
  if (type === 'action') {
    if (value === 'c') {
      clean()
      return
    }
    if (!lastIsDote(value)) return
    if (!lessThan1(value)) return
    if (value === '=') {
      if (!validateFields()) return
      const value_campo = Function(
        'return ' + document.getElementById('painel').value
      )()
      document.getElementById('painel').value = value_campo
    } else document.getElementById('painel').value += value
  } else if (type == 'value') {
    document.getElementById('painel').value += value
    addActions('number')
  }
}
const calcType = (e) => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const actions = ['+', '-', '*', '/', '.', '=', 'c']
  const key = e.key
  if (numbers.includes(key)) {
    console.log('number')
    calcClick('value', key)
    return
  }
  if (actions.includes(key)) {
    console.log('action')
    calcClick('action', key)
    return
  }
}
window.addEventListener('keydown', calcType)