import { observer } from 'mobx-react'
import useStore  from '../store/useStore'

const CounterWithHook = observer(() => {
  const { counterWithHook } = useStore()
  return (
      <>
        <h1>{counterWithHook.number}</h1>
        <button onClick={counterWithHook.increase}>+1</button>
        <button onClick={counterWithHook.decrease}>-1</button>
      </>
  )
})

export default CounterWithHook
