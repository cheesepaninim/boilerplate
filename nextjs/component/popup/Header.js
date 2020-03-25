import { useState, useEffect } from "react";

const Header = props => {
  const { handleClose } = props

  return (
    <header>
      <h2>Popup</h2>
      <button onClick={handleClose}>close</button>
    </header>
  )
}

export default Header
