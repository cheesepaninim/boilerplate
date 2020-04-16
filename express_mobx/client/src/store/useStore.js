/**
 *  inject 대체 Hoc
 *
 *  React hooks 를 사용하는 컴포넌트에서 store 가져올 때 사용한다.
 *  https://blog.rhostem.com/posts/2019-07-22-mobx-v6-and-react-v16-8
 *  https://mobx-react.js.org/recipes-migration#hooks-for-the-rescue
 *
 */

import React from 'react'
import { MobXProviderContext } from "mobx-react"

const useStore = () => {
  return React.useContext(MobXProviderContext)
}

export default useStore
