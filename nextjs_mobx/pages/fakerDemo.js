import { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import faker from 'faker'

import store from '../store/store'

class Data {
  @observable avatar = faker.image.avatar()
  @observable name = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
  @observable email = faker.internet.email()
}

@observer
class Faker extends Component {
  data = new Data()

  generate = () => {
    this.data.avatar = faker.image.avatar()
    this.data.name.firstName = faker.name.firstName()
    this.data.email = faker.internet.email()
  }

  render() {
    return (
      <>
        <h3>Faker Demo</h3>

        <button className='btn btn-warning' onClick={ this.generate }>Generate</button>

        <dl className="row">
          <dt className="col-sm-3">Avatar</dt>
          <dd className="col-sm-9">
            <img src={this.data.avatar} alt="avatar image"/>
          </dd>
          <dt className="col-sm-3">Name</dt>
          <dd className="col-sm-9">{this.data.name.firstName} {this.data.name.lastName}</dd>
          <dt className="col-sm-3">Email</dt>
          <dd className="col-sm-9">{this.data.email}</dd>
        </dl>

        <div>
          mode: {store.mode}
        </div>
      </>
    )
  }
}

export default Faker
