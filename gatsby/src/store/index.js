import { observable, action } from "mobx"

class Store {
  @observable title = "mobx test"

  @action
  updateTitle = title => this.title = title
}

export default new Store()
