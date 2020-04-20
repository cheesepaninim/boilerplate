import { MobXProviderContext } from 'mobx-react'

const useStores = _ => {
  return React.useContext(MobXProviderContext)
}

export default useStores
