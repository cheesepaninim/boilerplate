import { observable } from 'mobx'

class Store {
  @observable user = null
  @observable mode = 'development' // 'development' 'production'
}

// 아래와 같이 객체를 export 하면 전역으로 공유되어 관리 할 수 있다.
export default (new Store)
