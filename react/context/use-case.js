import React from 'react'
import { createContext } from './simple-context'

const ThemeDefault = {
  color: 'red',
  isCircle: false
}
const ThemeContext = createContext(ThemeDefault)
const { Provider, Consumer } = ThemeContext

class App extends React.Component {
  render() {
    return (
      <Provider value={ThemeDefault}>
        <Page />
      </Provider>
    )
  }
}

const Page = () => {
  return (
    <>
      <ThemeButton />
      <ThemeMenu />
    </>
  )
}

// get Context in Class Component
class ThemeButton extends React.Component {
  static contextType = ThemeContext
  render() {
    // simulate context
    this.context = ThemeButton.contextType.Provider.value

    return <button>color: {this.context.color}</button>
  }
}

// use Consumer, children can be a FC / class component
const ThemeMenu = () => {
  return <Consumer>{(props) => <span>{props.color}</span>}</Consumer>
}
