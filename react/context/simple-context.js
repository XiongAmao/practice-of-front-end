import React from 'react'

export const createContext = (defaultValue) => {
  class Provider extends React {
    static value = defaultValue

    constructor(props) {
      super(props)
      Provider.value = props.value
    }

    getDerivedStateFromProps(nextProps, prevState) {
      Provider.value = nextProps.value
      return prevState
    }
    render() {
      return this.props.children
    }
  }

  class Consumer extends React {
    render() {
      return this.props.children(Provider.value)
    }
  }

  return {
    Provider,
    Consumer
  }
}
// Real context is not a component like this.
// He is similar to the node returned by React.createElement

// reference: https://juejin.im/post/5d6f571ef265da03c23ef2d1 
