import Layout from "../component/Layout"
import axios from "axios"
import PropTypes from 'prop-types'

const Index = props => {
  const message = props.message;

  return (
    <Layout>
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
