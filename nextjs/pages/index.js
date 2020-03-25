import Layout from "../component/Layout"
import axios from "axios"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import Popup from "../components/Popup"

const Index = props => {
  const message = props.message;
  const [openPopup, setOpenPopup] = useState(false)
  const closePopup = _ => {
    setOpenPopup(false)
    console.log(openPopup)
  }

  return (
    <Layout>

      <>
        {
          openPopup
              ? <Popup handleClose={closePopup} />
              : <button onClick={_ => setOpenPopup(true)}>open popup</button>
        }
      </>

      Index Page

      <div>
        Hello from index.js
      </div>

      <div>
        {message}
      </div>

    </Layout>
  )
}

// https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html#proptypes
Index.propTypes = {
  message: PropTypes.string
}

Index.getInitialProps = async () => {
  /*
   *  getInitialProps only available from the root of the pages
   *  makes page SSR
   *
   *  do some fetch here
   */
  const res = await axios.get(`${process.env.ASSET_PREFIX}/api`)
  const data = res.data
  return { message: data.message }
}

export default Index
