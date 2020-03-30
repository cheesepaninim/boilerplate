import React from 'react'
import { observer } from 'mobx-react'

import store from '../store/store'

class Layout extends React.Component {
  render(){
    return(
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">SNS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <div className="my-2 my-lg-0">
              { store.user || '로그인 해주세요' }
            </div>
          </div>
        </nav>

        <div className="container">
          { this.props.children }
        </div>

      </>
    )
  }
}

export default Layout
