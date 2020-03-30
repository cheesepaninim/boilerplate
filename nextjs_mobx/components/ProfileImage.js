import React, { Component } from 'react'

class ProfileImage extends Component {
  state = {}
  constructor(props){
    super(props)
    this.state.width = this.state.height = props.size || 200
    this.state.url = props.url || 'https://placeimg.com/200/200/any'
    console.log(props)
  }

  render() {
    const style = {
      display: 'inline-block',
      width: this.state.width,
      height: this.state.height,
      backgroundImage: `url( ${this.state.url} )`,
      backgroundSize: 'cover',
      borderRadius: '50%',
    }

    return (
      <>
        <div style={ style }>ProfileImage</div>
      </>
    )
  }
}

export default ProfileImage
