import { useObserver } from "mobx-react-lite"
import useStores from "../stores/useStores"

const CounterData = () => {
  const { counter } = useStores()
  return useObserver(() => ({
    number: counter.number,
    increase: counter.increase
  }))
}

const Counter = () => {
  // Do not destructure data!
  const data = CounterData()
  return (
    <>
      <div>{data.number}</div>
      <button onClick={data.increase}>+</button>
    </>
  )
}
