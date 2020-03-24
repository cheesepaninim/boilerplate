import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import Popup from "../components/Popup"

const Index = props => {
  // const { greeting: { hi, hello } } = props
  // console.log(greeting)

  const [openPopup, setOpenPopup] = useState(false)
  const closePopup = _ => {
    setOpenPopup(false)
    console.log(openPopup)
  }

  return (
      <>
        {
          openPopup
            ? <Popup handleClose={closePopup} />
            : <button onClick={_ => setOpenPopup(true)}>open popup</button>
        }
      </>
  )
}

// Index.propTypes = {
//   greeting: PropTypes.object
// }

// Index.getInitialProps = () => {
//   return { greeting: { hi: 'Hi', hello: 'Hello World!' } }
// }

export default Index
