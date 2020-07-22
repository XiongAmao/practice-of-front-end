## class component basic life cycle

“Render phase”
Pure and has no side effects. May be paused, aborted or restarted by React.

“Pre-commit phase”
Can read the DOM.

“Commit phase”
Can work with DOM, run side effects, schedule updates.

```
mounting phase

* render phase

constructor(props)

getDerivedStateFromProps(nextProps, prevState): state | null

render() // should be pure function

* Commit Phase

componentDidMount()
```

```
updating phase

* render phase
// trigger updating:  new Props / setState() / forceUpdate()

getDerivedStateFromProps(nextProps, prevState): state | null
     | (new props/setState)
     v
shouldComponentUpdate(nextProps, nextState): boolean // default true
// stop updating when false is returned. this hook is not triggered by forceUpdate.
     |
     v
render()

* Pre-commit

getSnapshotBeforeUpdate(prevProps, prevState): null

* Commit phase

componentDidUpdate()
```

```
Unmounting

componentWillUnmount
```


## reference

https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
